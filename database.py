# database.py
import sqlite3
import os
from datetime import datetime
from typing import Optional, List, Dict, Any

# Dynamic data directory configuration for Docker / VPS volume mounting
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.getenv("DATA_DIR", BASE_DIR)
os.makedirs(DATA_DIR, exist_ok=True)

DB_PATH = os.getenv("DB_PATH", os.path.join(DATA_DIR, "gym_app.db"))

def get_db_connection():
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    conn.row_factory = sqlite3.Row
    # Enable WAL mode for high concurrency
    conn.execute("PRAGMA journal_mode=WAL;")
    return conn

def init_db():
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Users table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            telegram_id INTEGER PRIMARY KEY,
            gender TEXT DEFAULT 'male',
            age INTEGER DEFAULT 25,
            weight REAL DEFAULT 75.0,
            goal TEXT DEFAULT 'muscle_gain',
            streak_weeks INTEGER DEFAULT 0,
            xp INTEGER DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """)
        
        # Check-ins / Photo proof table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS check_ins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            telegram_id INTEGER NOT NULL,
            workout_id INTEGER,
            workout_title TEXT,
            photo_filename TEXT,
            photo_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (telegram_id) REFERENCES users(telegram_id)
        )
        """)
        
        conn.commit()
    finally:
        conn.close()

def get_or_create_user(
    telegram_id: int, 
    gender: str = "male", 
    age: int = 25, 
    weight: float = 75.0, 
    goal: str = "muscle_gain",
    streak_weeks: int = 0
) -> Dict[str, Any]:
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM users WHERE telegram_id = ?", (telegram_id,))
        user = cursor.fetchone()
        
        if not user:
            cursor.execute("""
            INSERT INTO users (telegram_id, gender, age, weight, goal, streak_weeks, xp, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (telegram_id, gender, age, weight, goal, streak_weeks, streak_weeks * 100, datetime.utcnow()))
            conn.commit()
            cursor.execute("SELECT * FROM users WHERE telegram_id = ?", (telegram_id,))
            user = cursor.fetchone()
        else:
            # Update profile stats if provided
            cursor.execute("""
            UPDATE users 
            SET gender = ?, age = ?, weight = ?, goal = ?, updated_at = ?
            WHERE telegram_id = ?
            """, (gender, age, weight, goal, datetime.utcnow(), telegram_id))
            conn.commit()
            cursor.execute("SELECT * FROM users WHERE telegram_id = ?", (telegram_id,))
            user = cursor.fetchone()
            
        user_dict = dict(user)
        return user_dict
    finally:
        conn.close()

def update_streak_and_xp(telegram_id: int, add_xp: int = 150) -> Dict[str, Any]:
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM users WHERE telegram_id = ?", (telegram_id,))
        user = cursor.fetchone()
        if not user:
            cursor.execute("""
            INSERT INTO users (telegram_id, streak_weeks, xp)
            VALUES (?, 1, ?)
            """, (telegram_id, add_xp))
        else:
            new_streak = user["streak_weeks"] + 1
            new_xp = user["xp"] + add_xp
            cursor.execute("""
            UPDATE users 
            SET streak_weeks = ?, xp = ?, updated_at = ?
            WHERE telegram_id = ?
            """, (new_streak, new_xp, datetime.utcnow(), telegram_id))
            
        conn.commit()
        cursor.execute("SELECT * FROM users WHERE telegram_id = ?", (telegram_id,))
        updated_user = cursor.fetchone()
        user_dict = dict(updated_user) if updated_user else {}
        return user_dict
    finally:
        conn.close()

def add_check_in(
    telegram_id: int, 
    workout_id: Optional[int], 
    workout_title: Optional[str], 
    photo_filename: str, 
    photo_url: str
) -> Dict[str, Any]:
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        INSERT INTO check_ins (telegram_id, workout_id, workout_title, photo_filename, photo_url, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (telegram_id, workout_id, workout_title, photo_filename, photo_url, datetime.utcnow()))
        
        conn.commit()
        check_in_id = cursor.lastrowid
        
        cursor.execute("SELECT * FROM check_ins WHERE id = ?", (check_in_id,))
        row = cursor.fetchone()
        result = dict(row) if row else {}
        return result
    finally:
        conn.close()

def get_user_check_ins(telegram_id: int, limit: int = 12) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        SELECT id, telegram_id, workout_id, workout_title, photo_url, created_at
        FROM check_ins 
        WHERE telegram_id = ? 
        ORDER BY created_at DESC 
        LIMIT ?
        """, (telegram_id, limit))
        
        rows = cursor.fetchall()
        results = [dict(r) for r in rows]
        return results
    finally:
        conn.close()

# Initialize DB on module import
init_db()
