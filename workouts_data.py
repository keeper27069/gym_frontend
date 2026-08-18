# workouts_data.py - Backend splits catalog
from typing import List, Dict, Any

WORKOUT_SPLITS = [
    # ==========================================
    # 1. MUSCLE GAIN (MALE) - 3-DAY SPLIT
    # ==========================================
    {
        "id": 101,
        "split_id": "muscle_gain_male",
        "day_number": 1,
        "day_name": "День 1: Push (Грудь, Плечи, Трицепс)",
        "day_name_uz": "1-kun: Push (Ko'krak, Yelka, Triceps)",
        "day_name_en": "Day 1: Push (Chest, Shoulders, Triceps)",
        "target_goal": "muscle_gain",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Жим штанги лежа",
                "name_uz": "Gorizontal skameykada shtanga press",
                "name_en": "Flat Barbell Bench Press",
                "sets": 4,
                "reps": "8-10",
                "rest_sec": 90,
                "video_url": "https://www.youtube.com/embed/rT7DgCr-3pg",
                "tip": "Лопатки сведены, опускайте штангу к нижней линии груди с контролем."
            },
            {
                "name": "Жим гантелей на наклонной скамье (30°)",
                "name_uz": "Qiya skameykada gantel press (30°)",
                "name_en": "Incline Dumbbell Press (30°)",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 75,
                "video_url": "https://www.youtube.com/embed/8iPEnn-ltC8",
                "tip": "Акцент на верхнюю порцию грудных, локти держите под углом 75°."
            },
            {
                "name": "Армейский жим гантелей сидя",
                "name_uz": "O'tirib gantel yelka press",
                "name_en": "Seated Dumbbell Shoulder Press",
                "sets": 3,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/qEwKCR5JCog",
                "tip": "Держите пресс в напряжении, не прогибайтесь в пояснице."
            },
            {
                "name": "Разгибания на трицепс с канатом на блоке",
                "name_uz": "Krossoverda arqon bilan triceps",
                "name_en": "Cable Rope Tricep Pushdown",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/2-LAMcpzODU",
                "tip": "Локти зафиксированы у корпуса, полное выпрямление и разведение в нижней точке."
            }
        ]
    },
    {
        "id": 102,
        "split_id": "muscle_gain_male",
        "day_number": 2,
        "day_name": "День 2: Pull (Спина, Задняя дельта, Бицепс)",
        "day_name_uz": "2-kun: Pull (Orqa, Orqa delta, Bitseps)",
        "day_name_en": "Day 2: Pull (Back, Rear Delts, Biceps)",
        "target_goal": "muscle_gain",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Тяга верхнего блока широким хватом",
                "name_uz": "Keng ushlashda yuqori blok tortish",
                "name_en": "Wide-Grip Lat Pulldown",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 75,
                "video_url": "https://www.youtube.com/embed/CAwf7n6Luuc",
                "tip": "Тяните рукоять усилием широчайших мышц, сводя лопатки."
            },
            {
                "name": "Тяга штанги в наклоне к поясу",
                "name_uz": "Egilib shtanga tortish",
                "name_en": "Bent-Over Barbell Row",
                "sets": 4,
                "reps": "8-10",
                "rest_sec": 90,
                "video_url": "https://www.youtube.com/embed/G8l_8chR5BE",
                "tip": "Спина прямая, тяга ведется строго к низу живота."
            },
            {
                "name": "Махи гантелями в наклоне (задняя дельта)",
                "name_uz": "Egilib orqa delta uchun gantel silkitish",
                "name_en": "Rear Delt Dumbbell Fly",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/ttvfGg9d76c",
                "tip": "Локти слегка согнуты, движение без инерции."
            },
            {
                "name": "Подъем штанги на бицепс стоя",
                "name_uz": "Tik turib shtanga bilan bitseps",
                "name_en": "Standing Barbell Bicep Curl",
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
        "day_name_uz": "3-kun: Legs & Core (Oyoqlar, Dumba, Qorin)",
        "day_name_en": "Day 3: Legs & Core (Quads, Hamstrings, Abs)",
        "target_goal": "muscle_gain",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Классические приседания со штангой",
                "name_uz": "Yelkada shtanga bilan klassik cho'kish",
                "name_en": "Barbell Back Squat",
                "sets": 4,
                "reps": "8-10",
                "rest_sec": 120,
                "video_url": "https://www.youtube.com/embed/bEv6CCg2BC8",
                "tip": "Колени смотрят по направлению носков, глубина до параллели."
            },
            {
                "name": "Румынская становая тяга с гантелями",
                "name_uz": "Gantellar bilan rumincha tortish",
                "name_en": "Romanian Deadlift",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 90,
                "video_url": "https://www.youtube.com/embed/JCXUYuzwNrM",
                "tip": "Отводите таз назад, чувствуйте растяжение задней поверхности бедра."
            },
            {
                "name": "Выпады назад с гантелями",
                "name_uz": "Orqaga qadam cho'kish",
                "name_en": "Reverse Dumbbell Lunges",
                "sets": 3,
                "reps": "10-12 на ногу",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/wrwwXE_x-pQ",
                "tip": "Мягкий шаг назад, колено передней ноги под 90°."
            },
            {
                "name": "Подъем ног в висе на перекладине",
                "name_uz": "Turnikda oyoqlarni ko'tarish",
                "name_en": "Hanging Leg / Knee Raises",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/JB2oyawG9KI",
                "tip": "Подкручивайте таз к груди для максимальной работы пресса."
            }
        ]
    },

    # ==========================================
    # 2. MUSCLE GAIN / CURVES & GLUTES (FEMALE) - 3-DAY SPLIT
    # ==========================================
    {
        "id": 151,
        "split_id": "muscle_gain_female",
        "day_number": 1,
        "day_name": "День 1: Ягодицы & Бицепс бедра (Glute Hypertrophy)",
        "day_name_uz": "1-kun: Dumba & Son orqasi (Glute Hypertrophy)",
        "day_name_en": "Day 1: Glutes & Hamstrings (Curves & Hypertrophy)",
        "target_goal": "muscle_gain",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Ягодичный мостик со штангой на скамье (Hip Thrust)",
                "name_uz": "Skameykada shtanga bilan dumba ko'prigi (Hip Thrust)",
                "name_en": "Barbell Hip Thrust on Bench",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 75,
                "video_url": "https://www.youtube.com/embed/SEdqd1n0cvg",
                "tip": "Пауза 2 секунды в верхней точке с максимальным прожимом ягодиц. Подбородок прижат к груди."
            },
            {
                "name": "Болгарские сплит-приседания (наклон 20°)",
                "name_uz": "Bolgarcha split-cho'kish",
                "name_en": "Bulgarian Split Squats (Glute Lean)",
                "sets": 3,
                "reps": "10-12 на ногу",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/2C-uNgKwPLE",
                "tip": "Наклоните корпус вперед под 20°, смещая нагрузку строго в рабочую ягодицу."
            },
            {
                "name": "Румынская тяга с гантелями",
                "name_uz": "Gantellar bilan rumincha tortish",
                "name_en": "Dumbbell Romanian Deadlift",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/JCXUYuzwNrM",
                "tip": "Отводите таз назад, гантели скользят вплотную по голеням."
            },
            {
                "name": "Разведение ног в тренажере сидя (Abductor)",
                "name_uz": "Trenajyorda oyoqlarni yonga ochish",
                "name_en": "Seated Hip Abductor",
                "sets": 4,
                "reps": "15-20",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/pvIjsG5Svck",
                "tip": "Наклоните корпус слегка вперед для изоляции верхнего пучка ягодиц."
            }
        ]
    },
    {
        "id": 152,
        "split_id": "muscle_gain_female",
        "day_number": 2,
        "day_name": "День 2: Осанка, Спина & Изящные Руки (Upper Posture & Tone)",
        "day_name_uz": "2-kun: Qomat, Orqa, Yelka & Qo'llar (Upper Posture)",
        "day_name_en": "Day 2: Back, Shoulders & Toned Arms (Posture & Sculpt)",
        "target_goal": "muscle_gain",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Тяга верхнего блока к груди",
                "name_uz": "Yuqori blokni ko'krakka tortish",
                "name_en": "Lat Pulldown to Chest",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/CAwf7n6Luuc",
                "tip": "Тяните лопатки вниз, расправляя грудную клетку."
            },
            {
                "name": "Жим гантелей сидя на скамье (плечи)",
                "name_uz": "O'tirib gantel press",
                "name_en": "Seated Dumbbell Shoulder Press",
                "sets": 3,
                "reps": "12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/qEwKCR5JCog",
                "tip": "Плавный подъем по дуге, локти слегка направлены вперед."
            },
            {
                "name": "Тяга горизонтального блока к поясу",
                "name_uz": "Gorizontal blokni belga tortish",
                "name_en": "Seated Cable Row",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/GZbfZ033f74",
                "tip": "Сводите лопатки вместе в конце движения."
            },
            {
                "name": "Суперсет: Трицепс на блоке + Бицепс с гантелями",
                "name_uz": "Superset: Triceps + Bitseps",
                "name_en": "Superset: Tricep Pushdown + Bicep Curls",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/2-LAMcpzODU",
                "tip": "Тонус рук без увеличения объема."
            }
        ]
    },
    {
        "id": 153,
        "split_id": "muscle_gain_female",
        "day_number": 3,
        "day_name": "День 3: Квадрицепс, Пресс & Кор (Legs & Abs Sculpt)",
        "day_name_uz": "3-kun: Sonlar, Qorin & Kor (Legs & Abs Sculpt)",
        "day_name_en": "Day 3: Quads, Glutes & Deep Core Sculpt",
        "target_goal": "muscle_gain",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Кубковые приседания плие с гантелью",
                "name_uz": "Gantel bilan plie cho'kish (Goblet Squat)",
                "name_en": "Goblet Plie Squat",
                "sets": 4,
                "reps": "12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/MeIiIdhvXT4",
                "tip": "Широкая постановка ног, колени разведены по направлению носков."
            },
            {
                "name": "Гиперэкстензия с акцентом на ягодицы (45°)",
                "name_uz": "Dumba uchun 45° giperekstenziya",
                "name_en": "45° Glute Hyperextension",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/SEdqd1n0cvg",
                "tip": "Носки развернуты на 45°, подъем ТОЛЬКО за счет сжатия ягодиц."
            },
            {
                "name": "Подъем коленей на брусьях (подкручивание таза)",
                "name_uz": "Tizzalarni ko'tarish",
                "name_en": "Captain's Chair Knee Raises",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/JB2oyawG9KI",
                "tip": "Подкручивайте таз наверх, выдыхая весь воздух в верхней точке."
            },
            {
                "name": "Боковая планка + Планка на предплечьях",
                "name_uz": "Yon planka + Klassik planka",
                "name_en": "Side Plank & Forearm Plank Combo",
                "sets": 3,
                "reps": "45 сек",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/pvIjsG5Svck",
                "tip": "Живот подтянут к позвоночнику, прямое положение тела."
            }
        ]
    },

    # ==========================================
    # 3. WEIGHT LOSS / TONING (FEMALE) - 3-DAY SPLIT
    # ==========================================
    {
        "id": 201,
        "split_id": "weight_loss_female",
        "day_number": 1,
        "day_name": "День 1: Glutes, Legs & Core Burn (Ягодицы & Жиросжигание)",
        "day_name_uz": "1-kun: Dumba, Oyoqlar & Yog' yoqish",
        "day_name_en": "Day 1: Glutes, Lower Body & Metabolic Core Burn",
        "target_goal": "weight_loss",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Ягодичный мостик с гантелью / штангой",
                "name_uz": "Gantel bilan dumba ko'prigi",
                "name_en": "Dumbbell / Barbell Hip Thrust",
                "sets": 4,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/SEdqd1n0cvg",
                "tip": "Пауза в верхней точке на 2 секунды с мощным сжатием ягодиц."
            },
            {
                "name": "Болгарские сплит-приседания",
                "name_uz": "Bolgarcha split-cho'kish",
                "name_en": "Bulgarian Split Squats",
                "sets": 3,
                "reps": "12 на ногу",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/2C-uNgKwPLE",
                "tip": "Корпус слегка наклонен вперед для акцента на ягодицу."
            },
            {
                "name": "Румынская становая тяга с гантелями",
                "name_uz": "Gantellar bilan rumincha tortish",
                "name_en": "Romanian Deadlift",
                "sets": 4,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/JCXUYuzwNrM",
                "tip": "Плавное движение вниз за счет отведения таза назад."
            },
            {
                "name": "Динамическая планка с касанием плеч",
                "name_uz": "Dinamik planka",
                "name_en": "Dynamic Plank with Shoulder Taps",
                "sets": 3,
                "reps": "45 сек",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/pvIjsG5Svck",
                "tip": "Держите тело в одной линии без раскачивания таза."
            }
        ]
    },
    {
        "id": 202,
        "split_id": "weight_loss_female",
        "day_number": 2,
        "day_name": "День 2: Upper Body & Toning (Спина, Плечи, Осанка)",
        "day_name_uz": "2-kun: Qomat, Orqa, Yelka & Qo'llar (Toning)",
        "day_name_en": "Day 2: Upper Body Sculpt, Posture & Calorie Burn",
        "target_goal": "weight_loss",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Тяга верхнего блока широким хватом",
                "name_uz": "Keng ushlab yuqori blok tortish",
                "name_en": "Lat Pulldown Wide Grip",
                "sets": 4,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/CAwf7n6Luuc",
                "tip": "Красивая осанка и раскрытие грудного отдела."
            },
            {
                "name": "Жим гантелей сидя на скамье",
                "name_uz": "O'tirib gantel press",
                "name_en": "Dumbbell Shoulder Press",
                "sets": 3,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/qEwKCR5JCog",
                "tip": "Укрепление плечевого пояса без перегрузки шеи."
            },
            {
                "name": "Тяга горизонтального блока к поясу",
                "name_uz": "Gorizontal blok tortish",
                "name_en": "Seated Cable Row",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/GZbfZ033f74",
                "tip": "Сводите лопатки вместе в конце амплитуды."
            },
            {
                "name": "Отжимания от возвышения / с колен",
                "name_uz": "Tizzada / tayanchda yotib press",
                "name_en": "Incline / Knee Push-ups",
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
        "day_name_uz": "3-kun: Butun tana & Kardiomashq (HIIT Burn)",
        "day_name_en": "Day 3: HIIT Full Body Conditioning & Calorie Burn",
        "target_goal": "weight_loss",
        "target_gender": "female",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Трастеры с гантелями (Присед + жим)",
                "name_uz": "Gantellar bilan trasterlar",
                "name_en": "Dumbbell Thrusters",
                "sets": 4,
                "reps": "12-15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/MeIiIdhvXT4",
                "tip": "Слитное взрывное движение."
            },
            {
                "name": "Махи гирей / гантелью (Kettlebell swings)",
                "name_uz": "Gira bilan siltanish",
                "name_en": "Kettlebell / Dumbbell Swings",
                "sets": 4,
                "reps": "20",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/sSESeQEqu28",
                "tip": "Взрывной толчок бедрами вперед, спина прямая."
            },
            {
                "name": "Скручивания на пресс + «Велосипед»",
                "name_uz": "Qorin bukish + Velosiped",
                "name_en": "Ab Crunches & Bicycle",
                "sets": 3,
                "reps": "20",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/Xyd_fa5zoEU",
                "tip": "Поясница прижата к полу, выдох на подъеме."
            },
            {
                "name": "Интервальное кардио (дорожка под наклоном 12%)",
                "name_uz": "Interval kardiomashq (12% qiyalikdagi yo'lak)",
                "name_en": "Incline Treadmill Walk (12-3-30)",
                "sets": 1,
                "reps": "20 минут",
                "rest_sec": 0,
                "video_url": "https://www.youtube.com/embed/X3q5e1kA4xU",
                "tip": "Ходьба под наклоном 10-12% без поддержки руками."
            }
        ]
    },

    # ==========================================
    # 4. WEIGHT LOSS / CONDITIONING (MALE) - 3-DAY SPLIT
    # ==========================================
    {
        "id": 301,
        "split_id": "weight_loss_male",
        "day_number": 1,
        "day_name": "День 1: Full Body Strength & Conditioning",
        "day_name_uz": "1-kun: Butun tana kuch & Kardio",
        "day_name_en": "Day 1: Full Body Strength & Conditioning",
        "target_goal": "weight_loss",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Приседания со штангой / кубковые приседания",
                "sets": 4,
                "reps": "12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/bEv6CCg2BC8",
                "tip": "Слитный бодрый темп, глубокое дыхание."
            },
            {
                "name": "Жим штанги / гантелей лежа",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/rT7DgCr-3pg",
                "tip": "Мощный выжим вверх на выдохе."
            },
            {
                "name": "Тяга верхнего блока к груди",
                "sets": 4,
                "reps": "12",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/CAwf7n6Luuc",
                "tip": "Сводите лопатки, тяните к ключицам."
            },
            {
                "name": "Планка с подтягиванием коленей (Mountain Climbers)",
                "sets": 3,
                "reps": "45 сек",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/pvIjsG5Svck",
                "tip": "Частые смены ног в упоре лежа."
            }
        ]
    },
    {
        "id": 302,
        "split_id": "weight_loss_male",
        "day_number": 2,
        "day_name": "День 2: Upper / Lower Hyper-Fat Burn",
        "day_name_uz": "2-kun: Upper / Lower Yog' yoqish",
        "day_name_en": "Day 2: Upper / Lower Metabolic Split",
        "target_goal": "weight_loss",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Румынская становая тяга со штангой",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/JCXUYuzwNrM",
                "tip": "Спина прямая, таз назад."
            },
            {
                "name": "Армейский жим гантелей сидя",
                "sets": 3,
                "reps": "12",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/qEwKCR5JCog",
                "tip": "Держите кор напряженным."
            },
            {
                "name": "Тяга штанги в наклоне",
                "sets": 4,
                "reps": "10-12",
                "rest_sec": 60,
                "video_url": "https://www.youtube.com/embed/G8l_8chR5BE",
                "tip": "Тяните к поясу."
            },
            {
                "name": "Скручивания на коврике + Планка",
                "sets": 3,
                "reps": "20 + 45с",
                "rest_sec": 30,
                "video_url": "https://www.youtube.com/embed/Xyd_fa5zoEU",
                "tip": "Поясница прижата к полу."
            }
        ]
    },
    {
        "id": 303,
        "split_id": "weight_loss_male",
        "day_number": 3,
        "day_name": "День 3: High Intensity Conditioning (Интенсив & Кардио)",
        "day_name_uz": "3-kun: Yuqori intensivlik & Kardio (HIIT)",
        "day_name_en": "Day 3: High Intensity Conditioning & Explosive Burn",
        "target_goal": "weight_loss",
        "target_gender": "male",
        "difficulty_level": 1,
        "exercises": [
            {
                "name": "Махи гирей двумя руками (Kettlebell Swings)",
                "sets": 4,
                "reps": "20",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/sSESeQEqu28",
                "tip": "Мощный толчок тазом вперед, руки прямые."
            },
            {
                "name": "Трастеры с гантелями (Присед + жим вверх)",
                "sets": 3,
                "reps": "15",
                "rest_sec": 45,
                "video_url": "https://www.youtube.com/embed/MeIiIdhvXT4",
                "tip": "Слитное мощное движение."
            },
            {
                "name": "Удары боевыми канатами (Battle Ropes) / Бёрпи",
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
    matched = [
        w for w in WORKOUT_SPLITS
        if (w["target_goal"] == goal or w["target_goal"] == "any") and
           (w["target_gender"] == gender or w["target_gender"] == "any") and
           w["difficulty_level"] <= level
    ]
    
    if not matched:
        matched = [w for w in WORKOUT_SPLITS if w["target_goal"] == goal]
        
    if not matched:
        matched = WORKOUT_SPLITS[:3]
        
    matched.sort(key=lambda x: x.get("day_number", 1))
    return matched