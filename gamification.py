# gamification.py

LEVEL_REQUIREMENTS = {
    1: 1,   # 1 неделя для уровня 1
    2: 3,   # 3 недели для уровня 2
    3: 7,   # 7 недель для уровня 3
    4: 13,  # 13 недель для уровня 4
}

RANKS = {
    1: "Новичок (Novice)",
    2: "Атлет (Trainee)",
    3: "Железный воин (Ironclad)",
    4: "Ветеран зала (Veteran)",
    5: "Титан (Titan)"
}

def calculate_level(streak_weeks: int) -> dict:
    if streak_weeks >= 13:
        current_lvl = 5 if streak_weeks > 13 else 4
    elif streak_weeks >= 7:
        current_lvl = 3
    elif streak_weeks >= 3:
        current_lvl = 2
    elif streak_weeks >= 1:
        current_lvl = 1
    else:
        current_lvl = 1

    # Calculate tier progress
    if current_lvl == 1:
        min_w, max_w = 0, 3
    elif current_lvl == 2:
        min_w, max_w = 3, 7
    elif current_lvl == 3:
        min_w, max_w = 7, 13
    elif current_lvl == 4:
        min_w, max_w = 13, 14
    else:
        min_w, max_w = 14, 14

    if current_lvl >= 5:
        progress_percent = 100
        weeks_left = 0
        next_level = 5
    else:
        span = max(1, max_w - min_w)
        done = max(0, streak_weeks - min_w)
        progress_percent = min(100, int((done / span) * 100))
        weeks_left = max(0, max_w - streak_weeks)
        next_level = current_lvl + 1

    return {
        "level": current_lvl,
        "rank_name": RANKS.get(current_lvl, "Титан (Titan)"),
        "streak_weeks": streak_weeks,
        "progress_percent": progress_percent,
        "weeks_left": weeks_left,
        "next_level": next_level
    }