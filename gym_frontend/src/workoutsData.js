// workoutsData.js - Professional Periodized Workout Catalog, Level Perks, 1RM & Nutrition Calculators

/**
 * Extracts YouTube Video ID from any format (embed, watch, youtu.be, shorts)
 */
export function getYoutubeId(url) {
  if (!url) return '';
  const str = String(url).trim();
  const match = str.match(/(?:embed\/|v=|vi=|youtu\.be\/|shorts\/|\/v\/|^)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
}

/**
 * Returns safe, optimized YouTube embed URL with loop and playsinline parameters
 */
export function getYoutubeEmbedUrl(url, autoplay = true) {
  const id = getYoutubeId(url);
  if (!id) return url || '';
  const ap = autoplay ? '1' : '0';
  return `https://www.youtube.com/embed/${id}?autoplay=${ap}&mute=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&playlist=${id}`;
}

/**
 * Returns direct YouTube link for opening in external app
 */
export function getDirectYoutubeUrl(url) {
  const id = getYoutubeId(url);
  if (!id) return url || '';
  return `https://youtu.be/${id}`;
}

export const LEVEL_PERKS = [
  {
    level: 1,
    rank_name: 'Новичок (Novice)',
    rank_name_uz: 'Boshlang\'ich (Novice)',
    rank_name_en: 'Novice',
    streak_req: 0,
    weeks_span: '0–2 недели',
    color: 'emerald',
    icon: 'Shield',
    description: 'Освоение базовой техники движений и формирование привычки регулярно ходить в зал.',
    description_uz: 'Harakatlarning asosiy texnikasini o\'zlashtirish va muntazam zalga borish odatini shakllantirish.',
    description_en: 'Mastering fundamental lifting biomechanics and building consistent gym habits.',
    perks: [
      { name: 'Базовый 3-дневный сплит', name_uz: 'Asosiy 3 kunlik split', name_en: 'Core 3-Day Split', unlocked: true },
      { name: 'Таймер отдыха между подходами', name_uz: 'Yondashuvlar orasidagi dam olish taymeri', name_en: 'Rest Interval Timer', unlocked: true },
      { name: 'Видео техники упражнений', name_uz: 'Mashqlar texnikasi videolari', name_en: 'Exercise Video Demos', unlocked: true },
      { name: 'Трекер дней недели', name_uz: 'Hafta kunlari trekkeri (3/3)', name_en: 'Weekly 3/3 Goal Tracker', unlocked: true }
    ]
  },
  {
    level: 2,
    rank_name: 'Атлет (Trainee)',
    rank_name_uz: 'Atlet (Trainee)',
    rank_name_en: 'Athlete / Trainee',
    streak_req: 3,
    weeks_span: '3–6 недель',
    color: 'cyan',
    icon: 'Zap',
    description: 'Переход на профессиональную прогрессивную перегрузку и гибкую настройку тренировок.',
    description_uz: 'Professional progressiv yuklama va moslashuvchan mashqlar boshqaruvi.',
    description_en: 'Progressive overload periodization and flexible smart exercise substitution.',
    perks: [
      { name: '4-недельная периодизация', name_uz: '4 haftalik davrlashtirish', name_en: '4-Week Periodization', level_req: 2 },
      { name: '🔄 Умная замена упражнений', name_uz: '🔄 Aqlli mashq almashtirish', name_en: '🔄 Smart Exercise Swap', level_req: 2 },
      { name: 'Календарь активности месяца', name_uz: 'Oylik faollik taqvimi', name_en: 'Monthly Activity Heatmap', level_req: 2 },
      { name: 'Про-метрики: RPE и темп', name_uz: 'Pro ko\'rsatkichlar: RPE va sur\'at', name_en: 'Pro Metrics: RPE & Tempo', level_req: 2 }
    ]
  },
  {
    level: 3,
    rank_name: 'Железный воин (Ironclad)',
    rank_name_uz: 'Temir jangchi (Ironclad)',
    rank_name_en: 'Ironclad Warrior',
    streak_req: 7,
    weeks_span: '7–12 недель',
    color: 'purple',
    icon: 'Trophy',
    description: 'Работа с субмаксимальными весами, расчетом силовых нормативов и пампинг-протоколами.',
    description_uz: 'Maksimalga yaqin vaznlar, kuch hisoblash va pumping protokollari.',
    description_en: 'Submaximal loading, 1RM strength calculation, and metabolic stress protocols.',
    perks: [
      { name: 'Калькулятор 1ПМ (1 Rep Max)', name_uz: '1RM Maksimal kuch kalkulyatori', name_en: '1 Rep Max (1RM) Calculator', level_req: 3 },
      { name: 'Дроп-сеты & Пампинг', name_uz: 'Drop-setlar va Pumping', name_en: 'Drop Sets & Metabolic Burn', level_req: 3 },
      { name: 'Кастомный конструктор весов', name_uz: 'Ishchi vaznlar konstruktori', name_en: 'Custom Weight Load Logger', level_req: 3 }
    ]
  },
  {
    level: 4,
    rank_name: 'Ветеран зала (Veteran)',
    rank_name_uz: 'Zal faxriysi (Veteran)',
    rank_name_en: 'Gym Veteran',
    streak_req: 13,
    weeks_span: '13–23 недели',
    color: 'amber',
    icon: 'Flame',
    description: 'Элитный уровень тренировочного объема, сплиты Золотой Эры и высокоинтенсивные протоколы.',
    description_uz: 'Elita darajadagi yuklama, Oltin davr splitlari va yuqori intensivlik.',
    description_en: 'Elite volume training, Golden Era splits, and high density protocols.',
    perks: [
      { name: 'Pro-Сплиты (Arnold Era & Powerbuilding)', name_uz: 'Pro-Splitlar (Arnold Era)', name_en: 'Pro Golden Era Splits', level_req: 4 },
      { name: 'Таймер высокой плотности (HIIT/Tabata)', name_uz: 'Yuqori zichlikdagi HIIT taymer', name_en: 'High Density HIIT/Tabata Timer', level_req: 4 },
      { name: 'Золотой статус профиля', name_uz: 'Oltin statusli profil', name_en: 'Golden Veteran Profile Badge', level_req: 4 }
    ]
  },
  {
    level: 5,
    rank_name: 'Титан (Titan)',
    rank_name_uz: 'Titan (Titan)',
    rank_name_en: 'Titan',
    streak_req: 24,
    weeks_span: '24+ недели',
    color: 'yellow',
    icon: 'Award',
    description: 'Максимальный ранг мастерства. Полный контроль авторегуляции и вечный статус в Зале Славы.',
    description_uz: 'Eng yuqori mahorat unvoni. Shon-sharaf zalidagi doimiy maqom.',
    description_en: 'Ultimate pinnacle rank. Full auto-regulation matrix and Hall of Fame immortality.',
    perks: [
      { name: 'Зал Славы Атлетов (Hall of Fame)', name_uz: 'Shon-sharaf zali (Hall of Fame)', name_en: 'Hall of Fame Athlete Status', level_req: 5 },
      { name: 'RPE-Matrix Авторегуляция', name_uz: 'RPE-Matrix avtoregulyatsiya', name_en: 'RPE-Matrix Dynamic Auto-Regulation', level_req: 5 },
      { name: 'Неоновая тема Титана', name_uz: 'Titan neon interfeysi', name_en: 'Exclusive Titan Neon Theme', level_req: 5 }
    ]
  }
];

export const PERIODIZATION_WEEKS = {
  1: {
    week: 1,
    title: 'Неделя 1: Техника & Адаптация',
    title_uz: '1-hafta: Texnika & Moslashuv',
    title_en: 'Week 1: Technique & Neuromuscular Adaptation',
    tag: 'Адаптация',
    tag_uz: 'Moslashuv',
    tag_en: 'Adaptation',
    badge_bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Отработка нейромышечной связи, контролируемый темп 3-0-1-0, средний рабочий вес.',
    description_uz: 'Neyromushak aloqasi, 3-0-1-0 nazoratli sur\'ati, o\'rtacha ishchi vazn.',
    description_en: 'Mind-muscle connection, controlled 3-0-1-0 tempo, moderate working weight.',
    reps_mod: '10-12',
    sets_mod: 3,
    rpe: 'RPE 7 (запас 3 повт)',
    tempo: '3-0-1-0 (3с опускание)'
  },
  2: {
    week: 2,
    title: 'Неделя 2: Объемная Гипертрофия',
    title_uz: '2-hafta: Hajmli Gipertrofiya',
    title_en: 'Week 2: Volume Hypertrophy & Pump',
    tag: 'Гипертрофия',
    tag_uz: 'Gipertrofiya',
    tag_en: 'Hypertrophy',
    badge_bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    description: 'Увеличение объема, пампинг, укороченный отдых между сетами для максимального роста.',
    description_uz: 'Hajmni oshirish, qon to\'ldirish (pumping), qisqartirilgan dam olish.',
    description_en: 'Increased volume, targeted pump, shorter rest intervals for muscle growth.',
    reps_mod: '8-10',
    sets_mod: 4,
    rpe: 'RPE 8 (запас 2 повт)',
    tempo: '2-1-1-0 (с фиксацией)'
  },
  3: {
    week: 3,
    title: 'Неделя 3: Силовой Пик & Интенсив',
    title_uz: '3-hafta: Kuch cho\'qqisi & Intensiv',
    title_en: 'Week 3: Strength Peak & High Intensity',
    tag: 'Силовой пик',
    tag_uz: 'Kuch cho\'qqisi',
    tag_en: 'Strength Peak',
    badge_bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    description: 'Тяжелые рабочие веса, максимальное рекрутирование волокон, акцент на базовую силу.',
    description_uz: 'Og\'ir ishchi vaznlar, tolalar faollashuvi, bazaviy kuchga e\'tibor.',
    description_en: 'Heavy loads, maximal motor unit recruitment, compound strength focus.',
    reps_mod: '6-8',
    sets_mod: 4,
    rpe: 'RPE 9 (запас 1 повт)',
    tempo: '2-0-X-0 (взрывной подъем)'
  },
  4: {
    week: 4,
    title: 'Неделя 4: Делод & Суперкомпенсация',
    title_uz: '4-hafta: Tiklanish & Dam olish',
    title_en: 'Week 4: Deload & Supercompensation',
    tag: 'Делод & Восстановление',
    tag_uz: 'Tiklanish & Dam',
    tag_en: 'Deload & Recovery',
    badge_bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'Снижение нагрузки, разгрузка суставов и ЦНС, подготовка к новому рекордному циклу.',
    description_uz: 'Yuklamani kamaytirish, bo\'g\'inlar va asab tizimini tiklash.',
    description_en: 'Light active recovery, joint and CNS restoration, priming for the next cycle.',
    reps_mod: '12-15',
    sets_mod: 3,
    rpe: 'RPE 6 (комфортно)',
    tempo: '2-0-2-0 (плавный темп)'
  }
};

// Complete Exercise Catalog with Pro Alternatives and Biomechanics
export const WORKOUT_SPLITS = [
  // ==========================================
  // 1. MUSCLE GAIN (MALE) - 3-DAY SPLIT
  // ==========================================
  {
    id: 101,
    split_id: 'muscle_gain_male',
    day_number: 1,
    day_name: 'День 1: Push (Грудь, Плечи, Трицепс)',
    day_name_uz: '1-kun: Push (Ko\'krak, Yelka, Triceps)',
    day_name_en: 'Day 1: Push (Chest, Shoulders, Triceps)',
    target_goal: 'muscle_gain',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Развитие грудных мышц, переднего пучка дельт и латеральной головки трицепса',
    focus_uz: 'Ko\'krak mushaklari, oldingi deltalari va triceps rivoji',
    focus_en: 'Chest hypertrophy, anterior delts and triceps lateral head development',
    exercises: [
      {
        id: 'ex_101_1',
        name: 'Жим штанги лежа на горизонтальной скамье',
        name_uz: 'Gorizontal skameykada shtanga bilan press',
        name_en: 'Flat Barbell Bench Press',
        muscle_target: 'Большая грудная мышца (стернальная часть)',
        muscle_target_uz: 'Katta ko\'krak mushaklari',
        muscle_target_en: 'Pectoralis Major (Sternal Head)',
        sets: 4,
        reps: '8-10',
        rest_sec: 90,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/rT7DgCr-3pg',
        tip: 'Сведите лопатки вместе, сохраняйте легкий естественный прогиб (мостик). Опускайте гриф под соски на 3 счета.',
        tip_uz: 'Kuraklarni birlashtiring, shtangani 3 soniyada ko\'krak pastki qismiga tushiring.',
        tip_en: 'Retract scapulae, maintain natural arch, lower barbell to lower chest under control.',
        alternatives: [
          {
            name: 'Жим тяжелых гантелей лежа',
            name_uz: 'Gantellar bilan yotib press',
            name_en: 'Dumbbell Bench Press',
            video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
            tip: 'Более глубокая растяжка грудных в нижней точке без нагрузки на плечевые суставы.'
          },
          {
            name: 'Жим в тренажере Hammer Strength / Смит',
            name_uz: 'Hammer Strength trenajyorida press',
            name_en: 'Hammer Strength Chest Press',
            video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
            tip: 'Идеальная изоляция грудных мышц при усталости мышц-стабилизаторов.'
          }
        ]
      },
      {
        id: 'ex_101_2',
        name: 'Жим гантелей на наклонной скамье (30°)',
        name_uz: 'Qiya skameykada gantel press (30°)',
        name_en: 'Incline Dumbbell Press (30°)',
        muscle_target: 'Верхняя (клавикулярная) порция грудных',
        muscle_target_uz: 'Ko\'krakning yuqori qismi',
        muscle_target_en: 'Upper Clavicular Pectoralis',
        sets: 4,
        reps: '10-12',
        rest_sec: 75,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
        tip: 'Угол скамьи строго 30 градусов, чтобы нагрузка не уходила в переднюю дельту.',
        tip_uz: 'Skameyka burchagi aniq 30 daraja bo\'lsin.',
        tip_en: 'Keep bench incline at 30° to target upper chest rather than front delts.',
        alternatives: [
          {
            name: 'Жим штанги на наклонной скамье',
            name_uz: 'Qiya skameykada shtanga press',
            name_en: 'Incline Barbell Press',
            video_url: 'https://www.youtube.com/embed/rT7DgCr-3pg',
            tip: 'Базовая работа на массивный воротник верха груди.'
          },
          {
            name: 'Сведение рук в кроссовере снизу-вверх',
            name_uz: 'Krossoverda pastdan yuqoriga qo\'l birlashtirish',
            name_en: 'Low-to-High Cable Fly',
            video_url: 'https://www.youtube.com/embed/2-LAMcpzODU',
            tip: 'Постоянное пиковое натяжение в верхней точке амплитуды.'
          }
        ]
      },
      {
        id: 'ex_101_3',
        name: 'Армейский жим стоя / сидя с гантелями',
        name_uz: 'Gantellar bilan o\'tirib yelka press',
        name_en: 'Seated Dumbbell Shoulder Press',
        muscle_target: 'Передняя и средняя дельтовидные мышцы',
        muscle_target_uz: 'Old va o\'rta yelka deltalari',
        muscle_target_en: 'Anterior and Lateral Deltoids',
        sets: 3,
        reps: '10-12',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/qEwKCR5JCog',
        tip: 'Не разводите локти строго под 90°, держите их чуть вперед (угол 75°) для защиты суставной губы плеча.',
        tip_uz: 'Tirsaklarni biroz oldinga tuting (75°), bu bo\'g\'inlarni himoya qiladi.',
        tip_en: 'Slightly angle elbows 75° into scapular plane to protect shoulder joint.',
        alternatives: [
          {
            name: 'Жим штанги с груди стоя (Overhead Press)',
            name_uz: 'Tik turib shtanga press',
            name_en: 'Standing Overhead Press',
            video_url: 'https://www.youtube.com/embed/2yjwXTZQDDI',
            tip: 'Мощная база, включающая всё тело и кор в стабилизацию.'
          },
          {
            name: 'Махи гантелями через стороны стоя',
            name_uz: 'Gantellarni yonga ko\'tarish',
            name_en: 'Lateral Dumbbell Raises',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Чистая изоляция средней дельты для широких плеч.'
          }
        ]
      },
      {
        id: 'ex_101_4',
        name: 'Разгибания на трицепс на блоке с канатной рукоятью',
        name_uz: 'Krossoverda arqon bilan triceps yozish',
        name_en: 'Cable Rope Tricep Pushdown',
        muscle_target: 'Латеральная и медиальная головки трицепса',
        muscle_target_uz: 'Triceps mushagi',
        muscle_target_en: 'Triceps Lateral & Medial Heads',
        sets: 3,
        reps: '12-15',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/2-LAMcpzODU',
        tip: 'В нижней точке разводите кисти в стороны и фиксируйте пиковое сокращение на 1 секунду. Локти прижаты к ребрам.',
        tip_uz: 'Pastki nuqtada arqon uchlarini yonga yoying va 1 soniya qotirib turing.',
        tip_en: 'Flare rope outward at the bottom for maximal peak contraction. Lock elbows.',
        alternatives: [
          {
            name: 'Французский жим с EZ-штангой лежа',
            name_uz: 'Fransuzcha press EZ-shtanga bilan',
            name_en: 'EZ-Bar Skull Crushers',
            video_url: 'https://www.youtube.com/embed/2-LAMcpzODU',
            tip: 'Глубокое растяжение длинной головки трицепса.'
          },
          {
            name: 'Отжимания на брусьях с акцентом на трицепс',
            name_uz: 'Brusda triceps press',
            name_en: 'Tricep Dips on Parallel Bars',
            video_url: 'https://www.youtube.com/embed/2z8JmcrW-As',
            tip: 'Корпус держите строго вертикально, локти близко к телу.'
          }
        ]
      }
    ]
  },
  {
    id: 102,
    split_id: 'muscle_gain_male',
    day_number: 2,
    day_name: 'День 2: Pull (Спина, Задняя дельта, Бицепс)',
    day_name_uz: '2-kun: Pull (Orqa, Orqa delta, Bitseps)',
    day_name_en: 'Day 2: Pull (Back, Rear Delts, Biceps)',
    target_goal: 'muscle_gain',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Ширина и толщина спины, ромбовидные мышцы и пик бицепса',
    focus_uz: 'Orqa kengligi va qalinligi, bitseps kuchi',
    focus_en: 'Lat width, back thickness, rhomboids and bicep peak development',
    exercises: [
      {
        id: 'ex_102_1',
        name: 'Тяга верхнего блока к груди широким хватом',
        name_uz: 'Keng ushlashda yuqori blokni ko\'krakka tortish',
        name_en: 'Wide-Grip Lat Pulldown',
        muscle_target: 'Широчайшие мышцы спины (акцент на ширину)',
        muscle_target_uz: 'Orqa qanotlari (kenglik uchun)',
        muscle_target_en: 'Latissimus Dorsi (V-Taper)',
        sets: 4,
        reps: '10-12',
        rest_sec: 75,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
        tip: 'Тяните локти строго вниз к карманам, а не назад. В нижней точке сводите лопатки.',
        tip_uz: 'Tirsaklarni pastga torting, pastki nuqtada kuraklarni birlashtiring.',
        tip_en: 'Drive elbows down towards hips. Pull with lats, not forearms.',
        alternatives: [
          {
            name: 'Подтягивания широким хватом',
            name_uz: 'Keng ushlab turnikda tortilish',
            name_en: 'Wide Grip Pull-ups',
            video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
            tip: 'Золотой стандарт развития ширины спины с собственным весом.'
          },
          {
            name: 'Тяга верхнего блока параллельным хватом',
            name_uz: 'Parallel ushlashda blok tortish',
            name_en: 'Close-Grip Neutral Pulldown',
            video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
            tip: 'Более комфортная траектория для локтевых суставов.'
          }
        ]
      },
      {
        id: 'ex_102_2',
        name: 'Тяга штанги в наклоне к поясу',
        name_uz: 'Egilib shtangani belga tortish',
        name_en: 'Bent-Over Barbell Row',
        muscle_target: 'Толщина спины, ромбовидные, трапеции',
        muscle_target_uz: 'Orqa qalinligi va trapetsiya',
        muscle_target_en: 'Rhomboids, Mid-Traps & Lat Thickness',
        sets: 4,
        reps: '8-10',
        rest_sec: 90,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/G8l_8chR5BE',
        tip: 'Угол наклона корпуса 45–60°, спина прямая. Тяните гриф к низу живота за счет сжатия мышц спины.',
        tip_uz: 'Orqani tekis tuting, shtangani qorin pastiga torting.',
        tip_en: 'Keep torso at 45°, back flat. Pull barbell to lower abdomen contracting back.',
        alternatives: [
          {
            name: 'Тяга гантели одной рукой в упоре на скамью',
            name_uz: 'Bir qo\'l bilan gantel tortish',
            name_en: 'Single-Arm Dumbbell Row',
            video_url: 'https://www.youtube.com/embed/pYcpY20QaE8',
            tip: 'Снимает осевую нагрузку с поясницы и дает колоссальную амплитуду.'
          },
          {
            name: 'Тяга Т-грифа с упором в грудь',
            name_uz: 'T-grif tortish',
            name_en: 'Chest-Supported T-Bar Row',
            video_url: 'https://www.youtube.com/embed/G8l_8chR5BE',
            tip: 'Полная безопасность позвоночника при тяжелой работе.'
          }
        ]
      },
      {
        id: 'ex_102_3',
        name: 'Махи гантелями в наклоне (задняя дельта)',
        name_uz: 'Egilib orqa delta uchun gantel silkitish',
        name_en: 'Rear Delt Dumbbell Fly',
        muscle_target: 'Задний пучок дельтовидных мышц, подостная мышца',
        muscle_target_uz: 'Orqa yelka deltalari',
        muscle_target_en: 'Posterior Deltoids & Infraspinatus',
        sets: 3,
        reps: '12-15',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
        tip: 'Разводите руки по дуге в стороны, направляя мизинцы вверх.',
        tip_uz: 'Qo\'llarni yonga yoying, kichik barmoqlar yuqoriga qaragan bo\'lsin.',
        tip_en: 'Lead with elbows and pinkies pointing slightly up to isolate rear delts.',
        alternatives: [
          {
            name: 'Face Pull (Тяга каната к лицу на блоке)',
            name_uz: 'Yuzga arqon tortish (Face Pull)',
            name_en: 'Face Pull with External Rotation',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Королевское упражнение для здоровых плеч и идеальной осанки.'
          },
          {
            name: 'Разведение рук в тренажере Pec-Deck (обратная бабочка)',
            name_uz: 'Pec-Deck trenajyorida teskari kapalak',
            name_en: 'Reverse Pec-Deck Machine',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Чистейшая изоляция без читинга корпусом.'
          }
        ]
      },
      {
        id: 'ex_102_4',
        name: 'Подъем штанги на бицепс стоя',
        name_uz: 'Tik turib shtanga bilan bitseps bukish',
        name_en: 'Standing Barbell Bicep Curl',
        muscle_target: 'Двуглавая мышца плеча (бицепс)',
        muscle_target_uz: 'Bitseps mushaklari',
        muscle_target_en: 'Biceps Brachii',
        sets: 3,
        reps: '10-12',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
        tip: 'Локти зафиксированы у корпуса и не уходят вперед.',
        tip_uz: 'Tirsaklarni oldinga chiqarmang, tanaga mahkam tuting.',
        tip_en: 'Pin elbows to your sides. Squeeze at the top without swinging.',
        alternatives: [
          {
            name: 'Молотковые сгибания с гантелями (Hammer Curls)',
            name_uz: 'Bolg\'asimon gantel bukish',
            name_en: 'Dumbbell Hammer Curls',
            video_url: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
            tip: 'Развивает плечелучевую мышцу (брахиалис) и придает объем руке спереди.'
          },
          {
            name: 'Сгибания на скамье Скотта',
            name_uz: 'Skott skameykasida bitseps',
            name_en: 'Preacher Bench Bicep Curls',
            video_url: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
            tip: 'Исключает помощь мышц спины и ног.'
          }
        ]
      }
    ]
  },
  {
    id: 103,
    split_id: 'muscle_gain_male',
    day_number: 3,
    day_name: 'День 3: Legs & Core (Квадрицепс, Бицепс бедра, Пресс)',
    day_name_uz: '3-kun: Legs & Core (Oyoqlar, Dumba, Qorin)',
    day_name_en: 'Day 3: Legs & Core (Quads, Hamstrings, Abs)',
    target_goal: 'muscle_gain',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Мощный фундамент нижней части тела, масса ног и стальной кор',
    focus_uz: 'Oyoq mushaklari bazasi va mustahkam qorin matbuoti',
    focus_en: 'Lower body foundation, quad/hamstring mass, and rock-solid core stability',
    exercises: [
      {
        id: 'ex_103_1',
        name: 'Классические приседания со штангой на плечах',
        name_uz: 'Yelkada shtanga bilan klassik cho\'kish',
        name_en: 'Barbell Back Squat',
        muscle_target: 'Квадрицепсы, большие ягодичные, разгибатели спины',
        muscle_target_uz: 'Sonning oldi, dumba va orqa',
        muscle_target_en: 'Quadriceps, Glutes, Erector Spinae',
        sets: 4,
        reps: '8-10',
        rest_sec: 120,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/bEv6CCg2BC8',
        tip: 'Колени двигаются по направлению носков. Садитесь до параллели бедра полу с ровной спиной.',
        tip_uz: 'Tizzalarni oyoq uchlari tomon yo\'naltiring, orqani tekis tuting.',
        tip_en: 'Squat to parallel keeping chest high and knees tracking over toes.',
        alternatives: [
          {
            name: 'Жим ногами в тренажере под 45°',
            name_uz: '45° trenajyorda oyoq press',
            name_en: '45° Incline Leg Press',
            video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
            tip: 'Безопасная альтернатива при усталости или проблемах с поясницей.'
          },
          {
            name: 'Фронтальные приседания со штангой на груди',
            name_uz: 'Ko\'krakda shtanga bilan cho\'kish',
            name_en: 'Front Squats',
            video_url: 'https://www.youtube.com/embed/bEv6CCg2BC8',
            tip: 'Максимальный фокус на переднюю поверхность бедра (квадрицепс).'
          }
        ]
      },
      {
        id: 'ex_103_2',
        name: 'Румынская становая тяга с гантелями / штангой',
        name_uz: 'Rumincha tortish gantellar / shtanga bilan',
        name_en: 'Romanian Deadlift (RDL)',
        muscle_target: 'Бицепс бедра, полусухожильная мышца, ягодицы',
        muscle_target_uz: 'Sonning orqa qismi va dumba',
        muscle_target_en: 'Hamstrings, Gluteus Maximus & Spinal Erectors',
        sets: 4,
        reps: '10-12',
        rest_sec: 90,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
        tip: 'Отводите таз назад, колени лишь слегка согнуты. Гантели скользят вдоль ног.',
        tip_uz: 'Tozni orqaga torting, tizzalarni biroz buking.',
        tip_en: 'Hinge at the hips, keeping soft knees and dumbbell path glued to shins.',
        alternatives: [
          {
            name: 'Сгибания ног лежа в тренажере',
            name_uz: 'Yotib trenajyorda oyoq bukish',
            name_en: 'Lying Hamstring Leg Curls',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Изолированная проработка бицепса бедра.'
          },
          {
            name: 'Гиперэкстензия с акцентом на заднюю поверхность',
            name_uz: 'Giperekstenziya',
            name_en: 'Glute-Ham Hyperextension',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Скручивайте ягодицы в верхней точке.'
          }
        ]
      },
      {
        id: 'ex_103_3',
        name: 'Выпады назад с гантелями (на каждую ногу)',
        name_uz: 'Gantellar bilan orqaga qadam tashlash',
        name_en: 'Reverse Dumbbell Lunges',
        muscle_target: 'Квадрицепс, ягодичные мышцы, баланс',
        muscle_target_uz: 'Son va dumba mushaklari',
        muscle_target_en: 'Quadriceps, Glutes, Unilateral Balance',
        sets: 3,
        reps: '10-12 на ногу',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
        tip: 'Мягкий шаг назад, колено передней ноги не выходит за носок.',
        tip_uz: 'Orqaga sekin qadam tashlang, muvozanatni saqlang.',
        tip_en: 'Step back softly, maintaining 90-degree angles in both knees.',
        alternatives: [
          {
            name: 'Разгибания ног в тренажере сидя',
            name_uz: 'Trenajyorda oyoq yozish',
            name_en: 'Seated Leg Extensions',
            video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
            tip: 'Пиковый пампинг для квадрицепса.'
          }
        ]
      },
      {
        id: 'ex_103_4',
        name: 'Подъем ног в висе на перекладине / брусьях',
        name_uz: 'Turnikda oyoqlarni ko\'tarish',
        name_en: 'Hanging Leg / Knee Raises',
        muscle_target: 'Прямая мышца живота (низ пресса), кор',
        muscle_target_uz: 'Qorin matbuoti (pastki qism)',
        muscle_target_en: 'Rectus Abdominis & Deep Core',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/JB2oyawG9KI',
        tip: 'Подкручивайте таз наверх, не раскачивайтесь корпусом.',
        tip_uz: 'Gavdani tebratmasdan, tozni yuqoriga buking.',
        tip_en: 'Curl your pelvis upward to engage abs without swinging momentum.',
        alternatives: [
          {
            name: 'Скручивания на наклонной скамье',
            name_uz: 'Qiya skameykada qorin bukish',
            name_en: 'Decline Bench Crunches',
            video_url: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
            tip: 'Короткая жгучая амплитуда.'
          },
          {
            name: 'Планка на предплечьях с фиксацией 60 сек',
            name_uz: 'Tirsaklarda planka (60 soniya)',
            name_en: 'Forearm Plank (60s)',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Мощная статическая нагрузка на глубокие мышцы кора.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 2. MUSCLE GAIN / CURVES & GLUTES (FEMALE) - 3-DAY SPLIT
  // ==========================================
  {
    id: 151,
    split_id: 'muscle_gain_female',
    day_number: 1,
    day_name: 'День 1: Ягодицы & Бицепс бедра (Glute Hypertrophy)',
    day_name_uz: '1-kun: Dumba & Son orqasi (Glute Hypertrophy)',
    day_name_en: 'Day 1: Glutes & Hamstrings (Curves & Hypertrophy)',
    target_goal: 'muscle_gain',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Изолированная гипертрофия большой и средней ягодичных мышц без перегрузки бедер',
    focus_uz: 'Sonni kengaytirmasdan, dumba shakli va hajmini oshirish',
    focus_en: 'Targeted gluteus maximus & medius hypertrophy with minimal quad dominance',
    exercises: [
      {
        id: 'ex_151_1',
        name: 'Ягодичный мостик со штангой на скамье (Hip Thrust)',
        name_uz: 'Skameykada shtanga bilan dumba ko\'prigi (Hip Thrust)',
        name_en: 'Barbell Hip Thrust on Bench',
        muscle_target: 'Большая ягодичная мышца (пиковое сжатие)',
        muscle_target_uz: 'Katta dumba mushagi (maksimal siqish)',
        muscle_target_en: 'Gluteus Maximus (Peak Contraction)',
        sets: 4,
        reps: '10-12',
        rest_sec: 75,
        rpe: 8,
        tempo: '2-2-1-0',
        video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
        tip: 'Пауза 2 секунды в верхней точке с максимальным прожимом ягодиц. Подбородок прижат к груди, колени под углом 90°.',
        tip_uz: 'Yuqori nuqtada 2 soniya to\'xtang va dumbani qattiq siqing. Iyak ko\'krakka egilgan bo\'lsin.',
        tip_en: 'Pause 2s at the top squeezing glutes hard. Keep chin tucked and shins vertical.',
        alternatives: [
          {
            name: 'Ягодичный мостик в тренажере Смита',
            name_uz: 'Smit trenajyorida dumba ko\'prigi',
            name_en: 'Smith Machine Hip Thrust',
            video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
            tip: 'Фиксированная траектория для комфортной работы с повышенным весом.'
          },
          {
            name: 'Kas Glute Bridge с короткой амплитудой',
            name_uz: 'Kas Glute Bridge qisqa amplituda',
            name_en: 'Kas Glute Bridge',
            video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
            tip: 'Исключает работу квадрицепса, нагружая только ягодицы.'
          }
        ]
      },
      {
        id: 'ex_151_2',
        name: 'Болгарские сплит-приседания с гантелями (наклон 20°)',
        name_uz: 'Bolgarcha split-cho\'kish (gavdani 20° egib)',
        name_en: 'Bulgarian Split Squats (Glute-Bias Lean)',
        muscle_target: 'Большая и средняя ягодичные мышцы, бицепс бедра',
        muscle_target_uz: 'Dumba va son orqa mushaklari',
        muscle_target_en: 'Gluteus Maximus & Medius (Stretch Phase)',
        sets: 3,
        reps: '10-12 на ногу',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/2C-uNgKwPLE',
        tip: 'Наклоните корпус слегка вперед (под 20°), чтобы сместить всю нагрузку прямо в ягодицу опорной ноги.',
        tip_uz: 'Gavdani biroz oldinga eging (20°), butun yuklama tayanch dumbaga tushadi.',
        tip_en: 'Hinge torso forward 20° to direct tension completely into the working glute.',
        alternatives: [
          {
            name: 'Выпады назад с гантелями',
            name_uz: 'Gantellar bilan orqaga qadam cho\'kish',
            name_en: 'Reverse Deficit Lunges',
            video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
            tip: 'Мягкий шаг назад с акцентом на растяжение опорной ягодицы.'
          },
          {
            name: 'Зашагивания на высокую тумбу / скамью',
            name_uz: 'Tumbaga qadam tashlash',
            name_en: 'High Box Step-Ups',
            video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
            tip: 'Толчок выполняется строго пяткой стоящей ноги без отталкивания от пола.'
          }
        ]
      },
      {
        id: 'ex_151_3',
        name: 'Румынская становая тяга с гантелями',
        name_uz: 'Gantellar bilan rumincha tortish',
        name_en: 'Dumbbell Romanian Deadlift (RDL)',
        muscle_target: 'Бицепс бедра, нижний срез ягодичных мышц',
        muscle_target_uz: 'Son orqasi va dumba osti',
        muscle_target_en: 'Hamstrings & Glute-Ham Tie-In',
        sets: 4,
        reps: '10-12',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
        tip: 'Гантели скользят вплотную по ногам, таз отводится назад до натяжения задней поверхности бедра.',
        tip_uz: 'Gantellar oyoqqa yopishgan holda harakatlanadi, tozni orqaga torting.',
        tip_en: 'Push hips back until you feel deep hamstring stretch, keep dumbbells tight to legs.',
        alternatives: [
          {
            name: 'Сгибания ног в тренажере сидя',
            name_uz: 'O\'tirib trenajyorda oyoq bukish',
            name_en: 'Seated Leg Curls',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Безопасная изоляция без нагрузки на поясничный отдел.'
          },
          {
            name: 'Тяга на прямых ногах в кроссовере',
            name_uz: 'Krossoverda tortish',
            name_en: 'Cable Pull-Through',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Постоянный горизонтальный вектор натяжения троса.'
          }
        ]
      },
      {
        id: 'ex_151_4',
        name: 'Разведение ног в тренажере сидя (Abductor)',
        name_uz: 'Trenajyorda oyoqlarni yonga ochish (Abductor)',
        name_en: 'Seated Hip Abduction Machine',
        muscle_target: 'Средняя и малая ягодичные мышцы (верхняя округлость)',
        muscle_target_uz: 'O\'rta va kichik dumba (dumaloq shakl)',
        muscle_target_en: 'Gluteus Medius & Minimus (Upper Shelf)',
        sets: 4,
        reps: '15-20',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
        tip: 'Наклоните корпус немного вперед от спинки сиденья для максимального включения верхнего пучка ягодиц.',
        tip_uz: 'Gavdani o\'rindiqdan biroz oldinga eging, bu dumba yuqorisini faollashtiradi.',
        tip_en: 'Lean torso slightly forward from backrest to isolate upper glute shelf.',
        alternatives: [
          {
            name: 'Отведение ноги назад на нижнем блоке кроссовера',
            name_uz: 'Krossoverda oyoqni orqaga cho\'zish',
            name_en: 'Cable Glute Kickbacks',
            video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
            tip: 'Формирование четкой округлой формы и разделения ягодицы и бедра.'
          },
          {
            name: 'Ходьба в полуприседе с фитнес-резинкой (Monster Walk)',
            name_uz: 'Rezinka bilan yarim cho\'kishda yurish',
            name_en: 'Banded Monster Walk',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Непрерывное статическое напряжение и мощное жжение.'
          }
        ]
      }
    ]
  },
  {
    id: 152,
    split_id: 'muscle_gain_female',
    day_number: 2,
    day_name: 'День 2: Осанка, Спина & Изящные Руки (Upper Posture & Tone)',
    day_name_uz: '2-kun: Qomat, Orqa, Yelka & Qo\'llar (Upper Posture)',
    day_name_en: 'Day 2: Back, Shoulders & Toned Arms (Posture & Sculpt)',
    target_goal: 'muscle_gain',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Красивая женственная осанка, изящные плечи и подтянутые руки без перегрузки трапеций',
    focus_uz: 'Chiroyli qomat, ingichka bel, chiroyli yelkalar va tonusli qo\'llar',
    focus_en: 'Hourglass upper silhouette, royal posture, capped delts, and toned arms',
    exercises: [
      {
        id: 'ex_152_1',
        name: 'Тяга верхнего блока к груди средним хватом',
        name_uz: 'Yuqori blokni ko\'krakka tortish',
        name_en: 'Neutral/Wide Grip Lat Pulldown',
        muscle_target: 'Широчайшие мышцы, ромбовидные, осанка',
        muscle_target_uz: 'Orqa qanotlari va qomat',
        muscle_target_en: 'Latissimus Dorsi & Rhomboids (Posture V-Taper)',
        sets: 4,
        reps: '10-12',
        rest_sec: 60,
        rpe: 7,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
        tip: 'Тяните лопатки вниз и к позвоночнику. Расправьте плечи и грудную клетку.',
        tip_uz: 'Kuraklarni pastga torting, ko\'krak qafasini oching.',
        tip_en: 'Depress and retract scapulae, lead with chest up, creating visual hourglass taper.',
        alternatives: [
          {
            name: 'Тяга гантелей в наклоне с упором грудью на скамью',
            name_uz: 'Skameykaga suyanib gantel tortish',
            name_en: 'Chest-Supported Incline Dumbbell Row',
            video_url: 'https://www.youtube.com/embed/G8l_8chR5BE',
            tip: 'Идеальная фиксация спины и снятие нагрузки с поясницы.'
          },
          {
            name: 'Гравитрон (подтягивания с компенсацией)',
            name_uz: 'Gravitron trenajyorida tortilish',
            name_en: 'Assisted Pull-Up Machine',
            video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
            tip: 'Безопасное развитие силы мышц спины.'
          }
        ]
      },
      {
        id: 'ex_152_2',
        name: 'Жим гантелей сидя на скамье (плечи)',
        name_uz: 'O\'tirib gantel ko\'tarish (yelka press)',
        name_en: 'Seated Dumbbell Shoulder Press',
        muscle_target: 'Дельтовидные мышцы (плечи), верх груди',
        muscle_target_uz: 'Yelka deltalari',
        muscle_target_en: 'Deltoid Sculpt & Upper Torso',
        sets: 3,
        reps: '12',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/qEwKCR5JCog',
        tip: 'Подъем гантелей по плавной дуге вверх, локти слегка направлены вперед (угол 75°).',
        tip_uz: 'Gantellarni yoy bo\'ylab ko\'taring, tirsaklar biroz oldinda bo\'lsin.',
        tip_en: 'Press in a natural arc with elbows slightly angled in scapular plane.',
        alternatives: [
          {
            name: 'Махи гантелями в стороны стоя',
            name_uz: 'Gantellarni yonga ko\'tarish',
            name_en: 'Standing Dumbbell Lateral Raises',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Создает красивые аккуратные круглые плечи, сужая талию визуально.'
          }
        ]
      },
      {
        id: 'ex_152_3',
        name: 'Тяга горизонтального блока к поясу (узкий хват)',
        name_uz: 'Gorizontal blokni belga tortish',
        name_en: 'Seated Cable Row (Close Grip)',
        muscle_target: 'Середина спины, мышцы между лопаток',
        muscle_target_uz: 'Orqaning o\'rtasi va kuraklar',
        muscle_target_en: 'Mid-Back, Scapular Retractors',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 7,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/GZbfZ033f74',
        tip: 'Сводите лопатки вместе в конце амплитуды, не округляйте спину.',
        tip_uz: 'Oxirgi nuqtada kuraklarni birlashtiring, orqani bukmang.',
        tip_en: 'Squeeze shoulder blades together at completion without rounding spine.',
        alternatives: [
          {
            name: 'Тяга каната к лицу (Face Pull)',
            name_uz: 'Face Pull (arqonni yuzga tortish)',
            name_en: 'Face Pull for Posture',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Устраняет сутулость и укрепляет заднюю дельту.'
          }
        ]
      },
      {
        id: 'ex_152_4',
        name: 'Суперсет: Разгибания на трицепс + Сгибания на бицепс',
        name_uz: 'Superset: Triceps yozish + Bitseps bukish',
        name_en: 'Superset: Cable Tricep Pushdown + Dumbbell Curls',
        muscle_target: 'Трицепс и бицепс (тонус и рельеф рук без объема)',
        muscle_target_uz: 'Qo\'llar tonusi (triceps va bitseps)',
        muscle_target_en: 'Triceps & Biceps Tone without Bulk',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 7,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/2-LAMcpzODU',
        tip: 'Выполняйте подход на трицепс на блоке и сразу без паузы сгибания с легкими гантелями.',
        tip_uz: 'Triceps mashqidan so\'ng darhol tanaffussiz gantel bilan bitseps qiling.',
        tip_en: 'Perform tricep pushdown immediately followed by controlled dumbbell bicep curls.',
        alternatives: [
          {
            name: 'Отжимания от скамьи с согнутыми коленями',
            name_uz: 'Skameykadan orqaga press',
            name_en: 'Bench Dips with Bent Knees',
            video_url: 'https://www.youtube.com/embed/2z8JmcrW-As',
            tip: 'Подтягивает заднюю поверхность рук.'
          }
        ]
      }
    ]
  },
  {
    id: 153,
    split_id: 'muscle_gain_female',
    day_number: 3,
    day_name: 'День 3: Квадрицепс, Пресс & Кор (Legs & Abs Sculpt)',
    day_name_uz: '3-kun: Sonlar, Qorin & Kor (Legs & Abs Sculpt)',
    day_name_en: 'Day 3: Quads, Glutes & Deep Core Sculpt',
    target_goal: 'muscle_gain',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Тонус ног, плоский подтянутый живот и стабильный глубокий кор',
    focus_uz: 'Oyoqlar go\'zalligi, tekis qorin va mustahkam kor',
    focus_en: 'Leg tone, flat stomach, deep transverse abdominis activation and pelvic stability',
    exercises: [
      {
        id: 'ex_153_1',
        name: 'Кубковые приседания плие (Goblet Squats) с гантелью',
        name_uz: 'Gantel bilan plie cho\'kish (Goblet Squat)',
        name_en: 'Goblet Plie Squat with Dumbbell',
        muscle_target: 'Приводящие мышцы (внутренняя часть бедра), квадрицепс, ягодицы',
        muscle_target_uz: 'Sonning ichki qismi va dumba',
        muscle_target_en: 'Inner Thighs (Adductors), Quads & Glutes',
        sets: 4,
        reps: '12',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
        tip: 'Держите гантель вертикально перед грудью, колени разводите широко по направлению носков.',
        tip_uz: 'Gantelni ko\'krak oldida tuting, tizzalarni keng yoying.',
        tip_en: 'Hold dumbbell vertically at chest, spread knees wide in line with toes.',
        alternatives: [
          {
            name: 'Жим ногами с широкой высокой постановкой стоп',
            name_uz: 'Trenajyorda oyoq press keng holda',
            name_en: 'High & Wide Stance Leg Press',
            video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
            tip: 'Безопасная нагрузка на ноги без компрессии на позвоночник.'
          }
        ]
      },
      {
        id: 'ex_153_2',
        name: 'Гиперэкстензия с акцентом на ягодицы (45°)',
        name_uz: 'Dumba uchun 45° giperekstenziya',
        name_en: '45° Glute Hyperextension (Rounded Upper Back)',
        muscle_target: 'Ягодичные мышцы, бицепс бедра',
        muscle_target_uz: 'Dumba va son orqasi',
        muscle_target_en: 'Glute-Ham Complex with Lumbar Safety',
        sets: 3,
        reps: '12-15',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
        tip: 'Разверните носки наружу на 45°, округлите верх спины и поднимайтесь ТОЛЬКО за счет сжатия ягодиц.',
        tip_uz: 'Oyoq uchlarini 45° yonga buring, faqat dumba kuchi bilan ko\'tariling.',
        tip_en: 'Flare feet 45°, round thoracic spine, elevate torso solely by flexing glutes.',
        alternatives: [
          {
            name: 'Шагающие выпады по залу',
            name_uz: 'Qadamlab cho\'kish',
            name_en: 'Walking Dumbbell Lunges',
            video_url: 'https://www.youtube.com/embed/L8fvypPrzzs',
            tip: 'Динамичное движение, формирующее красивую линию бедра.'
          }
        ]
      },
      {
        id: 'ex_153_3',
        name: 'Подъем коленей на брусьях / в упоре (подкручивание таза)',
        name_uz: 'Tizzalarni ko\'tarish (tozni bukish bilan)',
        name_en: 'Captain\'s Chair Knee Raises with Posterior Pelvic Tilt',
        muscle_target: 'Прямая мышца живота (плоский живот), кор',
        muscle_target_uz: 'Qorin to\'g\'ri mushagi (tekis qorin)',
        muscle_target_en: 'Rectus Abdominis & Deep Transverse Core',
        sets: 3,
        reps: '15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/JB2oyawG9KI',
        tip: 'Подкручивайте таз наверх, выдыхая весь воздух из легких в верхней точке.',
        tip_uz: 'Tozni yuqoriga buking, yuqorida havoni butunlay chiqaring.',
        tip_en: 'Tuck pelvis upward into chest and exhale fully at top contraction.',
        alternatives: [
          {
            name: '«Мертвый жук» (Deadbug) на коврике',
            name_uz: '«O\'lik qo\'ng\'iz» (Deadbug) mashqi',
            name_en: 'Deadbug Core Activation',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Золотое упражнение для укрепления глубокой поперечной мышцы живота и сужения талии.'
          }
        ]
      },
      {
        id: 'ex_153_4',
        name: 'Боковая планка на локте + Классическая планка',
        name_uz: 'Yon planka + Klassik planka',
        name_en: 'Side Plank & Forearm Plank Combo',
        muscle_target: 'Глубокие мышцы кора, стабилизаторы талии',
        muscle_target_uz: 'Kor va bel stabilizatorlari',
        muscle_target_en: 'Internal Obliques & Deep Spinal Stabilizers',
        sets: 3,
        reps: '45 сек',
        rest_sec: 30,
        rpe: 7,
        tempo: 'Статика',
        video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
        tip: 'Ягодицы сжаты, живот подтянут к позвоночнику. Держите тело в идеальной прямой линии.',
        tip_uz: 'Qorinni ichga torting, gavdani to\'g\'ri chiziqda saqlang.',
        tip_en: 'Keep glutes tight and belly button pulled to spine without sagging hips.',
        alternatives: [
          {
            name: 'Планка с поочередным касанием плеч',
            name_uz: 'Yelkalarga qo\'l tekkizish plankasi',
            name_en: 'Plank Shoulder Taps',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Динамическая анти-ротационная нагрузка на пресс.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 3. WEIGHT LOSS / TONING (FEMALE) - 3-DAY SPLIT
  // ==========================================
  {
    id: 201,
    split_id: 'weight_loss_female',
    day_number: 1,
    day_name: 'День 1: Glutes, Legs & Core Burn (Ягодицы & Жиросжигание)',
    day_name_uz: '1-kun: Dumba, Oyoqlar & Yog\' yoqish',
    day_name_en: 'Day 1: Glutes, Lower Body & Metabolic Core Burn',
    target_goal: 'weight_loss',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Жиросжигающий комплекс с акцентом на крупные мышечные группы ягодиц и бедер',
    focus_uz: 'Dumba va oyoqlar orqali kaloriyalarni yuqori darajada yoqish',
    focus_en: 'High calorie expenditure circuit focused on glutes, hamstrings, and active core',
    exercises: [
      {
        id: 'ex_201_1',
        name: 'Ягодичный мостик с гантелью / штангой',
        name_uz: 'Gantel bilan dumba ko\'prigi',
        name_en: 'Dumbbell / Barbell Hip Thrust',
        muscle_target: 'Большая ягодичная мышца, кор',
        muscle_target_uz: 'Katta dumba mushagi',
        muscle_target_en: 'Glutes & Core',
        sets: 4,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
        tip: 'Пауза в верхней точке на 2 секунды с мощным сжатием ягодиц.',
        tip_uz: 'Yuqori nuqtada 2 soniya qotirib siqing.',
        tip_en: 'Squeeze glutes hard at the top with a 2-second pause.',
        alternatives: [
          {
            name: 'Румынская тяга с гантелями',
            name_uz: 'Gantelli rumincha tortish',
            name_en: 'Dumbbell RDL',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Отводите таз назад, спина строго прямая.'
          }
        ]
      },
      {
        id: 'ex_201_2',
        name: 'Болгарские сплит-приседания с легкими гантелями',
        name_uz: 'Bolgarcha split-cho\'kish',
        name_en: 'Bulgarian Split Squats',
        muscle_target: 'Ягодицы, бедра, баланс',
        muscle_target_uz: 'Dumba, son va muvozanat',
        muscle_target_en: 'Glutes, Quads & Balance',
        sets: 3,
        reps: '12 на ногу',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/2C-uNgKwPLE',
        tip: 'Корпус слегка наклонен вперед для акцента на ягодичную мышцу.',
        tip_uz: 'Gavdani biroz oldinga egib bajaring.',
        tip_en: 'Slight forward lean to activate glute stretch.',
        alternatives: [
          {
            name: 'Выпады назад с гантелями',
            name_uz: 'Orqaga qadam cho\'kish',
            name_en: 'Reverse Lunges',
            video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
            tip: 'Мягкий шаг назад, колено не бьется о пол.'
          }
        ]
      },
      {
        id: 'ex_201_3',
        name: 'Румынская становая тяга с гантелями',
        name_uz: 'Gantellar bilan rumincha tortish',
        name_en: 'Romanian Deadlift',
        muscle_target: 'Бицепс бедра, ягодичные',
        muscle_target_uz: 'Son orqasi va dumba',
        muscle_target_en: 'Hamstrings & Glutes',
        sets: 4,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
        tip: 'Плавное движение вниз за счет отведения таза назад.',
        tip_uz: 'Tozni orqaga tortib sekin tushing.',
        tip_en: 'Smooth descent powered by hip hinge.',
        alternatives: [
          {
            name: 'Сгибания ног в тренажере',
            name_uz: 'Trenajyorda oyoq bukish',
            name_en: 'Lying Leg Curls',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Изоляция бицепса бедра.'
          }
        ]
      },
      {
        id: 'ex_201_4',
        name: 'Динамическая планка с касанием плеч',
        name_uz: 'Dinamik planka',
        name_en: 'Dynamic Plank with Shoulder Taps',
        muscle_target: 'Прямая и косые мышцы пресса, кор',
        muscle_target_uz: 'Qorin matbuoti va kor',
        muscle_target_en: 'Abdominals & Core',
        sets: 3,
        reps: '45 сек',
        rest_sec: 30,
        rpe: 7,
        tempo: 'Динамика',
        video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
        tip: 'Держите тело в одной линии без раскачивания таза.',
        tip_uz: 'Gavdani tebratmasdan tekis tuting.',
        tip_en: 'Keep core braced without rotating hips.',
        alternatives: [
          {
            name: 'Классическая планка на локтях',
            name_uz: 'Klassik planka',
            name_en: 'Forearm Plank',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Статическое напряжение мышц живота.'
          }
        ]
      }
    ]
  },
  {
    id: 202,
    split_id: 'weight_loss_female',
    day_number: 2,
    day_name: 'День 2: Upper Body & Toning (Спина, Плечи, Осанка)',
    day_name_uz: '2-kun: Qomat, Orqa, Yelka & Qo\'llar (Toning)',
    day_name_en: 'Day 2: Upper Body Sculpt, Posture & Calorie Burn',
    target_goal: 'weight_loss',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Подтянутые руки, изящная осанка и высокий расход калорий',
    focus_uz: 'Qo\'llar tonusi, tik qomat va kaloriyalarni sarflash',
    focus_en: 'Toned arms, royal posture, narrow waist illusion and high caloric burn',
    exercises: [
      {
        id: 'ex_202_1',
        name: 'Тяга верхнего блока широким хватом к груди',
        name_uz: 'Keng ushlab yuqori blokni tortish',
        name_en: 'Lat Pulldown Wide Grip',
        muscle_target: 'Спина, широчайшие, осанка',
        muscle_target_uz: 'Orqa qanotlari va qomat',
        muscle_target_en: 'Back & Posture',
        sets: 4,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
        tip: 'Красивая осанка и раскрытие грудного отдела.',
        tip_uz: 'Ko\'krak qafasini oching, kuraklarni pastga torting.',
        tip_en: 'Open chest, drive scapulae downward for great posture.',
        alternatives: [
          {
            name: 'Тяга горизонтального блока к поясу',
            name_uz: 'Gorizontal blok tortish',
            name_en: 'Seated Cable Row',
            video_url: 'https://www.youtube.com/embed/GZbfZ033f74',
            tip: 'Сводите лопатки вместе в конце амплитуды.'
          }
        ]
      },
      {
        id: 'ex_202_2',
        name: 'Жим гантелей сидя на скамье',
        name_uz: 'O\'tirib gantel press',
        name_en: 'Dumbbell Shoulder Press',
        muscle_target: 'Плечи, дельтовидные мышцы',
        muscle_target_uz: 'Yelka deltalari',
        muscle_target_en: 'Deltoids & Shoulders',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/qEwKCR5JCog',
        tip: 'Укрепление плечевого пояса без перегрузки шеи.',
        tip_uz: 'Bo\'yinni zo\'riqtirmasdan yelkalarni ishlatish.',
        tip_en: 'Smooth overhead press without straining the neck.',
        alternatives: [
          {
            name: 'Махи гантелями через стороны',
            name_uz: 'Gantellarni yonga ko\'tarish',
            name_en: 'Lateral Raises',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Формирование округлости дельт.'
          }
        ]
      },
      {
        id: 'ex_202_3',
        name: 'Тяга горизонтального блока к поясу',
        name_uz: 'Gorizontal blokni belga tortish',
        name_en: 'Seated Cable Row',
        muscle_target: 'Мышцы спины, осанка',
        muscle_target_uz: 'Orqa mushaklari',
        muscle_target_en: 'Mid-Back & Rhomboids',
        sets: 3,
        reps: '15',
        rest_sec: 45,
        rpe: 7,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/GZbfZ033f74',
        tip: 'Сводите лопатки вместе в конце амплитуды.',
        tip_uz: 'Oxirgi nuqtada kuraklarni birlashtiring.',
        tip_en: 'Squeeze scapulae at the finish.',
        alternatives: [
          {
            name: 'Тяга гантели в наклоне',
            name_uz: 'Gantel tortish',
            name_en: 'One-Arm Dumbbell Row',
            video_url: 'https://www.youtube.com/embed/pYcpY20QaE8',
            tip: 'Глубокая проработка мышц спины.'
          }
        ]
      },
      {
        id: 'ex_202_4',
        name: 'Отжимания от возвышения / с колен',
        name_uz: 'Tizzada / tayanchda yotib press',
        name_en: 'Incline / Knee Push-ups',
        muscle_target: 'Грудные мышцы, трицепс, кор',
        muscle_target_uz: 'Ko\'krak, triceps va kor',
        muscle_target_en: 'Chest, Triceps & Core',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/IODxDxX7oi4',
        tip: 'Локти под углом 45 градусов к телу.',
        tip_uz: 'Tirsaklar tanaga nisbatan 45 gradusda bo\'lsin.',
        tip_en: 'Elbows at 45° angle to torso.',
        alternatives: [
          {
            name: 'Жим гантелей на наклонной скамье',
            name_uz: 'Qiya skameykada gantel press',
            name_en: 'Incline Dumbbell Press',
            video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
            tip: 'Укрепление мышц груди и рук.'
          }
        ]
      }
    ]
  },
  {
    id: 203,
    split_id: 'weight_loss_female',
    day_number: 3,
    day_name: 'День 3: HIIT & Full Body Burn (Фулбоди & Кардио)',
    day_name_uz: '3-kun: Butun tana & Kardiomashq (HIIT Burn)',
    day_name_en: 'Day 3: HIIT Full Body Conditioning & Calorie Burn',
    target_goal: 'weight_loss',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Максимальное сжигание калорий, ускорение метаболизма и тонус всего тела',
    focus_uz: 'Maksimal kaloriya yoqish, metabolizmni tezlashtirish va butun tana tonusi',
    focus_en: 'Maximal metabolic rate acceleration and full-body athletic sculpt',
    exercises: [
      {
        id: 'ex_203_1',
        name: 'Трастеры с гантелями (Присед + жим вверх)',
        name_uz: 'Gantellar bilan trasterlar (Cho\'kish + press)',
        name_en: 'Dumbbell Thrusters (Squat to Overhead Press)',
        muscle_target: 'Ноги, ягодицы, плечи, кардио-выносливость',
        muscle_target_uz: 'Oyoqlar, dumba, yelka va kardio',
        muscle_target_en: 'Quads, Glutes, Delts & High Heart Rate',
        sets: 4,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: 'Динамичный',
        video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
        tip: 'Слитное взрывное движение: вставая из приседа, сразу выжимайте гантели вверх.',
        tip_uz: 'Cho\'kishdan ko\'tarilayotganda darhol gantellarni yuqoriga bosing.',
        tip_en: 'Fluid explosive motion: power from legs pushes dumbbells overhead.',
        alternatives: [
          {
            name: 'Шагающие выпады с гантелями',
            name_uz: 'Qadamlab cho\'kish',
            name_en: 'Walking Lunges',
            video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
            tip: 'Высокий расход калорий.'
          }
        ]
      },
      {
        id: 'ex_203_2',
        name: 'Махи гирей / гантелью двумя руками (Kettlebell swings)',
        name_uz: 'Gira bilan siltanish (Kettlebell Swings)',
        name_en: 'Kettlebell / Dumbbell Swings',
        muscle_target: 'Задняя цепочка мышц, ягодицы, жиросжигание',
        muscle_target_uz: 'Dumba va orqa zanjir',
        muscle_target_en: 'Posterior Chain, Glutes & Conditioning',
        sets: 4,
        reps: '20',
        rest_sec: 45,
        rpe: 8,
        tempo: 'Взрывной',
        video_url: 'https://www.youtube.com/embed/sSESeQEqu28',
        tip: 'Взрывной толчок бедрами вперед, спина прямая. Руки лишь удерживают снаряд.',
        tip_uz: 'Tozni oldinga tez siltang, orqani to\'g\'ri tuting.',
        tip_en: 'Explosive hip snap driving weight forward, arms remain loose pendulums.',
        alternatives: [
          {
            name: 'Бёрпи без отжимания',
            name_uz: 'Byorpi mashqi',
            name_en: 'Burpees',
            video_url: 'https://www.youtube.com/embed/dZgVxmf6jkA',
            tip: 'Высокоинтенсивный прыжок.'
          }
        ]
      },
      {
        id: 'ex_203_3',
        name: 'Скручивания на пресс + «Велосипед» на коврике',
        name_uz: 'Qorin bukish + Velosiped',
        name_en: 'Ab Crunches & Bicycle Combo',
        muscle_target: 'Прямая и косые мышцы живота',
        muscle_target_uz: 'Qorin to\'g\'ri va qiya mushaklari',
        muscle_target_en: 'Rectus & Oblique Abdominals',
        sets: 3,
        reps: '20',
        rest_sec: 30,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
        tip: 'Поясница прижата к полу, выдох на каждом скручивании.',
        tip_uz: 'Bel polda yopishgan, har bukilishda nafas chiqaring.',
        tip_en: 'Lower back pressed to floor, full exhale on every crunch.',
        alternatives: [
          {
            name: 'Подъем коленей в упоре',
            name_uz: 'Tizzalarni ko\'tarish',
            name_en: 'Hanging Knee Raises',
            video_url: 'https://www.youtube.com/embed/JB2oyawG9KI',
            tip: 'Проработка низа живота.'
          }
        ]
      },
      {
        id: 'ex_203_4',
        name: 'Интервальное кардио (дорожка под наклоном 12% / эллипс)',
        name_uz: 'Interval kardiomashq (12% qiyalikdagi yo\'lak)',
        name_en: 'Incline Treadmill Interval Walk (12-3-30 Fat Burn)',
        muscle_target: 'Сердечно-сосудистая система, максимальное окисление жиров',
        muscle_target_uz: 'Yurak-qon tomir tizimi va yog\' yoqish',
        muscle_target_en: 'Cardiovascular Conditioning & Fat Oxidation',
        sets: 1,
        reps: '20 минут',
        rest_sec: 0,
        rpe: 7,
        tempo: 'Интервалы',
        video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
        tip: 'Ходьба под наклоном 10-12% со скоростью 4.5–5.5 км/ч. Не держитесь за поручни руками!',
        tip_uz: 'Qiyalikda 4.5-5.5 km/soat tezlikda yuring, tutqichlardan ushlamang!',
        tip_en: 'Walk at 10-12% incline at 5 km/h. Avoid gripping handrails for optimal burn.',
        alternatives: [
          {
            name: 'Эллиптический тренажер интервалами',
            name_uz: 'Ellips trenajyori',
            name_en: 'Elliptical Intervals',
            video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
            tip: 'Мягкая нагрузка на суставы.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 4. WEIGHT LOSS / CONDITIONING (MALE) - 3-DAY SPLIT
  // ==========================================
  {
    id: 301,
    split_id: 'weight_loss_male',
    day_number: 1,
    day_name: 'День 1: Full Body Strength & Conditioning',
    day_name_uz: '1-kun: Butun tana kuch & Kardio',
    day_name_en: 'Day 1: Full Body Strength & Conditioning',
    target_goal: 'weight_loss',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Комплексная работа крупных мышечных групп для максимального расхода энергии',
    focus_uz: 'Yuqori energiya sarfi uchun butun tana mushaklarini ishlash',
    focus_en: 'Compound multi-joint movements for maximal energy expenditure',
    exercises: [
      {
        id: 'ex_301_1',
        name: 'Приседания со штангой / кубковые приседания',
        name_uz: 'Cho\'kish shtanga / gantel bilan',
        name_en: 'Barbell / Goblet Squat',
        muscle_target: 'Квадрицепсы, ягодицы, кор',
        muscle_target_uz: 'Son, dumba va kor',
        muscle_target_en: 'Quads, Glutes & Core',
        sets: 4,
        reps: '12',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/bEv6CCg2BC8',
        tip: 'Слитный бодрый темп, глубокое дыхание.',
        tip_uz: 'Tez va sifatli sur\'atda bajaring.',
        tip_en: 'Crisp tempo, deep breathing, full depth.',
        alternatives: [
          {
            name: 'Жим ногами в тренажере',
            name_uz: 'Oyoq press',
            name_en: 'Leg Press',
            video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
            tip: 'Пампинг ног без нагрузки на позвоночник.'
          }
        ]
      },
      {
        id: 'ex_301_2',
        name: 'Жим штанги / гантелей лежа',
        name_uz: 'Yotib shtanga / gantel press',
        name_en: 'Bench Press',
        muscle_target: 'Грудные мышцы, передняя дельта, трицепс',
        muscle_target_uz: 'Ko\'krak va triceps',
        muscle_target_en: 'Chest, Delts & Triceps',
        sets: 4,
        reps: '10-12',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/rT7DgCr-3pg',
        tip: 'Мощный выжим вверх на выдохе.',
        tip_uz: 'Nafas chiqarishda kuchli itaring.',
        tip_en: 'Powerful press on exhalation.',
        alternatives: [
          {
            name: 'Отжимания на брусьях',
            name_uz: 'Brusda press',
            name_en: 'Dips',
            video_url: 'https://www.youtube.com/embed/2z8JmcrW-As',
            tip: 'Собственный вес тела.'
          }
        ]
      },
      {
        id: 'ex_301_3',
        name: 'Тяга верхнего блока к груди',
        name_uz: 'Yuqori blokni ko\'krakka tortish',
        name_en: 'Lat Pulldown',
        muscle_target: 'Широчайшие мышцы спины',
        muscle_target_uz: 'Orqa qanotlari',
        muscle_target_en: 'Lats & Back',
        sets: 4,
        reps: '12',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
        tip: 'Сводите лопатки, тяните к ключицам.',
        tip_uz: 'Kuraklarni birlashtiring.',
        tip_en: 'Retract scapulae to collarbone.',
        alternatives: [
          {
            name: 'Тяга гантели в наклоне',
            name_uz: 'Gantel tortish',
            name_en: 'Dumbbell Row',
            video_url: 'https://www.youtube.com/embed/pYcpY20QaE8',
            tip: 'Проработка каждой стороны.'
          }
        ]
      },
      {
        id: 'ex_301_4',
        name: 'Планка с подтягиванием коленей (Mountain Climbers)',
        name_uz: 'Plankada tizzalarni tortish (Mountain Climbers)',
        name_en: 'Mountain Climbers & Plank Combo',
        muscle_target: 'Пресс, кор, кардио',
        muscle_target_uz: 'Qorin va kardio',
        muscle_target_en: 'Abs, Core & Cardio',
        sets: 3,
        reps: '45 сек',
        rest_sec: 30,
        rpe: 8,
        tempo: 'Интенсив',
        video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
        tip: 'Частые смены ног в упоре лежа.',
        tip_uz: 'Tezkor oyoq almashtirish.',
        tip_en: 'Rapid alternating knee drives.',
        alternatives: [
          {
            name: 'Подъем коленей на брусьях',
            name_uz: 'Tizzalarni ko\'tarish',
            name_en: 'Knee Raises',
            video_url: 'https://www.youtube.com/embed/JB2oyawG9KI',
            tip: 'Пресс.'
          }
        ]
      }
    ]
  },
  {
    id: 302,
    split_id: 'weight_loss_male',
    day_number: 2,
    day_name: 'День 2: Upper / Lower Hyper-Fat Burn',
    day_name_uz: '2-kun: Upper / Lower Yog\' yoqish',
    day_name_en: 'Day 2: Upper / Lower Metabolic Split',
    target_goal: 'weight_loss',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Суперсеты и укороченный отдых для разгона жиросжигания',
    focus_uz: 'Tezkor yog\' yoqish uchun supersetlar va qisqa dam olish',
    focus_en: 'Supersets and short rest intervals for fat oxidation',
    exercises: [
      {
        id: 'ex_302_1',
        name: 'Румынская становая тяга со штангой',
        name_uz: 'Shtanga bilan rumincha tortish',
        name_en: 'Romanian Deadlift',
        muscle_target: 'Бицепс бедра, ягодицы, поясница',
        muscle_target_uz: 'Son orqasi va dumba',
        muscle_target_en: 'Hamstrings & Glutes',
        sets: 4,
        reps: '10-12',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
        tip: 'Спина прямая, таз назад.',
        tip_uz: 'Orqa to\'g\'ri, tozni orqaga torting.',
        tip_en: 'Hinge hips back with a flat back.',
        alternatives: [
          {
            name: 'Сгибания ног в тренажере',
            name_uz: 'Oyoq bukish',
            name_en: 'Leg Curls',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Изоляция.'
          }
        ]
      },
      {
        id: 'ex_302_2',
        name: 'Армейский жим гантелей сидя',
        name_uz: 'Gantel press o\'tirib',
        name_en: 'Dumbbell Shoulder Press',
        muscle_target: 'Плечи, трицепс',
        muscle_target_uz: 'Yelka deltalari',
        muscle_target_en: 'Deltoids & Triceps',
        sets: 3,
        reps: '12',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/qEwKCR5JCog',
        tip: 'Держите кор напряженным.',
        tip_uz: 'Korni qattiq ushlang.',
        tip_en: 'Brace core throughout.',
        alternatives: [
          {
            name: 'Махи в стороны',
            name_uz: 'Yonga ko\'tarish',
            name_en: 'Lateral Raises',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Плечи.'
          }
        ]
      },
      {
        id: 'ex_302_3',
        name: 'Тяга штанги в наклоне',
        name_uz: 'Egilib shtanga tortish',
        name_en: 'Bent-Over Row',
        muscle_target: 'Спина, ромбовидные',
        muscle_target_uz: 'Orqa mushaklari',
        muscle_target_en: 'Back & Rhomboids',
        sets: 4,
        reps: '10-12',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/G8l_8chR5BE',
        tip: 'Тяните к поясу.',
        tip_uz: 'Belga torting.',
        tip_en: 'Pull to navel.',
        alternatives: [
          {
            name: 'Горизонтальная тяга блока',
            name_uz: 'Gorizontal blok',
            name_en: 'Cable Row',
            video_url: 'https://www.youtube.com/embed/GZbfZ033f74',
            tip: 'Безопасно.'
          }
        ]
      },
      {
        id: 'ex_302_4',
        name: 'Скручивания на коврике + Планка',
        name_uz: 'Qorin bukish + Planka',
        name_en: 'Ab Crunches & Plank',
        muscle_target: 'Пресс, кор',
        muscle_target_uz: 'Qorin matbuoti',
        muscle_target_en: 'Abs & Core',
        sets: 3,
        reps: '20 + 45с',
        rest_sec: 30,
        rpe: 8,
        tempo: 'Динамика',
        video_url: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
        tip: 'Поясница прижата к полу.',
        tip_uz: 'Belni polga bosing.',
        tip_en: 'Keep lumbar flat on the mat.',
        alternatives: [
          {
            name: 'Подъем ног',
            name_uz: 'Oyoq ko\'tarish',
            name_en: 'Leg Raises',
            video_url: 'https://www.youtube.com/embed/JB2oyawG9KI',
            tip: 'Пресс.'
          }
        ]
      }
    ]
  },
  {
    id: 303,
    split_id: 'weight_loss_male',
    day_number: 3,
    day_name: 'День 3: High Intensity Conditioning (Интенсив & Кардио)',
    day_name_uz: '3-kun: Yuqori intensivlik & Kardio (HIIT)',
    day_name_en: 'Day 3: High Intensity Conditioning & Explosive Burn',
    target_goal: 'weight_loss',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Взрывная выносливость, канаты, гири и спринты',
    focus_uz: 'Portlovchi chidamlilik, giralar, arqonlar va sprint',
    focus_en: 'Explosive conditioning, kettlebell swings, battle ropes and sprint intervals',
    exercises: [
      {
        id: 'ex_303_1',
        name: 'Махи гирей двумя руками (Kettlebell Swings)',
        name_uz: 'Ikki qo\'l bilan gira siltash (Kettlebell Swings)',
        name_en: 'Two-Handed Kettlebell Swings',
        muscle_target: 'Задняя цепочка, ягодицы, кор',
        muscle_target_uz: 'Dumba, orqa va kor',
        muscle_target_en: 'Posterior Chain, Glutes & Core',
        sets: 4,
        reps: '20',
        rest_sec: 45,
        rpe: 8,
        tempo: 'Взрывной',
        video_url: 'https://www.youtube.com/embed/sSESeQEqu28',
        tip: 'Мощный толчок тазом вперед, руки прямые.',
        tip_uz: 'Tozni oldinga kuchli itaring.',
        tip_en: 'Explosive hip drive, straight arms.',
        alternatives: [
          {
            name: 'Трастеры с гантелями',
            name_uz: 'Trasterlar',
            name_en: 'Dumbbell Thrusters',
            video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
            tip: 'Присед + жим.'
          }
        ]
      },
      {
        id: 'ex_303_2',
        name: 'Трастеры с гантелями (Присед + жим вверх)',
        name_uz: 'Trasterlar (Cho\'kish + Press)',
        name_en: 'Dumbbell Thrusters',
        muscle_target: 'Ноги, плечи, кардио',
        muscle_target_uz: 'Oyoqlar va yelka',
        muscle_target_en: 'Legs, Shoulders & Cardio',
        sets: 3,
        reps: '15',
        rest_sec: 45,
        rpe: 8,
        tempo: 'Динамика',
        video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
        tip: 'Слитное мощное движение.',
        tip_uz: 'Bir tekis harakat.',
        tip_en: 'Fluid compound drive.',
        alternatives: [
          {
            name: 'Бёрпи',
            name_uz: 'Byorpi',
            name_en: 'Burpees',
            video_url: 'https://www.youtube.com/embed/dZgVxmf6jkA',
            tip: 'Прыжки.'
          }
        ]
      },
      {
        id: 'ex_303_3',
        name: 'Удары боевыми канатами (Battle Ropes) / Бёрпи',
        name_uz: 'Jangovar arqonlar (Battle Ropes) / Byorpi',
        name_en: 'Battle Ropes / Burpees',
        muscle_target: 'Плечи, руки, кор, дыхалка',
        muscle_target_uz: 'Yelka, qo\'llar va nafas tizimi',
        muscle_target_en: 'Shoulders, Arms, Core & Lungs',
        sets: 4,
        reps: '30 сек',
        rest_sec: 45,
        rpe: 9,
        tempo: 'Максимальный темп',
        video_url: 'https://www.youtube.com/embed/jZ3V_0BwY-M',
        tip: 'Ноги в полуприседе, частые мощные удары.',
        tip_uz: 'Yarim cho\'kib tez zarba bering.',
        tip_en: 'Semi-squat stance, high frequency wave slams.',
        alternatives: [
          {
            name: 'Бёрпи с прыжком',
            name_uz: 'Sakrash bilan byorpi',
            name_en: 'Burpees',
            video_url: 'https://www.youtube.com/embed/dZgVxmf6jkA',
            tip: 'Максимум калорий.'
          }
        ]
      },
      {
        id: 'ex_303_4',
        name: 'Интервальный спринт на дорожке (HIIT)',
        name_uz: 'Interval yugurish yo\'lakchada (HIIT)',
        name_en: 'Treadmill HIIT Sprint Intervals',
        muscle_target: 'Сердце, ноги, пиковое жиросжигание',
        muscle_target_uz: 'Yurak va oyoqlar',
        muscle_target_en: 'Cardio & Max Fat Oxidation',
        sets: 8,
        reps: '30с спринт / 30с шаг',
        rest_sec: 0,
        rpe: 9,
        tempo: 'Интервалы',
        video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
        tip: 'Максимальная скорость в спринте, глубокое дыхание во время шага.',
        tip_uz: 'Sprintda maksimal tezlik, qadamda chuqur nafas oling.',
        tip_en: 'Max speed during sprint bursts, deep breathing during walks.',
        alternatives: [
          {
            name: 'Велотренажер AirBike спринты',
            name_uz: 'AirBike velotrenajyor',
            name_en: 'AirBike Sprints',
            video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
            tip: 'Самый эффективный кардио-тренажер.'
          }
        ]
      }
    ]
  }
];

export const RANKS = {
  1: 'Новичок (Novice)',
  2: 'Атлет (Trainee)',
  3: 'Железный воин (Ironclad)',
  4: 'Ветеран зала (Veteran)',
  5: 'Титан (Titan)'
};

// Brzycki 1RM Formula
export function calculate1RM(weight, reps) {
  const w = parseFloat(weight) || 0;
  const r = parseInt(reps, 10) || 0;
  if (w <= 0 || r <= 0) return 0;
  if (r === 1) return Math.round(w);
  const oneRM = w * (36 / (37 - Math.min(36, r)));
  return Math.round(oneRM * 10) / 10;
}

export function calculateLevel(streakWeeks = 0) {
  let currentLvl = 1;
  if (streakWeeks >= 24) {
    currentLvl = 5;
  } else if (streakWeeks >= 13) {
    currentLvl = 4;
  } else if (streakWeeks >= 7) {
    currentLvl = 3;
  } else if (streakWeeks >= 3) {
    currentLvl = 2;
  } else {
    currentLvl = 1;
  }

  const milestones = {
    1: { min: 0, max: 3, next_req: 3, next_name: 'Атлет (Trainee)' },
    2: { min: 3, max: 7, next_req: 7, next_name: 'Железный воин (Ironclad)' },
    3: { min: 7, max: 13, next_req: 13, next_name: 'Ветеран зала (Veteran)' },
    4: { min: 13, max: 24, next_req: 24, next_name: 'Титан (Titan)' },
    5: { min: 24, max: 24, next_req: 24, next_name: 'Титан (Titan)' }
  };

  const curInfo = milestones[currentLvl];
  let progressPercent = 100;
  let weeksLeft = 0;
  let workoutsLeft = 0;
  let nextLevel = currentLvl;
  let nextRankName = curInfo.next_name;

  if (currentLvl >= 5) {
    progressPercent = 100;
    weeksLeft = 0;
    workoutsLeft = 0;
    nextLevel = 5;
  } else {
    const span = Math.max(1, curInfo.max - curInfo.min);
    const done = Math.max(0, streakWeeks - curInfo.min);
    progressPercent = Math.min(100, Math.floor((done / span) * 100));
    weeksLeft = Math.max(0, curInfo.next_req - streakWeeks);
    workoutsLeft = weeksLeft * 3; // 3 workouts per week
    nextLevel = currentLvl + 1;
  }

  const nextLevelData = LEVEL_PERKS.find(p => p.level === nextLevel) || LEVEL_PERKS[LEVEL_PERKS.length - 1];

  return {
    level: currentLvl,
    rank_name: RANKS[currentLvl] || 'Новичок (Novice)',
    streak_weeks: streakWeeks,
    progress_percent: progressPercent,
    weeks_left: weeksLeft,
    workouts_left: workoutsLeft,
    next_level: nextLevel,
    next_rank_name: nextRankName,
    next_perks: nextLevelData ? nextLevelData.perks : []
  };
}

export function findWorkouts(goal = 'muscle_gain', gender = 'male', level = 1, weekNum = 1) {
  let matched = WORKOUT_SPLITS.filter((w) => {
    const goalMatch = w.target_goal === goal || w.target_goal === 'any';
    const genderMatch = w.target_gender === gender || w.target_gender === 'any';
    return goalMatch && genderMatch;
  });

  if (matched.length === 0) {
    matched = WORKOUT_SPLITS.filter((w) => {
      return (w.target_goal === goal || w.target_goal === 'any') && (w.target_gender === gender || w.target_gender === 'any');
    });
  }

  if (matched.length === 0) {
    matched = WORKOUT_SPLITS.filter((w) => w.target_goal === goal);
  }

  if (matched.length === 0) {
    matched = WORKOUT_SPLITS.slice(0, 3);
  }

  const sorted = [...matched].sort((a, b) => (a.day_number || 1) - (b.day_number || 1));
  const weekInfo = PERIODIZATION_WEEKS[weekNum] || PERIODIZATION_WEEKS[1];

  return sorted.map((day) => ({
    ...day,
    week_info: weekInfo,
    exercises: (day.exercises || []).map((ex) => {
      let reps = ex.reps;
      let sets = ex.sets;
      let rpe = ex.rpe || 8;
      let tempo = ex.tempo || '2-0-1-0';

      if (weekNum === 1) {
        reps = '10-12';
        sets = Math.max(3, ex.sets - 1);
        rpe = 7;
        tempo = '3-0-1-0';
      } else if (weekNum === 2) {
        reps = '8-10';
        sets = ex.sets;
        rpe = 8;
        tempo = '2-1-1-0';
      } else if (weekNum === 3) {
        reps = '6-8';
        sets = ex.sets + 1;
        rpe = 9;
        tempo = '2-0-X-0';
      } else if (weekNum === 4) {
        reps = '12-15';
        sets = 3;
        rpe = 6;
        tempo = '2-0-2-0';
      }

      return {
        ...ex,
        reps,
        sets,
        rpe,
        tempo
      };
    })
  }));
}

// 5-Minute Joint and Mobility Warm-up Routine
export const WARMUP_EXERCISES = [
  {
    id: 'w1',
    name: 'Суставная гимнастика шеи, плеч и локтей',
    name_uz: 'Bo\'yin, yelka va tirsaklar bo\'g\'inlari gimnastikasi',
    name_en: 'Neck, Shoulders & Elbows Joint Mobility',
    duration: '60 сек',
    duration_uz: '60 soniya',
    duration_en: '60 sec',
    tip: 'Мягкие круговые вращения в суставах, подготовка синовиальной жидкости к нагрузке.',
    tip_uz: 'Bo\'g\'inlarni asta-sekin aylantirish, harakatga tayyorgarlik.',
    tip_en: 'Gentle circular joint rotations, lubricating synovial fluid.',
    video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg'
  },
  {
    id: 'w2',
    name: 'Разогрев ротаторов плеча и грудного отдела',
    name_uz: 'Yelka rotatorlari va ko\'krak qafasini qizdirish',
    name_en: 'Rotator Cuff & Thoracic Spine Activation',
    duration: '60 сек',
    duration_uz: '60 soniya',
    duration_en: '60 sec',
    tip: 'Вращения прямых рук, сведение-разведение лопаток без веса или с легкой резинкой.',
    tip_uz: 'To\'g\'ri qo\'llarni aylantirish, kuraklarni birlashtirish va yoyish.',
    tip_en: 'Arm circles and scapular retraction with light band.',
    video_url: 'https://www.youtube.com/embed/ttvfGg9d76c'
  },
  {
    id: 'w3',
    name: 'Мобильность тазобедренных суставов & приседы с весом тела',
    name_uz: 'Chanoq bo\'g\'inlari harakatchanligi & o\'z vaznida cho\'kish',
    name_en: 'Hip Mobility & Bodyweight Squats',
    duration: '90 сек',
    duration_uz: '90 soniya',
    duration_en: '90 sec',
    tip: '15 глубоких приседаний с фиксацией внизу для раскрытия таза и коленей.',
    tip_uz: '15 marta chuqur cho\'kish, tizzalarni qizdirish.',
    tip_en: '15 deep squats with 1s pause to open hips and warm knees.',
    video_url: 'https://www.youtube.com/embed/bEv6CCg2BC8'
  },
  {
    id: 'w4',
    name: 'Динамическая планка и активация кора',
    name_uz: 'Dinamik planka va qorin matbuoti faollashuvi',
    name_en: 'Dynamic Plank & Deep Core Activation',
    duration: '45 сек',
    duration_uz: '45 soniya',
    duration_en: '45 sec',
    tip: 'Планка на предплечьях с поочередным выпрямлением рук для включения пресса и стабилизаторов.',
    tip_uz: 'Qorin matbuoti va orqa stabilizatorlarini faollashtirish.',
    tip_en: 'Forearm plank with soft reach to activate core stabilizers.',
    video_url: 'https://www.youtube.com/embed/pvIjsG5Svck'
  },
  {
    id: 'w5',
    name: 'Легкий кардио-разогрев (дорожка / эллипс / прыжки)',
    name_uz: 'Yengil kardio qizish (yo\'lakcha / ellips / sakrash)',
    name_en: 'Light Cardio Warm-up (Treadmill / Elliptical)',
    duration: '2-3 мин',
    duration_uz: '2-3 daqiqa',
    duration_en: '2-3 min',
    tip: 'Пульс 110-125 уд/мин, разогрев мышц до легкого потоотделения.',
    tip_uz: 'Puls 110-125 urish/daq, mushaklarni harakatga keltirish.',
    tip_en: 'Target HR 110-125 bpm, warming muscle tissue for lifting.',
    video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU'
  }
];

// 4-Minute Stretching Cooldown Routine
export const COOLDOWN_EXERCISES = [
  {
    id: 'c1',
    name: 'Растяжка грудных мышц и передних дельт',
    name_uz: 'Ko\'krak va old yelka mushaklarini cho\'zish',
    name_en: 'Chest & Anterior Deltoid Stretch',
    duration: '45 сек',
    duration_uz: '45 soniya',
    duration_en: '45 sec',
    tip: 'Рука упирается в стойку/стену, плавный поворот корпуса в противоположную сторону.',
    tip_uz: 'Qo\'lni devorga tirab, gavdani teskari tomonga sekin buring.',
    tip_en: 'Place palm on post/wall, gently rotate torso away.'
  },
  {
    id: 'c2',
    name: 'Растяжка широчайших мышц спины',
    name_uz: 'Orqa qanot mushaklarini cho\'zish',
    name_en: 'Latissimus Dorsi Stretch',
    duration: '45 сек',
    duration_uz: '45 soniya',
    duration_en: '45 sec',
    tip: 'Хват за стойку тренажера двумя руками, отведение таза назад с расслаблением спины.',
    tip_uz: 'Ikki qo\'l bilan tirgakni ushlab, tozni orqaga torting.',
    tip_en: 'Grasp vertical post, push hips back relaxing back muscles.'
  },
  {
    id: 'c3',
    name: 'Растяжка квадрицепса и бицепса бедра',
    name_uz: 'Sonning oldi va orqa mushaklarini cho\'zish',
    name_en: 'Quad & Hamstring Stretch',
    duration: '60 сек',
    duration_uz: '60 soniya',
    duration_en: '60 sec',
    tip: 'Мягкое притягивание пятки к ягодице стоя, затем наклон к прямой ноге.',
    tip_uz: 'Oyoq tovonini dumbaga tortish, so\'ngra to\'g\'ri oyoqqa egilish.',
    tip_en: 'Pull heel to glute standing, then hinge down to straight leg.'
  },
  {
    id: 'c4',
    name: 'Глубокое диафрагмальное дыхание',
    name_uz: 'Chuqur diafragmal nafas olish',
    name_en: 'Deep Diaphragmatic Parasympathetic Breathing',
    duration: '60 сек',
    duration_uz: '60 soniya',
    duration_en: '60 sec',
    tip: 'Медленный вдох носом на 4 счета, задержка на 2 счета, выдох ртом на 6 счетов для снижения кортизола.',
    tip_uz: 'Burun bilan 4 soniya nafas oling, 2 soniya ushlab turing, og\'iz orqali 6 soniya chiqaring.',
    tip_en: 'Inhale 4s through nose, hold 2s, slow 6s mouth exhale to lower cortisol.'
  }
];

// Mifflin-St Jeor Daily Calories & Macronutrients Calculator
export function calculateNutrition(gender = 'male', age = 25, weight = 75, goal = 'muscle_gain') {
  const w = Number(weight) || 75;
  const a = Number(age) || 25;
  
  const h = gender === 'female' ? 165 : 178;
  const bmr = (10 * w) + (6.25 * h) - (5 * a) + (gender === 'female' ? -161 : 5);
  const tdee = Math.round(bmr * 1.45);
  
  let targetCalories = tdee;
  let proteinPerKg = 2.0;
  let fatPerKg = 1.0;
  
  if (goal === 'muscle_gain') {
    targetCalories = Math.round(tdee * 1.15); // +15% surplus
    proteinPerKg = 2.0;
    fatPerKg = 1.0;
  } else {
    targetCalories = Math.round(tdee * 0.82); // -18% deficit
    proteinPerKg = 2.2;
    fatPerKg = 0.9;
  }
  
  const proteinGrams = Math.round(w * proteinPerKg);
  const fatGrams = Math.round(w * fatPerKg);
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);
  
  const waterLiters = Math.round((w * 0.035) * 10) / 10;
  const waterGlasses = Math.max(6, Math.round((waterLiters * 1000) / 250));
  
  return {
    calories: targetCalories,
    protein: proteinGrams,
    fats: fatGrams,
    carbs: carbGrams,
    waterLiters,
    waterGlasses,
    bmr: Math.round(bmr),
    tdee
  };
}

// Web Audio API Sound Synthesizer for Gym Timer Beeps
let audioCtx = null;
export function playAudioBeep(type = 'countdown') {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'countdown') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'finish') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1046.5, now); // C6
      osc.frequency.setValueAtTime(1318.5, now + 0.1); // E6
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {
    // Silent fail
  }
}
