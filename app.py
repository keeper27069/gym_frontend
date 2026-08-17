import os
import uuid
import shutil
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List

from workouts_data import find_workouts
from gamification import calculate_level
import database as db

# Setup Directories (Configurable for Docker volume persistence)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.getenv("DATA_DIR", BASE_DIR)
os.makedirs(DATA_DIR, exist_ok=True)

UPLOAD_DIR = os.getenv("UPLOAD_DIR", os.path.join(DATA_DIR, "uploads"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

api = FastAPI(title="Gym TMA Backend - Production Ready")

# CORS configuration with environment variable support
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "*")
if allowed_origins_raw.strip() == "*":
    origins = ["*"]
else:
    origins = [o.strip() for o in allowed_origins_raw.split(",") if o.strip()]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded photos as static assets
api.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

class UserProfileRequest(BaseModel):
    telegram_id: int = 123456
    gender: str = "male"
    age: int = 25
    weight: float = 75.0
    goal: str = "muscle_gain"
    streak_weeks: int = 0

class CompleteWorkoutPayload(BaseModel):
    user_id: Optional[int] = 123456
    current_streak: Optional[int] = 0

@api.get("/")
def health_check():
    return {
        "status": "ok",
        "service": "Gym TMA Backend",
        "version": "1.0.0",
        "storage": {
            "data_dir": DATA_DIR,
            "upload_dir": UPLOAD_DIR
        }
    }

@api.post("/api/workouts")
def get_recommendations(profile: UserProfileRequest):
    # Save or update user in SQLite DB
    user = db.get_or_create_user(
        telegram_id=profile.telegram_id,
        gender=profile.gender,
        age=profile.age,
        weight=profile.weight,
        goal=profile.goal,
        streak_weeks=profile.streak_weeks
    )
    
    current_streak = user.get("streak_weeks", profile.streak_weeks)
    level_info = calculate_level(current_streak)
    level_info["xp"] = user.get("xp", current_streak * 150)
    
    # 3-Day split workouts
    splits = find_workouts(goal=profile.goal, gender=profile.gender, level=level_info["level"])
    
    # Recent photo check-ins
    check_ins = db.get_user_check_ins(profile.telegram_id, limit=8)
    
    # User attendance dates
    attendance = db.get_user_attendance(profile.telegram_id)
    
    return {
        "user_status": level_info,
        "workouts": splits,
        "check_ins": check_ins,
        "attendance": attendance
    }

@api.post("/api/check-in")
async def check_in_workout_photo(
    telegram_id: int = Form(...),
    workout_id: Optional[int] = Form(None),
    workout_title: Optional[str] = Form("Тренировка в зале"),
    photo: UploadFile = File(...)
):
    """
    Uploads workout check-in photo proof, stores metadata, and awards streak + XP.
    """
    if not photo:
        raise HTTPException(status_code=400, detail="Photo file is required")
        
    # Generate unique filename
    ext = os.path.splitext(photo.filename)[1] or ".jpg"
    unique_filename = f"proof_{telegram_id}_{uuid.uuid4().hex[:8]}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Save file to disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)
        
    photo_url = f"/uploads/{unique_filename}"
    
    # Record check-in in SQLite
    check_in_record = db.add_check_in(
        telegram_id=telegram_id,
        workout_id=workout_id,
        workout_title=workout_title,
        photo_filename=unique_filename,
        photo_url=photo_url
    )
    
    # Increment streak and award 150 XP
    updated_user = db.update_streak_and_xp(telegram_id=telegram_id, add_xp=150)
    new_streak = updated_user.get("streak_weeks", 1)
    new_status = calculate_level(new_streak)
    new_status["xp"] = updated_user.get("xp", 150)
    
    # Get updated check-ins list
    all_check_ins = db.get_user_check_ins(telegram_id=telegram_id, limit=8)
    
    return {
        "success": True,
        "message": "🔥 Тренировка подтверждена! Получено +150 XP и +1 к серии!",
        "new_streak_weeks": new_streak,
        "xp_earned": 150,
        "total_xp": updated_user.get("xp", 150),
        "new_status": new_status,
        "check_in": check_in_record,
        "check_ins": all_check_ins
    }

@api.get("/api/check-ins/{telegram_id}")
def get_user_history(telegram_id: int):
    check_ins = db.get_user_check_ins(telegram_id=telegram_id, limit=20)
    return {"check_ins": check_ins}

class AttendancePayload(BaseModel):
    telegram_id: int
    date_str: str

@api.post("/api/attendance")
def record_attendance(payload: AttendancePayload):
    db.add_attendance_date(payload.telegram_id, payload.date_str)
    all_dates = db.get_user_attendance(payload.telegram_id)
    return {"success": True, "attendance": all_dates}

@api.get("/api/attendance/{telegram_id}")
def get_attendance_history(telegram_id: int):
    dates = db.get_user_attendance(telegram_id)
    return {"attendance": dates}

@api.post("/api/complete-workout")
def complete_workout(
    user_id: Optional[int] = None, 
    current_streak: Optional[int] = None,
    payload: Optional[CompleteWorkoutPayload] = Body(default=None)
):
    streak = 0
    uid = user_id or (payload.user_id if payload else 123456)
    if current_streak is not None:
        streak = current_streak
    elif payload and payload.current_streak is not None:
        streak = payload.current_streak

    updated_user = db.update_streak_and_xp(telegram_id=uid, add_xp=100)
    new_streak = updated_user.get("streak_weeks", streak + 1)
    new_status = calculate_level(new_streak)
    new_status["xp"] = updated_user.get("xp", 100)
    
    return {
        "success": True,
        "new_streak_weeks": new_streak,
        "new_status": new_status,
        "check_ins": db.get_user_check_ins(telegram_id=uid, limit=8)
    }