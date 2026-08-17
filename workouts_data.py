# workouts_data.py
from typing import List, Dict, Any, Optional

WORKOUT_SPLITS = [
    # ==========================================
    # 1. MUSCLE GAIN (MALE / GENERAL) - 3-DAY SPLIT
    # ==========================================
    {
        "id": 101,
        "split_id": "muscle_gain_male",
        "day_number": 1,
        "day_name": "День 1: Push (Грудь, Плечи, Трицепс)",
        "target_goal": "muscle_gain",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Жим штанги лежа",
                "sets": 4,
                "reps": "8-10",
                "rest_sec": 90,
                "video_url": "https://www.youtube.com/embed/rT7DgCr-3pg",
                "tip": "Лопатки сведены, опускайте штангу к нижней линии груди с контролем."
            },
            {
                "name": "Жим гантелей на наклонной скамье (30°)",
                "sets": 3,
                "reps": "10-12",
                "rest_sec": 75,
                "video_url": "https://www.youtube.com/embed/8iPEnn-ltC8",
                "tip": "Акцент на верхнюю порцию грудных, не разводите локти слишком широко."
            },
            {
                "name": "Армейский жим стоя / сидя",
                "sets": 3,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/2yjwXTZQDDI",
                "tip": "Держите пресс в напряжении, не прогибайтесь в пояснице."
            },
            {
                "name": "Разгибания на трицепс на блоке",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/2-LAMcpzODU",
                "tip": "Локти зафиксированы у корпуса, полное выпрямление в нижней точке."
            }
        ]
    },
    {
        "id": 102,
        "split_id": "muscle_gain_male",
        "day_number": 2,
        "day_name": "День 2: Pull (Спина, Задняя дельта, Бицепс)",
        "target_goal": "muscle_gain",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Тяга верхнего блока к груди",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 75,
                "video_url": "https://www.youtube.com/embed/CAwf7n6Luuc",
                "tip": "Тяните рукоять усилием широчайших мышц, сводя лопатки."
            },
            {
                "name": "Тяга штанги / гантелей в наклоне",
                "sets": 4,
                "reps": "8-10",
                "rest_sec": 90,
                "video_url": "https://www.youtube.com/embed/G8l_8chR5BE",
                "tip": "Спина прямая, тяга ведется строго к поясу."
            },
            {
                "name": "Махи гантелями в наклоне (задняя дельта)",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/ttvfGg9d76c",
                "tip": "Локти слегка согнуты, движение без инерции."
            },
            {
                "name": "Подъем штанги на бицепс стоя",
                "sets": 3,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/ykJmrZ5v0Oo",
                "tip": "Не раскачивайте корпус, пиковое сокращение в верхней точке."
            }
        ]
    },
    {
        "id": 103,
        "split_id": "muscle_gain_male",
        "day_number": 3,
        "day_name": "День 3: Legs & Core (Квадрицепс, Бицепс бедра, Пресс)",
        "target_goal": "muscle_gain",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Классические приседания со штангой",
                "sets": 4,
                "reps": "8-10",
                "rest_sec": 120,
                "video_url": "https://www.youtube.com/embed/bEv6CCg2BC8",
                "tip": "Колени смотрят по направлению носков, глубина до параллели."
            },
            {
                "name": "Румынская становая тяга",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 90,
                "video_url": "https://www.youtube.com/embed/JCXUYuzwNrM",
                "tip": "Отводите таз назад, чувствуйте растяжение задней поверхности бедра."
            },
            {
                "name": "Жим ногами в тренажере",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 75,
                "video_url": "https://www.youtube.com/embed/IZxyjW7MPJQ",
                "tip": "Не выпрямляйте колени до щелчка в верхней точке."
            },
            {
                "name": "Подъем ног в висе на перекладине",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/JB2oyawG9KI",
                "tip": "Подкручивайте таз к груди для максимальной работы пресса."
            }
        ]
    },

    # ==========================================
    # 2. MUSCLE GAIN / TONING (FEMALE) - 3-DAY SPLIT
    # ==========================================
    {
        "id": 151,
        "split_id": "muscle_gain_female",
        "day_number": 1,
        "day_name": "День 1: Ягодицы & Бицепс бедра (Glute Hypertrophy)",
        "target_goal": "muscle_gain",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Ягодичный мостик со штангой",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 75,
                "video_url": "https://www.youtube.com/embed/SEdqd1n0cvg",
                "tip": "Задержитесь на 2 секунды в верхней точке с максимальным напряжением ягодиц."
            },
            {
                "name": "Болгарские сплит-приседания с гантелями",
                "sets": 3,
                "reps": "10-12 на ногу",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/2C-uNgKwPLE",
                "tip": "Корпус слегка наклонен вперед для изоляции ягодичной мышцы."
            },
            {
                "name": "Румынская тяга с гантелями",
                "sets": 4,
                "reps": "12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/JCXUYuzwNrM",
                "tip": "Отводите таз назад, спина строго прямая."
            },
            {
                "name": "Разведение ног в тренажере сидя",
                "sets": 3,
                "reps": "15-20",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/pvIjsG5Svck",
                "tip": "Наклоните корпус немного вперед для лучшего включения средней ягодичной."
            }
        ]
    },
    {
        "id": 152,
        "split_id": "muscle_gain_female",
        "day_number": 2,
        "day_name": "День 2: Спина, Плечи & Руки (Upper Tone & Posture)",
        "target_goal": "muscle_gain",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Тяга верхнего блока к груди",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/CAwf7n6Luuc",
                "tip": "Формирование красивого силуэта спины и идеальной осанки."
            },
            {
                "name": "Жим гантелей сидя на плечи",
                "sets": 3,
                "reps": "12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/qEwKCR5JCog",
                "tip": "Подъем гантелей по плавной траектории вверх."
            },
            {
                "name": "Тяга горизонтального блока к поясу",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/GZbfZ033f74",
                "tip": "Сводите лопатки вместе в финальной фазе."
            },
            {
                "name": "Сгибания на бицепс + разгибания на трицепс",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/ykJmrZ5v0Oo",
                "tip": "Тонус и подтянутость рук без лишнего объема."
            }
        ]
    },
    {
        "id": 153,
        "split_id": "muscle_gain_female",
        "day_number": 3,
        "day_name": "День 3: Квадрицепс, Пресс & Кор (Legs & Abs Sculpt)",
        "target_goal": "muscle_gain",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Кубковые приседания (Goblet Squats)",
                "sets": 4,
                "reps": "12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/MeIiIdhvXT4",
                "tip": "Колени разведены, держите гантель у груди."
            },
            {
                "name": "Жим ногами с высокой постановкой стоп",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/IZxyjW7MPJQ",
                "tip": "Высокая постановка стоп акцентирует нагрузку на ягодицы и бедра."
            },
            {
                "name": "Подъем коленей на брусьях / в висе",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/JB2oyawG9KI",
                "tip": "Подкручивайте таз на выдохе."
            },
            {
                "name": "Планка на предплечьях",
                "sets": 3,
                "reps": "45-60 сек",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/pvIjsG5Svck",
                "tip": "Напрягите пресс и ягодицы, тело в струну."
            }
        ]
    },

    # ==========================================
    # 3. WEIGHT LOSS / TONING (FEMALE / ANY) - 3-DAY SPLIT
    # ==========================================
    {
        "id": 201,
        "split_id": "weight_loss_female",
        "day_number": 1,
        "day_name": "День 1: Glutes & Core (Ягодицы, Задняя поверхность, Кор)",
        "target_goal": "weight_loss",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Ягодичный мостик со штангой / гантелью",
                "sets": 4,
                "reps": "12-15",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/SEdqd1n0cvg",
                "tip": "Пауза в верхней точке на 2 секунды с мощным сжатием ягодиц."
            },
            {
                "name": "Румынская тяга с гантелями",
                "sets": 4,
                "reps": "12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/JCXUYuzwNrM",
                "tip": "Плавное движение вниз за счет отведения таза."
            },
            {
                "name": "Болгарские сплит-приседания",
                "sets": 3,
                "reps": "12 на ногу",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/2C-uNgKwPLE",
                "tip": "Корпус слегка наклонен вперед для акцента на ягодичную мышцу."
            },
            {
                "name": "Планка с поочередным подъемом коленей",
                "sets": 3,
                "reps": "45 сек",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/pvIjsG5Svck",
                "tip": "Держите тело в одной линии без провисания в пояснице."
            }
        ]
    },
    {
        "id": 202,
        "split_id": "weight_loss_female",
        "day_number": 2,
        "day_name": "День 2: Upper Body & Toning (Спина, Плечи, Руки)",
        "target_goal": "weight_loss",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Тяга верхнего блока широким хватом",
                "sets": 4,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/CAwf7n6Luuc",
                "tip": "Красивая осанка и раскрытие грудного отдела."
            },
            {
                "name": "Жим гантелей сидя на скамье",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/qEwKCR5JCog",
                "tip": "Укрепление плечевого пояса без перегрузки шеи."
            },
            {
                "name": "Тяга горизонтального блока к поясу",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/GZbfZ033f74",
                "tip": "Сводите лопатки вместе в конце амплитуды."
            },
            {
                "name": "Отжимания от возвышения / с колен",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/IODxDxX7oi4",
                "tip": "Локти под углом 45 градусов к телу."
            }
        ]
    },
    {
        "id": 203,
        "split_id": "weight_loss_female",
        "day_number": 3,
        "day_name": "День 3: HIIT & Full Body Burn (Фулбоди & Кардио)",
        "target_goal": "weight_loss",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Выпады с гантелями назад",
                "sets": 4,
                "reps": "15 на ногу",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/wrwwXE_x-pQ",
                "tip": "Колено передней ноги не выходит за носок."
            },
            {
                "name": "Махи гирей / гантелью (Kettlebell swings)",
                "sets": 4,
                "reps": "20",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/sSESeQEqu28",
                "tip": "Взрывное движение бедрами, спина прямая."
            },
            {
                "name": "Скручивания на пресс на коврике",
                "sets": 3,
                "reps": "20",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/Xyd_fa5zoEU",
                "tip": "Поясница прижата к полу, выдох на подъеме."
            },
            {
                "name": "Интервальное кардио (дорожка под наклоном / эллипс)",
                "sets": 1,
                "reps": "20 минут",
                "rest_sec": 0,
                "video_url": "https://www.youtube.com/embed/X3q5e1kA4xU",
                "tip": "Чередуйте 1 мин бодрого темпа и 1 мин умеренной ходьбы."
            }
        ]
    },

    # ==========================================
    # 3. WEIGHT LOSS (MALE / ANY) - 3-DAY SPLIT
    # ==========================================
    {
        "id": 301,
        "split_id": "weight_loss_male",
        "day_number": 1,
        "day_name": "День 1: Верх тела & Кардио (Chest & Back Fat Burn)",
        "target_goal": "weight_loss",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Суперсет: Жим гантелей лежа + Тяга блока",
                "sets": 4,
                "reps": "12-15",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/8iPEnn-ltC8",
                "tip": "Минимальный отдых между упражнениями для максимального расхода калорий."
            },
            {
                "name": "Отжимания на брусьях / от пола",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/2z8JmcrW-As",
                "tip": "Контролируйте опускание, держите кор в напряжении."
            },
            {
                "name": "Тяга гантели одной рукой в наклоне",
                "sets": 3,
                "reps": "12 на руку",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/pYcpY20QaE8",
                "tip": "Спина ровная, тяните локоть строго к бедру."
            },
            {
                "name": "Бёрпи без отжимания",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/dZgVxmf6jkA",
                "tip": "Взрывной прыжок вверх, мягкое приземление."
            }
        ]
    },
    {
        "id": 302,
        "split_id": "weight_loss_male",
        "day_number": 2,
        "day_name": "День 2: Ноги & Мощный кор (Legs & Core Burn)",
        "target_goal": "weight_loss",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Кубковые приседания (Goblet Squats) с гантелью",
                "sets": 4,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/MeIiIdhvXT4",
                "tip": "Держите гантель у груди, глубокий уверенный сед."
            },
            {
                "name": "Выпады при ходьбе с гантелями",
                "sets": 4,
                "reps": "20 шагов",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/L8fvypPrzzs",
                "tip": "Широкий шаг, колено задней ноги почти касается пола."
            },
            {
                "name": "Подъем ног на брусьях",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/JB2oyawG9KI",
                "tip": "Без раскачки, задержка в верхней точке."
            },
            {
                "name": "Планка с динамическим переходом на ладони",
                "sets": 3,
                "reps": "45 сек",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/pvIjsG5Svck",
                "tip": "Таз зафиксирован, корпус не качается из стороны в сторону."
            }
        ]
    },
    {
        "id": 303,
        "split_id": "weight_loss_male",
        "day_number": 3,
        "day_name": "День 3: High Intensity Conditioning (Интенсив & Кардио)",
        "target_goal": "weight_loss",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Махи гирей двумя руками",
                "sets": 4,
                "reps": "20",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/sSESeQEqu28",
                "tip": "Мощный толчок тазом вперед, руки прямые."
            },
            {
                "name": "Бокс на мешке / бой с тенью с гантелями 1-2 кг",
                "sets": 3,
                "reps": "3 раунда по 2 мин",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/X3q5e1kA4xU",
                "tip": "Работайте ногами, серийные удары на выдохе."
            },
            {
                "name": "Удары боевыми канатами (Battle Ropes)",
                "sets": 4,
                "reps": "30 сек",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/jZ3V_0BwY-M",
                "tip": "Ноги в полуприседе, частые мощные удары."
            },
            {
                "name": "Интервальный спринт на дорожке (HIIT)",
                "sets": 8,
                "reps": "30с спринт / 30с шаг",
                "rest_sec": 0,
                "video_url": "https://www.youtube.com/embed/X3q5e1kA4xU",
                "tip": "Максимальная скорость в спринте, глубокое дыхание во время шага."
            }
        ]
    }
]

def find_workouts(goal: str, gender: str, level: int = 1) -> List[Dict[str, Any]]:
    """
    Returns the 3-day split list for the given goal and gender.
    """
    matched = [
        w for w in WORKOUT_SPLITS
        if (w["target_goal"] == goal or w["target_goal"] == "any") and
           (w["target_gender"] == gender or w["target_gender"] == "any") and
           w["difficulty_level"] <= level
    ]
    
    if not matched:
        # Fallback to goal match
        matched = [w for w in WORKOUT_SPLITS if w["target_goal"] == goal]
        
    if not matched:
        matched = WORKOUT_SPLITS[:3]
        
    # Sort by day_number
    matched.sort(key=lambda x: x.get("day_number", 1))
    return matched