// workoutsData.js - Professional Periodized Workout Catalog, Level Perks, and 1RM Calculator

export const LEVEL_PERKS = [
  {
    level: 1,
    rank_name: 'Новичок (Novice)',
    streak_req: 0,
    weeks_span: '0–2 недели',
    color: 'emerald',
    icon: 'Shield',
    description: 'Освоение базовой техники движений и формирование привычки регулярно ходить в зал.',
    perks: [
      { name: 'Базовый 3-дневный сплит', desc: 'Сбалансированная программа на все тело', unlocked: true },
      { name: 'Таймер отдыха между подходами', desc: 'Автоматический таймер с виброоткликом', unlocked: true },
      { name: 'Видео техники упражнений', desc: 'Наглядная демонстрация правильной биомеханики', unlocked: true },
      { name: 'Трекер дней недели', desc: 'Отметки тренировок и учет недельной цели 3/3', unlocked: true }
    ]
  },
  {
    level: 2,
    rank_name: 'Атлет (Trainee)',
    streak_req: 3,
    weeks_span: '3–6 недель',
    color: 'cyan',
    icon: 'Zap',
    description: 'Переход на профессиональную прогрессивную перегрузку и гибкую настройку тренировок.',
    perks: [
      { name: '4-недельная периодизация', desc: 'Автоматическая смена фаз: Адаптация, Гипертрофия, Силовой пик, Делод', level_req: 2 },
      { name: '🔄 Умная замена упражнений', desc: 'Выбор профессиональных альтернатив от тренера на лету', level_req: 2 },
      { name: 'Календарь активности месяца', desc: 'Полная история посещений с тепловой картой тренировок', level_req: 2 },
      { name: 'Про-метрики: RPE и темп', desc: 'Контроль интенсивности и скорости эксцентрической фазы (3-0-1-0)', level_req: 2 }
    ]
  },
  {
    level: 3,
    rank_name: 'Железный воин (Ironclad)',
    streak_req: 7,
    weeks_span: '7–12 недель',
    color: 'purple',
    icon: 'Trophy',
    description: 'Работа с субмаксимальными весами, расчетом силовых нормативов и пампинг-протоколами.',
    perks: [
      { name: 'Калькулятор 1ПМ (1 Rep Max)', desc: 'Расчет предельного максимума и процентовок (70%, 80%, 90% 1RM)', level_req: 3 },
      { name: 'Дроп-сеты & Пампинг', desc: 'Специальные подходы на максимальный метаболический стресс', level_req: 3 },
      { name: 'Кастомный конструктор весов', desc: 'Фиксация рабочих весов и тоннажа за тренировку', level_req: 3 }
    ]
  },
  {
    level: 4,
    rank_name: 'Ветеран зала (Veteran)',
    streak_req: 13,
    weeks_span: '13–23 недели',
    color: 'amber',
    icon: 'Flame',
    description: 'Элитный уровень тренировочного объема, сплиты Золотой Эры и высокоинтенсивные протоколы.',
    perks: [
      { name: 'Pro-Сплиты (Arnold Era & Powerbuilding)', desc: 'Легендарные программы: Грудь/Спина, Плечи/Руки, Тяжелая база', level_req: 4 },
      { name: 'Таймер высокой плотности (HIIT/Tabata)', desc: 'Интервальный таймер 20/10 и 30/15 для взрывной выносливости', level_req: 4 },
      { name: 'Золотой статус профиля', desc: 'Премиум бейдж ветерана зала и подсветка в мини-аппе', level_req: 4 }
    ]
  },
  {
    level: 5,
    rank_name: 'Титан (Titan)',
    streak_req: 24,
    weeks_span: '24+ недели',
    color: 'yellow',
    icon: 'Award',
    description: 'Максимальный ранг мастерства. Полный контроль авторегуляции и вечный статус в Зале Славы.',
    perks: [
      { name: 'Зал Славы Атлетов (Hall of Fame)', desc: 'Вечная запись в рейтинге лучших атлетов', level_req: 5 },
      { name: 'RPE-Matrix Авторегуляция', desc: 'Алгоритм динамической корректировки весов по уровню усталости', level_req: 5 },
      { name: 'Неоновая тема Титана', desc: 'Эксклюзивный золотисто-голографический интерфейс', level_req: 5 }
    ]
  }
];

export const PERIODIZATION_WEEKS = {
  1: {
    week: 1,
    title: 'Неделя 1: Техника & Адаптация',
    tag: 'Адаптация',
    badge_bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Отработка нейромышечной связи, контролируемый темп 3-0-1-0, средний рабочий вес.',
    reps_mod: '10-12',
    sets_mod: 3,
    rpe: 'RPE 7 (запас 3 повт)',
    tempo: '3-0-1-0 (3с опускание)'
  },
  2: {
    week: 2,
    title: 'Неделя 2: Объемная Гипертрофия',
    tag: 'Гипертрофия',
    badge_bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    description: 'Увеличение объема, пампинг, укороченный отдых между сетами для максимального роста.',
    reps_mod: '8-10',
    sets_mod: 4,
    rpe: 'RPE 8 (запас 2 повт)',
    tempo: '2-1-1-0 (с фиксацией)'
  },
  3: {
    week: 3,
    title: 'Неделя 3: Силовой Пик & Интенсив',
    tag: 'Силовой пик',
    badge_bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    description: 'Тяжелые рабочие веса, максимальное рекрутирование волокон, акцент на базовую силу.',
    reps_mod: '6-8',
    sets_mod: 4,
    rpe: 'RPE 9 (запас 1 повт)',
    tempo: '2-0-X-0 (взрывной подъем)'
  },
  4: {
    week: 4,
    title: 'Неделя 4: Делод & Суперкомпенсация',
    tag: 'Делод & Восстановление',
    badge_bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'Снижение нагрузки, разгрузка суставов и ЦНС, подготовка к новому рекордному циклу.',
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
    target_goal: 'muscle_gain',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Развитие грудных мышц, переднего пучка дельт и латеральной головки трицепса',
    exercises: [
      {
        id: 'ex_101_1',
        name: 'Жим штанги лежа на горизонтальной скамье',
        muscle_target: 'Большая грудная (средний/нижний отдел), трицепс',
        sets: 4,
        reps: '8-10',
        rest_sec: 90,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/rT7DgCr-3pg',
        tip: 'Лопатки сведены и прижаты к скамье, ноги жестко упираются в пол, опускание на нижний срез груди.',
        alternatives: [
          {
            name: 'Жим тяжелых гантелей лежа',
            video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
            tip: 'Позволяет увеличить глубину растяжения грудных и снизить нагрузку на плечевые суставы.'
          },
          {
            name: 'Жим в тренажере Hammer Strength / Смит',
            video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
            tip: 'Идеально для безопасной работы до отказа без страхующего партнера.'
          }
        ]
      },
      {
        id: 'ex_101_2',
        name: 'Жим гантелей на наклонной скамье (30°)',
        muscle_target: 'Ключичная (верхняя) порция грудных мышц, передняя дельта',
        sets: 4,
        reps: '10-12',
        rest_sec: 75,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
        tip: 'Угол не более 30 градусов, чтобы нагрузка не уходила полностью в плечи. Плавная пауза внизу.',
        alternatives: [
          {
            name: 'Жим штанги на наклонной скамье',
            video_url: 'https://www.youtube.com/embed/rT7DgCr-3pg',
            tip: 'Классическая база для мощного верха груди.'
          },
          {
            name: 'Сведение рук в кроссовере снизу-вверх',
            video_url: 'https://www.youtube.com/embed/2-LAMcpzODU',
            tip: 'Пиковое сокращение в верхней точке с акцентом на воротничковую зону груди.'
          }
        ]
      },
      {
        id: 'ex_101_3',
        name: 'Армейский жим стоя / сидя с гантелями',
        muscle_target: 'Передняя и средняя дельты, трапеция',
        sets: 3,
        reps: '10-12',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/2yjwXTZQDDI',
        tip: 'Пресс напряжен, ягодицы сжаты. Не прогибайтесь в пояснице во время выжимания веса.',
        alternatives: [
          {
            name: 'Жим штанги с груди стоя (Overhead Press)',
            video_url: 'https://www.youtube.com/embed/2yjwXTZQDDI',
            tip: 'Главное базовое движение для силы плечевого пояса и кора.'
          },
          {
            name: 'Махи гантелями через стороны стоя',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Изолированное расширение средней дельты для визуальной ширины плеч.'
          }
        ]
      },
      {
        id: 'ex_101_4',
        name: 'Разгибания на трицепс на блоке с канатной рукоятью',
        muscle_target: 'Латеральная и медиальная головки трицепса',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 7,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/2-LAMcpzODU',
        tip: 'Локти прижаты к бокам и неподвижны. В нижней точке разводите кисти в стороны.',
        alternatives: [
          {
            name: 'Французский жим с EZ-штангой лежа',
            video_url: 'https://www.youtube.com/embed/2-LAMcpzODU',
            tip: 'Мощное растяжение длинной головки трицепса.'
          },
          {
            name: 'Отжимания на брусьях с акцентом на трицепс',
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
    target_goal: 'muscle_gain',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'V-образная ширина спины, толщина широчайших и пик бицепса',
    exercises: [
      {
        id: 'ex_102_1',
        name: 'Тяга верхнего блока к груди широким хватом',
        muscle_target: 'Широчайшие мышцы спины, большая круглая',
        sets: 4,
        reps: '10-12',
        rest_sec: 75,
        rpe: 8,
        tempo: '3-0-1-1',
        video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
        tip: 'Тяните локти вниз и назад, раскрывая грудь навстречу рукояти. Не отклоняйтесь назад сильнее 15°.',
        alternatives: [
          {
            name: 'Подтягивания широким хватом',
            video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
            tip: 'Золотой стандарт для развития мощной V-образной спины.'
          },
          {
            name: 'Тяга верхнего блока параллельным хватом',
            video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
            tip: 'Увеличенная амплитуда растяжения нижнего отдела широчайших.'
          }
        ]
      },
      {
        id: 'ex_102_2',
        name: 'Тяга штанги в наклоне к поясу',
        muscle_target: 'Толщина широчайших, ромбовидные, трапеция',
        sets: 4,
        reps: '8-10',
        rest_sec: 90,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/G8l_8chR5BE',
        tip: 'Спина ровная под углом 45-60°, ведите гриф строго вдоль бедер к низу живота.',
        alternatives: [
          {
            name: 'Тяга гантели одной рукой в упоре на скамью',
            video_url: 'https://www.youtube.com/embed/pYcpY20QaE8',
            tip: 'Устраняет асимметрию и снимает лишнюю компрессию с поясницы.'
          },
          {
            name: 'Тяга Т-грифа с упором в грудь',
            video_url: 'https://www.youtube.com/embed/G8l_8chR5BE',
            tip: 'Полная изоляция спины без нагрузки на позвоночный столб.'
          }
        ]
      },
      {
        id: 'ex_102_3',
        name: 'Махи гантелями в наклоне (задняя дельта)',
        muscle_target: 'Задний пучок дельтовидных, подостная мышца',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
        tip: 'Локти направлены вверх и в стороны, движение без рывков корпусом.',
        alternatives: [
          {
            name: 'Face Pull (Тяга каната к лицу на блоке)',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Идеально для здоровья плечевого сустава и красивой 3D-формы дельт.'
          },
          {
            name: 'Разведение рук в тренажере Pec-Deck (обратная бабочка)',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Стабильная траектория с акцентом на пиковое сокращение.'
          }
        ]
      },
      {
        id: 'ex_102_4',
        name: 'Подъем штанги на бицепс стоя',
        muscle_target: 'Двуглавая мышца плеча (бицепс), брахиалис',
        sets: 3,
        reps: '10-12',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
        tip: 'Локти зафиксированы возле корпуса, без раскачки поясницы (читинга).',
        alternatives: [
          {
            name: 'Молотковые сгибания с гантелями (Hammer Curls)',
            video_url: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
            tip: 'Акцент на брахиалис, который выталкивает бицепс наружу и делает руку массивнее.'
          },
          {
            name: 'Сгибания на скамье Скотта',
            video_url: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
            tip: 'Исключает помощь корпуса и изолирует нижнюю часть бицепса.'
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
    target_goal: 'muscle_gain',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Базовая сила нижней части тела, объём бедер и стабилизация кора',
    exercises: [
      {
        id: 'ex_103_1',
        name: 'Классические приседания со штангой на плечах',
        muscle_target: 'Квадрицепсы, ягодичные мышцы, приводящие',
        sets: 4,
        reps: '8-10',
        rest_sec: 120,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/bEv6CCg2BC8',
        tip: 'Колени смотрят строго по направлению носков, глубина седа до параллели бедра с полом.',
        alternatives: [
          {
            name: 'Жим ногами в тренажере под 45°',
            video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
            tip: 'Безопасная альтернатива при усталости спины для работы с максимальным весом.'
          },
          {
            name: 'Гакк-приседания в тренажере',
            video_url: 'https://www.youtube.com/embed/bEv6CCg2BC8',
            tip: 'Прицельная изоляция внешней головки квадрицепса («капли»).'
          }
        ]
      },
      {
        id: 'ex_103_2',
        name: 'Румынская становая тяга со штангой / гантелями',
        muscle_target: 'Бицепс бедра, полусухожильная мышца, ягодицы',
        sets: 4,
        reps: '10-12',
        rest_sec: 90,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
        tip: 'Отводите таз назад, колени слегка согнуты и зафиксированы, чувствуйте мощное натяжение задней поверхности.',
        alternatives: [
          {
            name: 'Сгибания ног лежа в тренажере',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Изоляция бицепса бедра в анатомически естественной траектории.'
          },
          {
            name: 'Гиперэкстензия с акцентом на ягодицы и бицепс бедра',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Округлите верх спины, движение выполняется только за счет сгибания в тазобедренном суставе.'
          }
        ]
      },
      {
        id: 'ex_103_3',
        name: 'Жим ногами в тренажере с широкой постановкой',
        muscle_target: 'Квадрицепсы, приводящие мышцы бедра',
        sets: 3,
        reps: '12-15',
        rest_sec: 75,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
        tip: 'Не выпрямляйте колени полностью до «щелчка» в верхней точке, держите мышцы под нагрузкой.',
        alternatives: [
          {
            name: 'Болгарские сплит-приседания',
            video_url: 'https://www.youtube.com/embed/2C-uNgKwPLE',
            tip: 'Глубокая проработка баланса и гипертрофии каждой ноги отдельно.'
          },
          {
            name: 'Разгибания ног сидя в тренажере',
            video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
            tip: 'Идеальный финальный пампинг для рельефа передней поверхности бедра.'
          }
        ]
      },
      {
        id: 'ex_103_4',
        name: 'Подъем ног в висе на перекладине / брусьях',
        muscle_target: 'Прямая мышца живота (нижний отдел), мышцы кора',
        sets: 3,
        reps: '15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/JB2oyawG9KI',
        tip: 'Подкручивайте таз к груди на выдохе, не используйте раскачку тела.',
        alternatives: [
          {
            name: 'Скручивания на наклонной скамье с весом',
            video_url: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
            tip: 'Прогрессивная перегрузка кубиков пресса с гантелью или блином.'
          },
          {
            name: 'Планка с динамическим переходом на ладони',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Мощное укрепление глубоких поперечных мышц живота.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 2. MUSCLE GAIN / TONING (FEMALE) - 3-DAY SPLIT
  // ==========================================
  {
    id: 151,
    split_id: 'muscle_gain_female',
    day_number: 1,
    day_name: 'День 1: Ягодицы & Бицепс бедра (Glute Hypertrophy)',
    target_goal: 'muscle_gain',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Максимальная гипертрофия большой и средней ягодичной мышцы без перегрузки бедер',
    exercises: [
      {
        id: 'ex_151_1',
        name: 'Ягодичный мостик со штангой на скамье (Hip Thrust)',
        muscle_target: 'Большая ягодичная мышца (пиковое сокращение)',
        sets: 4,
        reps: '10-12',
        rest_sec: 75,
        rpe: 8,
        tempo: '2-2-1-0',
        video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
        tip: 'Пауза 2 секунды в верхней точке с максимальным прожимом ягодиц. Подбородок прижат к груди.',
        alternatives: [
          {
            name: 'Ягодичный мостик в тренажере Смита',
            video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
            tip: 'Фиксированная траектория для работы с повышенным рабочим весом.'
          },
          {
            name: 'Ягодичный мостик на одной ноге с гантелью',
            video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
            tip: 'Высокая интенсивность без необходимости надевать тяжелую штангу.'
          }
        ]
      },
      {
        id: 'ex_151_2',
        name: 'Болгарские сплит-приседания с гантелями',
        muscle_target: 'Большая и средняя ягодичные мышцы, бицепс бедра',
        sets: 3,
        reps: '10-12 на ногу',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/2C-uNgKwPLE',
        tip: 'Наклоните корпус слегка вперед (под 20°), чтобы сместить всю нагрузку с колена прямо в ягодицу.',
        alternatives: [
          {
            name: 'Выпады назад с гантелями или со штангой',
            video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
            tip: 'Мягкий шаг назад с акцентом на растяжение опорной ягодицы.'
          },
          {
            name: 'Зашагивания на высокую тумбу/скамью',
            video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
            tip: 'Толчок выполняется строго пяткой стоящей ноги без отталкивания пола.'
          }
        ]
      },
      {
        id: 'ex_151_3',
        name: 'Румынская тяга с гантелями',
        muscle_target: 'Бицепс бедра, нижний срез ягодичных мышц',
        sets: 4,
        reps: '12',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
        tip: 'Гантели скользят вплотную по ногам, таз отводится назад до ощущения натяжения задней поверхности.',
        alternatives: [
          {
            name: 'Тяга на прямых ногах в кроссовере',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Постоянный горизонтальный вектор натяжения троса кроссовера.'
          },
          {
            name: 'Сгибания ног в тренажере сидя',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Комфортная изоляция без осевой нагрузки на позвоночник.'
          }
        ]
      },
      {
        id: 'ex_151_4',
        name: 'Разведение ног в тренажере сидя (Abductor)',
        muscle_target: 'Средняя и малая ягодичные мышцы (верхний объем)',
        sets: 3,
        reps: '15-20',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
        tip: 'Наклоните корпус немного вперед от спинки сиденья для максимального включения верхнего пучка ягодиц.',
        alternatives: [
          {
            name: 'Отведение ноги назад на нижнем блоке кроссовера',
            video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
            tip: 'Формирование четкой округлой формы и разделения ягодицы и бедра.'
          },
          {
            name: 'Ходьба в полуприседе с фитнес-резинкой (Monster Walk)',
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
    day_name: 'День 2: Спина, Плечи & Руки (Upper Tone & Posture)',
    target_goal: 'muscle_gain',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Красивая женственная осанка, подтянутые руки и изящные плечи',
    exercises: [
      {
        id: 'ex_152_1',
        name: 'Тяга верхнего блока к груди',
        muscle_target: 'Широчайшие мышцы, ромбовидные, осанка',
        sets: 4,
        reps: '10-12',
        rest_sec: 60,
        rpe: 7,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
        tip: 'Тяните лопатки вниз и к позвоночнику. Расправьте плечи и грудную клетку.',
        alternatives: [
          {
            name: 'Гравитрон (подтягивания с компенсацией веса)',
            video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
            tip: 'Помогает легко освоить правильную механику подтягиваний.'
          },
          {
            name: 'Тяга гантелей в наклоне с упором грудью на скамью',
            video_url: 'https://www.youtube.com/embed/G8l_8chR5BE',
            tip: 'Идеальная фиксация спины и снятие нагрузки с поясницы.'
          }
        ]
      },
      {
        id: 'ex_152_2',
        name: 'Жим гантелей сидя на наклонной скамье',
        muscle_target: 'Дельтовидные мышцы (плечи), верх груди',
        sets: 3,
        reps: '12',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/qEwKCR5JCog',
        tip: 'Подъем гантелей по плавной дуге вверх, локти слегка направлены вперед.',
        alternatives: [
          {
            name: 'Махи гантелями в стороны стоя',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Создает красивые аккуратные круглые плечи.'
          },
          {
            name: 'Жим в тренажере для плеч',
            video_url: 'https://www.youtube.com/embed/qEwKCR5JCog',
            tip: 'Безопасная нагрузка без необходимости балансировать гантели.'
          }
        ]
      },
      {
        id: 'ex_152_3',
        name: 'Тяга горизонтального блока к поясу (узкий хват)',
        muscle_target: 'Середина спины, мышцы между лопаток',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 7,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/GZbfZ033f74',
        tip: 'Сводите лопатки вместе в конце амплитуды, не округляйте спину.',
        alternatives: [
          {
            name: 'Тяга одной гантели в наклоне',
            video_url: 'https://www.youtube.com/embed/pYcpY20QaE8',
            tip: 'Увеличенная глубина движения и проработка каждой стороны.'
          },
          {
            name: 'Тяга каната к лицу (Face Pull)',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Устраняет сутулость и укрепляет заднюю дельту.'
          }
        ]
      },
      {
        id: 'ex_152_4',
        name: 'Суперсет: Сгибания на бицепс + Разгибания на трицепс',
        muscle_target: 'Бицепс и трицепс (тонус рук)',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 7,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
        tip: 'Выполняйте подход на бицепс и сразу без паузы разгибания на трицепс на блоке.',
        alternatives: [
          {
            name: 'Отжимания от скамьи с согнутыми коленями',
            video_url: 'https://www.youtube.com/embed/2z8JmcrW-As',
            tip: 'Подтягивает заднюю поверхность плеча.'
          },
          {
            name: 'Французский жим с гантелью из-за головы двумя руками',
            video_url: 'https://www.youtube.com/embed/2-LAMcpzODU',
            tip: 'Глубокое растяжение длинной головки трицепса.'
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
    target_goal: 'muscle_gain',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Тонус ног, плоский подтянутый живот и стабильный кор',
    exercises: [
      {
        id: 'ex_153_1',
        name: 'Кубковые приседания (Goblet Squats) с гантелью',
        muscle_target: 'Квадрицепсы, приводящие мышцы, ягодицы',
        sets: 4,
        reps: '12',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-1-1-0',
        video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
        tip: 'Держите гантель вертикально перед грудью, локти опускаются между коленями.',
        alternatives: [
          {
            name: 'Приседания плие с широкой постановкой ног',
            video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
            tip: 'Акцент на внутреннюю поверхность бедра и ягодичную зону.'
          },
          {
            name: 'Жим ногами с высокой постановкой стоп',
            video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
            tip: 'Комфортная нагрузка на ноги без нагрузки на поясничный отдел.'
          }
        ]
      },
      {
        id: 'ex_153_2',
        name: 'Жим ногами в тренажере',
        muscle_target: 'Передняя и задняя поверхность бедра',
        sets: 3,
        reps: '12-15',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
        tip: 'Плавное опускание платформы, колени направлены на носки.',
        alternatives: [
          {
            name: 'Шагающие выпады по залу',
            video_url: 'https://www.youtube.com/embed/L8fvypPrzzs',
            tip: 'Динамичное движение, развивающее координацию и сжигающее калории.'
          },
          {
            name: 'Разгибания ног в тренажере сидя',
            video_url: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
            tip: 'Легкий изолирующий пампинг квадрицепса.'
          }
        ]
      },
      {
        id: 'ex_153_3',
        name: 'Подъем коленей на брусьях / тренажере',
        muscle_target: 'Прямая мышца живота, косые мышцы',
        sets: 3,
        reps: '15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/JB2oyawG9KI',
        tip: 'Подкручивайте таз наверх, выдыхая весь воздух из легких в верхней точке.',
        alternatives: [
          {
            name: 'Скручивания на коврике с поднятыми ногами',
            video_url: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
            tip: 'Поясница плотно прижата к коврику, короткая жгучая амплитуда.'
          },
          {
            name: '«Мертвый жук» (Deadbug)',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Золотое упражнение для укрепления глубокого поперечного пресса.'
          }
        ]
      },
      {
        id: 'ex_153_4',
        name: 'Планка на предплечьях',
        muscle_target: 'Глубокие мышцы кора, стабилизаторы позвоночника',
        sets: 3,
        reps: '45-60 сек',
        rest_sec: 30,
        rpe: 7,
        tempo: 'Статика',
        video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
        tip: 'Ягодицы сжаты, пупок подтянут к позвоночнику. Не провисайте в пояснице.',
        alternatives: [
          {
            name: 'Боковая планка на локте',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Укрепляет боковые стабилизаторы и формирует узкую талию.'
          },
          {
            name: 'Планка с поочередным касанием плеч ладонью',
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
    day_name: 'День 1: Glutes & Core (Ягодицы, Задняя поверхность, Кор)',
    target_goal: 'weight_loss',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Жиросжигающий комплекс с акцентом на крупные мышечные группы ног и ягодиц',
    exercises: [
      {
        id: 'ex_201_1',
        name: 'Ягодичный мостик со штангой / гантелью',
        muscle_target: 'Большая ягодичная мышца, кор',
        sets: 4,
        reps: '12-15',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/SEdqd1n0cvg',
        tip: 'Пауза в верхней точке на 2 секунды с мощным сжатием ягодиц.',
        alternatives: [
          {
            name: 'Румынская тяга с гантелями',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Отводите таз назад, спина строго прямая.'
          }
        ]
      },
      {
        id: 'ex_201_2',
        name: 'Румынская тяга с гантелями',
        muscle_target: 'Бицепс бедра, ягодичные',
        sets: 4,
        reps: '12',
        rest_sec: 60,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
        tip: 'Плавное движение вниз за счет отведения таза.',
        alternatives: [
          {
            name: 'Сгибания ног в тренажере',
            video_url: 'https://www.youtube.com/embed/JCXUYuzwNrM',
            tip: 'Изоляция бицепса бедра.'
          }
        ]
      },
      {
        id: 'ex_201_3',
        name: 'Болгарские сплит-приседания',
        muscle_target: 'Ягодицы, бедра, баланс',
        sets: 3,
        reps: '12 на ногу',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/2C-uNgKwPLE',
        tip: 'Корпус слегка наклонен вперед для акцента на ягодичную мышцу.',
        alternatives: [
          {
            name: 'Выпады назад с гантелями',
            video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
            tip: 'Мягкий шаг назад, колено не бьется о пол.'
          }
        ]
      },
      {
        id: 'ex_201_4',
        name: 'Планка с поочередным подъемом коленей',
        muscle_target: 'Прямая и косые мышцы пресса',
        sets: 3,
        reps: '45 сек',
        rest_sec: 30,
        rpe: 7,
        tempo: 'Динамика',
        video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
        tip: 'Держите тело в одной линии без провисания в пояснице.',
        alternatives: [
          {
            name: 'Классическая планка на локтях',
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
    day_name: 'День 2: Upper Body & Toning (Спина, Плечи, Руки)',
    target_goal: 'weight_loss',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Подтянутые руки, изящная осанка и высокий расход калорий',
    exercises: [
      {
        id: 'ex_202_1',
        name: 'Тяга верхнего блока широким хватом',
        muscle_target: 'Спина, широчайшие, осанка',
        sets: 4,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/CAwf7n6Luuc',
        tip: 'Красивая осанка и раскрытие грудного отдела.',
        alternatives: [
          {
            name: 'Тяга горизонтального блока к поясу',
            video_url: 'https://www.youtube.com/embed/GZbfZ033f74',
            tip: 'Сводите лопатки вместе в конце амплитуды.'
          }
        ]
      },
      {
        id: 'ex_202_2',
        name: 'Жим гантелей сидя на скамье',
        muscle_target: 'Плечи, дельтовидные',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/qEwKCR5JCog',
        tip: 'Укрепление плечевого пояса без перегрузки шеи.',
        alternatives: [
          {
            name: 'Махи гантелями через стороны',
            video_url: 'https://www.youtube.com/embed/ttvfGg9d76c',
            tip: 'Формирование округлости дельт.'
          }
        ]
      },
      {
        id: 'ex_202_3',
        name: 'Тяга горизонтального блока к поясу',
        muscle_target: 'Мышцы спины, осанка',
        sets: 3,
        reps: '15',
        rest_sec: 45,
        rpe: 7,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/GZbfZ033f74',
        tip: 'Сводите лопатки вместе в конце амплитуды.',
        alternatives: [
          {
            name: 'Тяга гантели в наклоне',
            video_url: 'https://www.youtube.com/embed/pYcpY20QaE8',
            tip: 'Глубокая проработка мышц спины.'
          }
        ]
      },
      {
        id: 'ex_202_4',
        name: 'Отжимания от возвышения / с колен',
        muscle_target: 'Грудные мышцы, трицепс, кор',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/IODxDxX7oi4',
        tip: 'Локти под углом 45 градусов к телу.',
        alternatives: [
          {
            name: 'Жим гантелей лежа на горизонтальной скамье',
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
    target_goal: 'weight_loss',
    target_gender: 'female',
    difficulty_level: 1,
    focus: 'Максимальное сжигание калорий и ускорение метаболизма',
    exercises: [
      {
        id: 'ex_203_1',
        name: 'Выпады с гантелями назад',
        muscle_target: 'Ягодицы, бедра, координация',
        sets: 4,
        reps: '15 на ногу',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/wrwwXE_x-pQ',
        tip: 'Колено передней ноги не выходит за носок.',
        alternatives: [
          {
            name: 'Кубковые приседания',
            video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
            tip: 'Слитное динамичное выполнение.'
          }
        ]
      },
      {
        id: 'ex_203_2',
        name: 'Махи гирей / гантелью (Kettlebell swings)',
        muscle_target: 'Задняя цепочка мышц, ягодицы, кардио',
        sets: 4,
        reps: '20',
        rest_sec: 45,
        rpe: 8,
        tempo: 'Взрывной',
        video_url: 'https://www.youtube.com/embed/sSESeQEqu28',
        tip: 'Взрывное движение бедрами, спина прямая.',
        alternatives: [
          {
            name: 'Бёрпи без отжимания',
            video_url: 'https://www.youtube.com/embed/dZgVxmf6jkA',
            tip: 'Высокоинтенсивный жиросжигающий прыжок.'
          }
        ]
      },
      {
        id: 'ex_203_3',
        name: 'Скручивания на пресс на коврике',
        muscle_target: 'Прямая мышца живота',
        sets: 3,
        reps: '20',
        rest_sec: 30,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
        tip: 'Поясница прижата к полу, выдох на подъеме.',
        alternatives: [
          {
            name: 'Велосипед на пресс',
            video_url: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
            tip: 'Проработка косых и прямых мышц пресса.'
          }
        ]
      },
      {
        id: 'ex_203_4',
        name: 'Интервальное кардио (дорожка под наклоном / эллипс)',
        muscle_target: 'Сердечно-сосудистая система, выносливость',
        sets: 1,
        reps: '20 минут',
        rest_sec: 0,
        rpe: 7,
        tempo: 'Интервалы',
        video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
        tip: 'Чередуйте 1 мин бодрого темпа и 1 мин умеренной ходьбы.',
        alternatives: [
          {
            name: 'Гребной тренажер интервалами',
            video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
            tip: 'Работа всего тела с мощным расходом калорий.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 4. WEIGHT LOSS (MALE) - 3-DAY SPLIT
  // ==========================================
  {
    id: 301,
    split_id: 'weight_loss_male',
    day_number: 1,
    day_name: 'День 1: Верх тела & Кардио (Chest & Back Fat Burn)',
    target_goal: 'weight_loss',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Метаболический суперсет на крупные мышцы верха тела с минимальным отдыхом',
    exercises: [
      {
        id: 'ex_301_1',
        name: 'Суперсет: Жим гантелей лежа + Тяга блока к груди',
        muscle_target: 'Грудные мышцы + Широчайшие спины',
        sets: 4,
        reps: '12-15',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/8iPEnn-ltC8',
        tip: 'Минимальный отдых между упражнениями для максимального расхода калорий.',
        alternatives: [
          {
            name: 'Жим штанги лежа + Тяга штанги в наклоне',
            video_url: 'https://www.youtube.com/embed/rT7DgCr-3pg',
            tip: 'Тяжелый суперсет антагонистов.'
          }
        ]
      },
      {
        id: 'ex_301_2',
        name: 'Отжимания на брусьях / от пола',
        muscle_target: 'Грудь, трицепсы, кор',
        sets: 3,
        reps: '12-15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/2z8JmcrW-As',
        tip: 'Контролируйте опускание, держите кор в напряжении.',
        alternatives: [
          {
            name: 'Отжимания от пола с хлопком / взрывные',
            video_url: 'https://www.youtube.com/embed/2z8JmcrW-As',
            tip: 'Взрывная сила верха тела.'
          }
        ]
      },
      {
        id: 'ex_301_3',
        name: 'Тяга гантели одной рукой в наклоне',
        muscle_target: 'Широчайшие, бицепс',
        sets: 3,
        reps: '12 на руку',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/pYcpY20QaE8',
        tip: 'Спина ровная, тяните локоть строго к бедру.',
        alternatives: [
          {
            name: 'Тяга горизонтального блока к поясу',
            video_url: 'https://www.youtube.com/embed/GZbfZ033f74',
            tip: 'Постоянное натяжение троса.'
          }
        ]
      },
      {
        id: 'ex_301_4',
        name: 'Бёрпи без отжимания',
        muscle_target: 'Все тело, выносливость, кардио',
        sets: 3,
        reps: '15',
        rest_sec: 45,
        rpe: 9,
        tempo: 'Взрывной',
        video_url: 'https://www.youtube.com/embed/dZgVxmf6jkA',
        tip: 'Взрывной прыжок вверх, мягкое приземление на стопы.',
        alternatives: [
          {
            name: 'Прыжки на скакалке (100 прыжков)',
            video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
            tip: 'Интенсивное кардио для сжигания жира.'
          }
        ]
      }
    ]
  },
  {
    id: 302,
    split_id: 'weight_loss_male',
    day_number: 2,
    day_name: 'День 2: Ноги & Мощный кор (Legs & Core Burn)',
    target_goal: 'weight_loss',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Тяжелый энергозатратный тренинг ног и пресса',
    exercises: [
      {
        id: 'ex_302_1',
        name: 'Кубковые приседания (Goblet Squats) с гантелью',
        muscle_target: 'Квадрицепсы, ягодичные',
        sets: 4,
        reps: '15',
        rest_sec: 45,
        rpe: 8,
        tempo: '3-0-1-0',
        video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
        tip: 'Держите гантель у груди, глубокий уверенный сед.',
        alternatives: [
          {
            name: 'Приседания со штангой на спине',
            video_url: 'https://www.youtube.com/embed/bEv6CCg2BC8',
            tip: 'Базовое движение для ног.'
          }
        ]
      },
      {
        id: 'ex_302_2',
        name: 'Выпады при ходьбе с гантелями',
        muscle_target: 'Квадрицепс, бицепс бедра, ягодицы',
        sets: 4,
        reps: '20 шагов',
        rest_sec: 60,
        rpe: 8,
        tempo: '2-0-1-0',
        video_url: 'https://www.youtube.com/embed/L8fvypPrzzs',
        tip: 'Широкий шаг, колено задней ноги почти касается пола.',
        alternatives: [
          {
            name: 'Болгарские сплит-приседания',
            video_url: 'https://www.youtube.com/embed/2C-uNgKwPLE',
            tip: 'Глубокая изоляция бедра и ягодиц.'
          }
        ]
      },
      {
        id: 'ex_302_3',
        name: 'Подъем ног на брусьях',
        muscle_target: 'Прямая мышца живота',
        sets: 3,
        reps: '15',
        rest_sec: 45,
        rpe: 8,
        tempo: '2-1-1-0',
        video_url: 'https://www.youtube.com/embed/JB2oyawG9KI',
        tip: 'Без раскачки, задержка в верхней точке.',
        alternatives: [
          {
            name: 'Скручивания на наклонной скамье',
            video_url: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
            tip: 'Прямой акцент на верхний и средний пресс.'
          }
        ]
      },
      {
        id: 'ex_302_4',
        name: 'Планка с динамическим переходом на ладони',
        muscle_target: 'Мышцы кора, плечи',
        sets: 3,
        reps: '45 сек',
        rest_sec: 30,
        rpe: 7,
        tempo: 'Динамика',
        video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
        tip: 'Таз зафиксирован, корпус не качается из стороны в сторону.',
        alternatives: [
          {
            name: 'Альпинист (Mountain Climbers)',
            video_url: 'https://www.youtube.com/embed/pvIjsG5Svck',
            tip: 'Быстрый поднос коленей к груди в упоре лежа.'
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
    target_goal: 'weight_loss',
    target_gender: 'male',
    difficulty_level: 1,
    focus: 'Взрывная выносливость, канаты, гири и спринты',
    exercises: [
      {
        id: 'ex_303_1',
        name: 'Махи гирей двумя руками (Kettlebell Swings)',
        muscle_target: 'Задняя цепочка, ягодицы, кор',
        sets: 4,
        reps: '20',
        rest_sec: 45,
        rpe: 8,
        tempo: 'Взрывной',
        video_url: 'https://www.youtube.com/embed/sSESeQEqu28',
        tip: 'Мощный толчок тазом вперед, руки прямые.',
        alternatives: [
          {
            name: 'Трастеры с гантелями (Присед + жим вверх)',
            video_url: 'https://www.youtube.com/embed/MeIiIdhvXT4',
            tip: 'Комплексное взрывное упражнение на все тело.'
          }
        ]
      },
      {
        id: 'ex_303_2',
        name: 'Бокс на мешке / бой с тенью с гантелями 1-2 кг',
        muscle_target: 'Плечи, выносливость, кардио',
        sets: 3,
        reps: '3 раунда по 2 мин',
        rest_sec: 60,
        rpe: 8,
        tempo: 'Раунды',
        video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
        tip: 'Работайте ногами, серийные удары на выдохе.',
        alternatives: [
          {
            name: 'Прыжки на скакалке',
            video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
            tip: '3 раунда по 2 минуты.'
          }
        ]
      },
      {
        id: 'ex_303_3',
        name: 'Удары боевыми канатами (Battle Ropes)',
        muscle_target: 'Плечи, руки, кор, дыхалка',
        sets: 4,
        reps: '30 сек',
        rest_sec: 45,
        rpe: 9,
        tempo: 'Максимальный темп',
        video_url: 'https://www.youtube.com/embed/jZ3V_0BwY-M',
        tip: 'Ноги в полуприседе, частые мощные удары.',
        alternatives: [
          {
            name: 'Бёрпи с прыжком на тумбу',
            video_url: 'https://www.youtube.com/embed/dZgVxmf6jkA',
            tip: 'Взрывная работа на максимум калорий.'
          }
        ]
      },
      {
        id: 'ex_303_4',
        name: 'Интервальный спринт на дорожке (HIIT)',
        muscle_target: 'Сердце, ноги, пиковое жиросжигание',
        sets: 8,
        reps: '30с спринт / 30с шаг',
        rest_sec: 0,
        rpe: 9,
        tempo: 'Интервалы',
        video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
        tip: 'Максимальная скорость в спринте, глубокое дыхание во время шага.',
        alternatives: [
          {
            name: 'Велотренажер AirBike спринты',
            video_url: 'https://www.youtube.com/embed/X3q5e1kA4xU',
            tip: 'Самый эффективный жиросжигающий кардио-тренажер.'
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

  // Next level perks preview
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

  // Apply periodization modifiers to each exercise dynamically based on week
  return sorted.map((day) => ({
    ...day,
    week_info: weekInfo,
    exercises: (day.exercises || []).map((ex, idx) => {
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
    duration: '60 сек',
    tip: 'Мягкие круговые вращения в суставах, подготовка синовиальной жидкости к нагрузке.',
    icon: 'RotateCw'
  },
  {
    id: 'w2',
    name: 'Разогрев ротаторов плеча и грудного отдела',
    duration: '60 сек',
    tip: 'Вращения прямых рук, сведение-разведение лопаток без веса или с легкой резинкой.',
    icon: 'Activity'
  },
  {
    id: 'w3',
    name: 'Мобильность тазобедренных суставов & приседы с весом тела',
    duration: '90 сек',
    tip: '15 глубоких приседаний с фиксацией внизу для раскрытия таза и коленей.',
    icon: 'Dumbbell'
  },
  {
    id: 'w4',
    name: 'Динамическая планка и активация кора',
    duration: '45 сек',
    tip: 'Планка на предплечьях с поочередным выпрямлением рук для включения пресса и стабилизаторов.',
    icon: 'Shield'
  },
  {
    id: 'w5',
    name: 'Легкий кардио-разогрев (дорожка / эллипс / прыжки)',
    duration: '2-3 мин',
    tip: 'Пульс 110-125 уд/мин, разогрев мышц до легкого потоотделения.',
    icon: 'Flame'
  }
];

// 4-Minute Stretching Cooldown Routine
export const COOLDOWN_EXERCISES = [
  {
    id: 'c1',
    name: 'Растяжка грудных мышц и передних дельт',
    duration: '45 сек',
    tip: 'Рука упирается в стойку/стену, плавный поворот корпуса в противоположную сторону.'
  },
  {
    id: 'c2',
    name: 'Растяжка широчайших мышц спины',
    duration: '45 сек',
    tip: 'Хват за стойку тренажера двумя руками, отведение таза назад с расслаблением спины.'
  },
  {
    id: 'c3',
    name: 'Растяжка квадрицепса и бицепса бедра',
    duration: '60 сек',
    tip: 'Мягкое притягивание пятки к ягодице стоя, затем наклон к прямой ноге.'
  },
  {
    id: 'c4',
    name: 'Глубокое диафрагмальное дыхание',
    duration: '60 сек',
    tip: 'Медленный вдох носом на 4 счета, задержка на 2 счета, выдох ртом на 6 счетов для снижения кортизола.'
  }
];

// Mifflin-St Jeor Daily Calories & Macronutrients Calculator
export function calculateNutrition(gender = 'male', age = 25, weight = 75, goal = 'muscle_gain') {
  const w = Number(weight) || 75;
  const a = Number(age) || 25;
  
  // Basal Metabolic Rate (Mifflin-St Jeor) assuming standard heights
  const h = gender === 'female' ? 165 : 178;
  const bmr = (10 * w) + (6.25 * h) - (5 * a) + (gender === 'female' ? -161 : 5);
  
  // Moderate activity multiplier (3 gym sessions per week)
  const tdee = Math.round(bmr * 1.45);
  
  let targetCalories = tdee;
  let proteinPerKg = 2.0;
  let fatPerKg = 1.0;
  
  if (goal === 'muscle_gain') {
    targetCalories = Math.round(tdee * 1.15); // +15% caloric surplus
    proteinPerKg = 2.0;
    fatPerKg = 1.0;
  } else {
    targetCalories = Math.round(tdee * 0.82); // -18% caloric deficit
    proteinPerKg = 2.2;
    fatPerKg = 0.9;
  }
  
  const proteinGrams = Math.round(w * proteinPerKg);
  const fatGrams = Math.round(w * fatPerKg);
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);
  
  // Water intake
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
      // 3, 2, 1 short alert beep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'finish') {
      // High cheerful completion whistle/chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1046.5, now); // C6
      osc.frequency.setValueAtTime(1318.5, now + 0.1); // E6
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {
    // Silent fail if browser audio policy restricts
  }
}
