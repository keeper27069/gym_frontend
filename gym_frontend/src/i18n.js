// Multilingual dictionary for Gym TMA (Russian, Uzbek, English)

export const TRANSLATIONS = {
  ru: {
    // Navigation tabs
    tab_workouts: 'Тренировки',
    tab_calendar: 'Календарь',
    tab_nutrition: 'Питание',
    tab_profile: 'Профиль',

    // Header & Global
    active_status: 'Твой уровень',
    active_streak: 'нед. стрик',
    switch_language: 'Язык интерфейса',
    save: 'Сохранить',
    cancel: 'Отмена',
    close: 'Закрыть',
    back: 'Назад',
    confirm: 'Подтвердить',
    loading: 'Загрузка...',
    error_loading: 'Ошибка загрузки данных',

    // Onboarding / Profile Setup
    setup_title: 'Твой личный Pro-профиль',
    setup_subtitle: 'ИИ подберет биомеханически идеальную программу под твои цели',
    gender_label: 'Твой пол',
    gender_male: 'Мужской',
    gender_female: 'Женский',
    age_label: 'Возраст (лет)',
    weight_label: 'Текущий вес (кг)',
    goal_label: 'Главная цель',
    goal_muscle_gain: 'Набор сухой массы & Форма',
    goal_weight_loss: 'Похудение & Жиросжигание',
    start_journey_btn: '⚡ Начать путь чемпиона',

    // Workouts Tab
    periodization_title: '4-недельная периодизация',
    week_1: 'Неделя 1: Техника & Адаптация',
    week_2: 'Неделя 2: Объемная Гипертрофия',
    week_3: 'Неделя 3: Силовой Пик',
    week_4: 'Неделя 4: Делод & Восстановление',
    week_short: 'нед.',
    start_workout_btn: 'НАЧАТЬ ТРЕНИРОВКУ В ЗАЛЕ',
    exercises_count: 'упр.',
    sets_label: 'подх.',
    reps_label: 'повт.',
    rpe_label: 'RPE',
    tempo_label: 'Темп',
    video_btn: 'Видео',
    swap_btn: 'Замена',
    show_video: 'Показать видео',
    hide_video: 'Скрыть видео',
    fullscreen_video: 'На весь экран',
    exit_fullscreen: 'Свернуть',
    open_youtube: 'В YouTube',
    pro_tip: 'Совет тренера',
    video_error_title: 'Видео недоступно для встроенного просмотра',
    video_error_desc: 'Автор видео ограничил показ на сторонних сайтах из-за авторских прав. Вы можете легко открыть его напрямую в приложении YouTube или включить альтернативное видео:',
    open_in_youtube_btn: '▶️ Смотреть прямо в приложении YouTube',
    switch_to_backup_video: '🔄 Включить запасное видео',
    search_exercise_youtube: '🔍 Найти технику упражнения в YouTube',
    video_help_btn: 'Не открывается видео?',
    video_source_badge: 'YouTube видеоинструкция',

    // Live Workout Modal
    live_active_title: 'Активная тренировка',
    stage_warmup: '1. Разминка',
    stage_exercises: '2. Упражнения',
    stage_cooldown: '3. Заминка',
    stage_summary: '4. Итоги',
    warmup_title: 'Суставная разминка перед нагрузкой (5 мин)',
    warmup_desc: 'Защитите суставы и связки от травм, разогрейте ротаторы и подготовьте сердце к работе:',
    warmup_ready_btn: 'Разминка готова → Начать упражнения',
    set_header: 'Сет',
    weight_header: 'Вес (кг)',
    reps_header: 'Повторы',
    done_header: 'Готово',
    finish_exercises_btn: 'Завершить упражнения → Заминка',
    cooldown_title: 'Заминка и растяжка (4 мин)',
    cooldown_desc: 'Снизьте пульс, нормализуйте давление и ускорьте восстановление мышц:',
    finish_workout_btn: 'Завершить тренировку & Итоги',

    // Summary Screen
    summary_congrats: 'ТРЕНИРОВКА ЗАВЕРШЕНА!',
    summary_subtitle: 'Отличная работа! Твоя дисциплина формирует результат.',
    stat_tonnage: 'Общий тоннаж',
    stat_sets: 'Выполнено сетов',
    stat_xp: 'Получено XP',
    stat_streak: 'Новый стрик',
    proof_photo_title: '📸 Фото-отчет из зала',
    proof_photo_desc: 'Загрузи фото из зала для подтверждения и фиксации прогресса:',
    take_photo_btn: 'Сделать фото / Выбрать из галереи',
    save_summary_btn: 'Сохранить результат и закрыть',

    // Rest Timer
    rest_timer_title: 'Таймер отдыха',
    rest_timer_desc: 'Восстанови дыхание перед следующим подходом',
    skip_timer: 'Пропустить отдых',
    sound_timer: 'Звук таймера',

    // Alternative Exercise Modal
    swap_modal_title: 'Выбор альтернативного упражнения',
    swap_modal_desc: 'Если тренажер занят или есть дискомфорт, выбери научно подобранный аналог:',
    select_this_exercise: 'Выбрать это упражнение',

    // Calendar Tab
    calendar_title: 'Трекер посещений зала',
    calendar_subtitle: 'Отметки активности и история фото-отчетов',
    weekly_goal: 'на этой неделе',
    month_activity: 'Активность за месяц',
    checkin_history: 'История фото-отчетов',
    no_checkins: 'Пока нет загруженных фото-отчетов. Начни с сегодняшней тренировки!',

    // Nutrition Tab
    nutrition_title: 'Персональный расчет питания',
    nutrition_subtitle: 'Формула Миффлина-Сан Жеора с учетом твоих параметров и цели',
    daily_calories: 'Целевая калорийность',
    kcal_day: 'ккал / день',
    protein_label: 'Белки',
    fats_label: 'Жиры',
    carbs_label: 'Углеводы',
    water_label: 'Норма чистой воды',
    glasses_label: 'стаканов по 250 мл',
    bmr_label: 'Базовый обмен (BMR)',
    tdee_label: 'Расход с активностью (TDEE)',
    one_rm_calc: 'Калькулятор 1ПМ (1 Rep Max)',
    one_rm_calc_desc: 'Формула Бржицки для расчета максимального рабочего веса на 1 повторение:',
    lifted_weight: 'Поднятый вес (кг)',
    reps_performed: 'Количество повторений',
    calc_result: 'Твой расчетный 1ПМ',
    intensity_pct: 'Процентовка для тренировок',

    // Profile Tab
    profile_title: 'Профиль атлета & Достижения',
    current_rank: 'Текущий ранг',
    next_rank: 'Следующий ранг',
    progress_to_next: 'Прогресс до следующего ранга',
    workouts_left: 'тренировок осталось',
    weeks_left: 'недель до ранга',
    unlocked_perks: 'Открытые привилегии ранга',
    edit_profile: 'Изменить параметры профиля',
    telegram_id: 'Telegram ID'
  },

  uz: {
    // Navigation tabs
    tab_workouts: "Mashg'ulotlar",
    tab_calendar: 'Taqvim',
    tab_nutrition: 'Oziqlanish',
    tab_profile: 'Profil',

    // Header & Global
    active_status: 'Darajangiz',
    active_streak: 'hafta ketma-ket',
    switch_language: 'Interfeys tili',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    close: 'Yopish',
    back: 'Orqaga',
    confirm: 'Tasdiqlash',
    loading: 'Yuklanmoqda...',
    error_loading: "Ma'lumot yuklashda xatolik",

    // Onboarding / Profile Setup
    setup_title: 'Shaxsiy Pro-profilingiz',
    setup_subtitle: "Sun'iy intellekt maqsadlaringizga mos mukammal mashqlar dasturini tuzadi",
    gender_label: 'Jinsingiz',
    gender_male: 'Erkak',
    gender_female: 'Ayol',
    age_label: 'Yoshingiz',
    weight_label: 'Hozirgi vazningiz (kg)',
    goal_label: 'Asosiy maqsad',
    goal_muscle_gain: "Mushak yig'ish & Chiroyli qomat",
    goal_weight_loss: 'Ozish & Yog‘ yoqish',
    start_journey_btn: "⚡ Chempionlik yo'lini boshlash",

    // Workouts Tab
    periodization_title: '4 haftalik davrlashtirish',
    week_1: '1-hafta: Texnika & Moslashuv',
    week_2: '2-hafta: Gipertrofiya (Hajm)',
    week_3: '3-hafta: Kuch cho‘qqisi',
    week_4: '4-hafta: Tiklanish & Dam olish',
    week_short: 'hafta',
    start_workout_btn: "ZALDA MASHG'ULOTNI BOSHLASH",
    exercises_count: 'mashq',
    sets_label: 'set',
    reps_label: 'takror',
    rpe_label: 'RPE',
    tempo_label: 'Sur\'at',
    video_btn: 'Video',
    swap_btn: 'Almashtirish',
    show_video: "Videoni ko'rish",
    hide_video: 'Videoni yashirish',
    fullscreen_video: "To'liq ekran",
    exit_fullscreen: 'Kichraytirish',
    open_youtube: "YouTube'da ochish",
    pro_tip: 'Murabbiy maslahati',
    video_error_title: "Videoni bu yerda ochib bo'lmadi",
    video_error_desc: "Mualliflik huquqi sababli muallif videoni sayt ichida ko'rsatishni cheklagan. Uni to'g'ridan-to'g'ri YouTube ilovasida ochishingiz yoki muqobil videoni ko'rishingiz mumkin:",
    open_in_youtube_btn: "▶️ To'g'ridan-to'g'ri YouTube ilovasida ochish",
    switch_to_backup_video: '🔄 Zaxira videoni yoqish',
    search_exercise_youtube: "🔍 Mashq texnikasini YouTubedan qidirish",
    video_help_btn: 'Video ochilmayaptimi?',
    video_source_badge: "YouTube ko'rsatma",

    // Live Workout Modal
    live_active_title: "Faol mashg'ulot",
    stage_warmup: '1. Qizish',
    stage_exercises: '2. Mashqlar',
    stage_cooldown: '3. Sovush',
    stage_summary: '4. Xulosa',
    warmup_title: "Yuklama oldidan bo'g'inlar qizishi (5 daqiqa)",
    warmup_desc: "Bo'g'in va paylarni jarohatdan himoya qiling, yurakni ishga tayyorlang:",
    warmup_ready_btn: "Qizish tayyor → Mashqlarni boshlash",
    set_header: 'Set',
    weight_header: 'Vazn (kg)',
    reps_header: 'Takror',
    done_header: 'Bajarildi',
    finish_exercises_btn: 'Mashqlarni yakunlash → Sovush',
    cooldown_title: "Sovush va cho'zilish (4 daqiqa)",
    cooldown_desc: "Pulsni tushiring, qon bosimini me'yorga keltiring va mushaklarni tiklang:",
    finish_workout_btn: "Mashg'ulotni yakunlash & Xulosa",

    // Summary Screen
    summary_congrats: "MASHG'ULOT MUZAFARONA TUGADI!",
    summary_subtitle: "Ajoyib natija! Intizom sizni buyuk maqsadlarga eltadi.",
    stat_tonnage: 'Umumiy tonnaj',
    stat_sets: 'Bajarilgan setlar',
    stat_xp: 'Olingan XP',
    stat_streak: 'Yangi ketma-ketlik',
    proof_photo_title: "📸 Zaldan foto-hisobot",
    proof_photo_desc: "Natijangizni tasdiqlash uchun zaldan rasm yuklang:",
    take_photo_btn: "Rasmga olish / Galereyadan tanlash",
    save_summary_btn: 'Natijani saqlash va yopish',

    // Rest Timer
    rest_timer_title: 'Dam olish taymeri',
    rest_timer_desc: 'Keyingi yondashuv oldidan nafasingizni rostlang',
    skip_timer: "Dam olishni o'tkazib yuborish",
    sound_timer: 'Taymer ovozi',

    // Alternative Exercise Modal
    swap_modal_title: "Muqobil mashqni tanlash",
    swap_modal_desc: "Agar trenajyor band bo'lsa yoki noqulaylik bo'lsa, mos analog tanlang:",
    select_this_exercise: 'Ushbu mashqni tanlash',

    // Calendar Tab
    calendar_title: 'Zalga borish taqvimi',
    calendar_subtitle: 'Faollik belgilari va foto-hisobotlar tarixi',
    weekly_goal: 'bu haftada',
    month_activity: 'Oylik faollik',
    checkin_history: 'Foto-hisobotlar tarixi',
    no_checkins: "Hozircha foto-hisobotlar yo'q. Bugungi mashg'ulotdan boshlang!",

    // Nutrition Tab
    nutrition_title: 'Shaxsiy oziqlanish hisobi',
    nutrition_subtitle: "Mifflin-San Jeor formulasi asosida sizning ko'rsatkichlaringiz hisobi",
    daily_calories: 'Kunlik kaloriya maqsadi',
    kcal_day: 'kkal / kun',
    protein_label: 'Oqsillar',
    fats_label: 'Yog‘lar',
    carbs_label: 'Uglevodlar',
    water_label: 'Kunlik toza suv me\'yori',
    glasses_label: 'stakan (250 ml)',
    bmr_label: 'Asosiy moddalar almashinuvi (BMR)',
    tdee_label: 'Faollik bilan sarf (TDEE)',
    one_rm_calc: '1RM Kalkulyatori (Maksimal kuch)',
    one_rm_calc_desc: 'Brjitski formulasi orqali 1 marta ko\'tara oladigan maksimal vazn:',
    lifted_weight: 'Ko\'tarilgan vazn (kg)',
    reps_performed: 'Takrorlashlar soni',
    calc_result: 'Hisoblangan 1RM',
    intensity_pct: 'Mashq foizlari',

    // Profile Tab
    profile_title: 'Atlet profili & Yutuqlar',
    current_rank: 'Hozirgi unvon',
    next_rank: 'Keyingi unvon',
    progress_to_next: 'Keyingi unvongacha progress',
    workouts_left: "ta mashg'ulot qoldi",
    weeks_left: 'hafta qoldi',
    unlocked_perks: 'Ochilgan imkoniyatlar',
    edit_profile: "Profil ma'lumotlarini o'zgartirish",
    telegram_id: 'Telegram ID'
  },

  en: {
    // Navigation tabs
    tab_workouts: 'Workouts',
    tab_calendar: 'Calendar',
    tab_nutrition: 'Nutrition',
    tab_profile: 'Profile',

    // Header & Global
    active_status: 'Your Level',
    active_streak: 'w. streak',
    switch_language: 'Language',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    back: 'Back',
    confirm: 'Confirm',
    loading: 'Loading...',
    error_loading: 'Error loading data',

    // Onboarding / Profile Setup
    setup_title: 'Your Personal Pro Profile',
    setup_subtitle: 'AI creates a biomechanically optimized program tailored to your goals',
    gender_label: 'Gender',
    gender_male: 'Male',
    gender_female: 'Female',
    age_label: 'Age (years)',
    weight_label: 'Current Weight (kg)',
    goal_label: 'Primary Goal',
    goal_muscle_gain: 'Muscle Gain & Physique Tone',
    goal_weight_loss: 'Weight Loss & Fat Burning',
    start_journey_btn: '⚡ Start Champion Journey',

    // Workouts Tab
    periodization_title: '4-Week Periodization',
    week_1: 'Week 1: Technique & Adaptation',
    week_2: 'Week 2: Volume Hypertrophy',
    week_3: 'Week 3: Strength Peak',
    week_4: 'Week 4: Deload & Recovery',
    week_short: 'wk.',
    start_workout_btn: 'START WORKOUT IN GYM',
    exercises_count: 'ex.',
    sets_label: 'sets',
    reps_label: 'reps',
    rpe_label: 'RPE',
    tempo_label: 'Tempo',
    video_btn: 'Video',
    swap_btn: 'Swap',
    show_video: 'Show Video',
    hide_video: 'Hide Video',
    fullscreen_video: 'Fullscreen',
    exit_fullscreen: 'Exit Fullscreen',
    open_youtube: 'Open in YouTube',
    pro_tip: 'Coach Tip',
    video_error_title: 'Video Unavailable in Embedded Player',
    video_error_desc: 'The creator restricted embedding due to copyright or platform settings. You can easily watch it directly in the YouTube app or switch to a backup video:',
    open_in_youtube_btn: '▶️ Watch Directly in YouTube App',
    switch_to_backup_video: '🔄 Switch to Backup Video',
    search_exercise_youtube: '🔍 Search Exercise Form on YouTube',
    video_help_btn: 'Video not playing?',
    video_source_badge: 'YouTube Tutorial',

    // Live Workout Modal
    live_active_title: 'Active Workout',
    stage_warmup: '1. Warm-up',
    stage_exercises: '2. Exercises',
    stage_cooldown: '3. Cool-down',
    stage_summary: '4. Summary',
    warmup_title: 'Joint & Mobility Warm-up (5 min)',
    warmup_desc: 'Protect joints, warm up shoulder rotators, and prepare cardiovascular system:',
    warmup_ready_btn: 'Warm-up Complete → Start Exercises',
    set_header: 'Set',
    weight_header: 'Weight (kg)',
    reps_header: 'Reps',
    done_header: 'Done',
    finish_exercises_btn: 'Finish Exercises → Cool-down',
    cooldown_title: 'Cool-down & Stretching (4 min)',
    cooldown_desc: 'Lower heart rate, normalize blood pressure, and accelerate recovery:',
    finish_workout_btn: 'Complete Workout & View Summary',

    // Summary Screen
    summary_congrats: 'WORKOUT COMPLETED!',
    summary_subtitle: 'Outstanding work! Consistency and discipline build champions.',
    stat_tonnage: 'Total Tonnage',
    stat_sets: 'Completed Sets',
    stat_xp: 'XP Earned',
    stat_streak: 'New Streak',
    proof_photo_title: '📸 Gym Proof Photo',
    proof_photo_desc: 'Upload a gym photo to verify and track your body transformation:',
    take_photo_btn: 'Take Photo / Upload from Gallery',
    save_summary_btn: 'Save Result & Close',

    // Rest Timer
    rest_timer_title: 'Rest Timer',
    rest_timer_desc: 'Catch your breath before the next working set',
    skip_timer: 'Skip Rest',
    sound_timer: 'Timer Sound',

    // Alternative Exercise Modal
    swap_modal_title: 'Select Alternative Exercise',
    swap_modal_desc: 'If equipment is busy or causes discomfort, choose a biomechanic equivalent:',
    select_this_exercise: 'Select This Exercise',

    // Calendar Tab
    calendar_title: 'Gym Attendance Tracker',
    calendar_subtitle: 'Activity tracker and check-in proof history',
    weekly_goal: 'this week',
    month_activity: 'Monthly Activity',
    checkin_history: 'Photo Check-in History',
    no_checkins: 'No photo check-ins uploaded yet. Start with today\'s workout!',

    // Nutrition Tab
    nutrition_title: 'Personalized Nutrition Calculator',
    nutrition_subtitle: 'Mifflin-St Jeor daily caloric and macronutrient targets for your goal',
    daily_calories: 'Daily Calorie Target',
    kcal_day: 'kcal / day',
    protein_label: 'Protein',
    fats_label: 'Fats',
    carbs_label: 'Carbs',
    water_label: 'Daily Pure Water Target',
    glasses_label: 'glasses (250 ml each)',
    bmr_label: 'Basal Metabolic Rate (BMR)',
    tdee_label: 'Total Daily Energy Expenditure (TDEE)',
    one_rm_calc: '1RM Calculator (One Rep Max)',
    one_rm_calc_desc: 'Brzycki formula calculating your maximum 1-rep lift:',
    lifted_weight: 'Lifted Weight (kg)',
    reps_performed: 'Reps Completed',
    calc_result: 'Your Estimated 1RM',
    intensity_pct: 'Training Percentages',

    // Profile Tab
    profile_title: 'Athlete Profile & Achievements',
    current_rank: 'Current Rank',
    next_rank: 'Next Rank',
    progress_to_next: 'Progress to Next Rank',
    workouts_left: 'workouts left',
    weeks_left: 'weeks left',
    unlocked_perks: 'Unlocked Rank Perks',
    edit_profile: 'Edit Profile Parameters',
    telegram_id: 'Telegram ID'
  }
};

/**
 * Get localized string by key
 */
export function t(key, lang = 'ru') {
  const selectedLang = TRANSLATIONS[lang] ? lang : 'ru';
  return TRANSLATIONS[selectedLang][key] || TRANSLATIONS.ru[key] || key;
}

/**
 * Helper to get localized property from exercise/split object (e.g. name, name_uz, name_en)
 */
export function getLocalizedField(item, field, lang = 'ru') {
  if (!item) return '';
  if (lang === 'uz' && item[`${field}_uz`]) return item[`${field}_uz`];
  if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`];
  return item[field] || '';
}
