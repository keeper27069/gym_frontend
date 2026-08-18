import React, { useState, useEffect, useRef, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';
import { 
  Flame, 
  Dumbbell, 
  CheckCircle2, 
  Trophy, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Settings, 
  Sparkles,
  Zap,
  Shield,
  Award,
  Video,
  Camera,
  Image as ImageIcon,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Calendar as CalendarIcon,
  Check,
  RefreshCw,
  Calculator,
  Lock,
  Unlock,
  Target,
  Activity,
  Droplets,
  HeartPulse,
  Share2,
  Volume2,
  VolumeX,
  ArrowRight,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  ExternalLink,
  Globe,
  Languages,
  Eye,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  findWorkouts, 
  calculateLevel, 
  calculate1RM, 
  calculateNutrition,
  playAudioBeep,
  LEVEL_PERKS, 
  PERIODIZATION_WEEKS, 
  WARMUP_EXERCISES,
  getWarmupExercises,
  COOLDOWN_EXERCISES,
  RANKS,
  getYoutubeEmbedUrl,
  getDirectYoutubeUrl
} from './workoutsData';
import { t, getLocalizedField } from './i18n';
import SmartVideoPlayer from './SmartVideoPlayer';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return path;
  }
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

const RANK_BADGES = {
  1: { name: 'Новичок (Novice)', icon: Shield, color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10' },
  2: { name: 'Атлет (Trainee)', icon: Zap, color: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10' },
  3: { name: 'Железный воин (Ironclad)', icon: Trophy, color: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-500/10' },
  4: { name: 'Ветеран зала (Veteran)', icon: Flame, color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-500/10' },
  5: { name: 'Титан (Titan)', icon: Award, color: 'text-yellow-300', border: 'border-yellow-500/40', bg: 'bg-yellow-500/10' }
};

const formatDateKey = (date) => {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

export default function App() {
  const fileInputRef = useRef(null);

  // Active Language: 'ru' | 'uz' | 'en'
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_lang');
      if (saved && ['ru', 'uz', 'en'].includes(saved)) return saved;
      const tgLang = WebApp?.initDataUnsafe?.user?.language_code;
      if (tgLang) {
        if (tgLang.toLowerCase().startsWith('uz')) return 'uz';
        if (tgLang.toLowerCase().startsWith('en')) return 'en';
      }
      return 'ru';
    } catch {
      return 'ru';
    }
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('gym_lang', newLang);
      triggerHaptic('selection');
    } catch (e) {}
  };

  // Active Bottom Tab: 'workout' | 'calendar' | 'nutrition' | 'profile'
  const [activeTab, setActiveTab] = useState('workout');

  // Profile State
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_profile');
      return saved ? JSON.parse(saved) : {
        gender: 'male',
        age: 22,
        weight: 75,
        goal: 'muscle_gain',
        isSubmitted: false
      };
    } catch {
      return { gender: 'male', age: 22, weight: 75, goal: 'muscle_gain', isSubmitted: false };
    }
  });

  const [streakWeeks, setStreakWeeks] = useState(() => {
    const saved = localStorage.getItem('gym_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [userXp, setUserXp] = useState(() => {
    const saved = localStorage.getItem('gym_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [levelInfo, setLevelInfo] = useState(() => {
    const streak = parseInt(localStorage.getItem('gym_streak') || '0', 10);
    return calculateLevel(streak);
  });

  // Current Periodization Week (1, 2, 3, 4)
  const [currentWeek, setCurrentWeek] = useState(() => {
    const saved = localStorage.getItem('gym_period_week');
    return saved ? parseInt(saved, 10) : 1;
  });

  // Workout state & 3-Day split selection
  const [workoutSplits, setWorkoutSplits] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_profile');
      const p = saved ? JSON.parse(saved) : { goal: 'muscle_gain', gender: 'male' };
      const savedW = localStorage.getItem('gym_period_week');
      const wNum = savedW ? parseInt(savedW, 10) : 1;
      return findWorkouts(p.goal || 'muscle_gain', p.gender || 'male', 1, wNum);
    } catch {
      return findWorkouts('muscle_gain', 'male', 1, 1);
    }
  });
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedSets, setCompletedSets] = useState({});
  const [setWeights, setSetWeights] = useState({}); // { 'exName-setIdx': { weight: 80, reps: 10 } }
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Active Step-by-Step Gym Workout State
  const [isLiveWorkoutOpen, setIsLiveWorkoutOpen] = useState(false);
  const [workoutStage, setWorkoutStage] = useState('warmup'); // 'warmup' | 'exercises' | 'cooldown' | 'summary'
  const [completedWarmups, setCompletedWarmups] = useState({});
  const [completedCooldowns, setCompletedCooldowns] = useState({});
  const [inlineVideoToggles, setInlineVideoToggles] = useState({});

  // Attendance Dates Tracker (YYYY-MM-DD)
  const [attendanceDates, setAttendanceDates] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_attendance');
      return saved ? JSON.parse(saved) : [formatDateKey(new Date())];
    } catch {
      return [formatDateKey(new Date())];
    }
  });

  // Water Tracker (cups out of 8)
  const [waterCups, setWaterCups] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_water_cups');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // Check-ins / Photo proof state
  const [checkIns, setCheckIns] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_check_ins');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [previewModalImage, setPreviewModalImage] = useState(null);

  // Modals state
  const [videoModal, setVideoModal] = useState(null);
  const [videoModalExpanded, setVideoModalExpanded] = useState(false);
  const [alternativeModal, setAlternativeModal] = useState(null);
  const [calculatorModal, setCalculatorModal] = useState(false);
  const [roadmapModal, setRoadmapModal] = useState(false);
  const [calcWeight, setCalcWeight] = useState(80);
  const [calcReps, setCalcReps] = useState(8);

  // Rest Timer State
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentExName, setCurrentExName] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Level Up Celebration Modal
  const [levelUpModal, setLevelUpModal] = useState(null);

  // Safe Haptic feedback for Telegram
  const triggerHaptic = (type = 'success') => {
    try {
      if (WebApp?.HapticFeedback) {
        if (type === 'selection') WebApp.HapticFeedback.selectionChanged();
        else if (type === 'impact') WebApp.HapticFeedback.impactOccurred('medium');
        else if (type === 'heavy') WebApp.HapticFeedback.impactOccurred('heavy');
        else WebApp.HapticFeedback.notificationOccurred(type);
      } else if (navigator?.vibrate) {
        navigator.vibrate(type === 'success' ? [30, 50, 30] : 25);
      }
    } catch (e) {
      // Standalone browser fallback
    }
  };

  // Telegram App Initializer
  useEffect(() => {
    try {
      WebApp.ready();
      WebApp.expand();
      if (WebApp.setHeaderColor) WebApp.setHeaderColor('#0b0f19');
      if (WebApp.setBackgroundColor) WebApp.setBackgroundColor('#0b0f19');
    } catch (e) {
      console.log('Running in standalone browser');
    }
  }, []);

  // Fetch Workouts and Status
  const fetchWorkouts = async (userProfile = profile, streak = streakWeeks, weekNum = currentWeek) => {
    setLoading(true);
    const localSplits = findWorkouts(userProfile.goal, userProfile.gender, levelInfo?.level || 1, weekNum);
    setWorkoutSplits(localSplits);

    try {
      const tgId = WebApp.initDataUnsafe?.user?.id || 123456;
      const res = await fetch(`${API_BASE_URL}/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: tgId,
          gender: userProfile.gender,
          age: Number(userProfile.age),
          weight: Number(userProfile.weight),
          goal: userProfile.goal,
          streak_weeks: streak
        })
      });

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.user_status) {
          setLevelInfo(data.user_status);
          if (data.user_status.xp !== undefined) {
            setUserXp(data.user_status.xp);
            localStorage.setItem('gym_xp', data.user_status.xp.toString());
          }
        }
        if (data.check_ins && data.check_ins.length > 0) {
          setCheckIns(data.check_ins);
          localStorage.setItem('gym_check_ins', JSON.stringify(data.check_ins));
        }
      }
    } catch (err) {
      console.warn('Backend API offline or static mode, using offline dataset');
      const fallbackSplits = findWorkouts(userProfile.goal, userProfile.gender, levelInfo?.level || 1, weekNum);
      setWorkoutSplits(fallbackSplits);
      const fallbackLevel = calculateLevel(streak);
      setLevelInfo(fallbackLevel);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile.isSubmitted) {
      fetchWorkouts(profile, streakWeeks, currentWeek);
    }
  }, [profile.isSubmitted, currentWeek]);

  // Rest Timer Countdown with Web Audio Sound Cues
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (soundEnabled && prev <= 4 && prev > 1) {
            playAudioBeep('countdown');
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      triggerHaptic('success');
      if (soundEnabled) playAudioBeep('finish');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft, soundEnabled]);

  // Attendance helpers
  const todayKey = formatDateKey(new Date());
  const isTodayAttended = attendanceDates.includes(todayKey);

  const toggleAttendanceDate = (dateKey) => {
    triggerHaptic('selection');
    setAttendanceDates((prev) => {
      let updated;
      if (prev.includes(dateKey)) {
        updated = prev.filter((d) => d !== dateKey);
      } else {
        updated = [...prev, dateKey];
        confetti({ particleCount: 60, spread: 50 });
      }
      localStorage.setItem('gym_attendance', JSON.stringify(updated));
      return updated;
    });
  };

  const markTodayAttended = () => {
    if (!attendanceDates.includes(todayKey)) {
      toggleAttendanceDate(todayKey);
    }
  };

  // Generate Current Week Days (Monday to Sunday)
  const currentWeekDays = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const distanceToMonday = (dayOfWeek + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - distanceToMonday);

    const days = [];
    const dayNames = {
      ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      uz: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
      en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    };
    const currentDayNames = dayNames[lang] || dayNames.ru;

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateKey = formatDateKey(d);
      days.push({
        date: d,
        dateKey,
        dayName: currentDayNames[i],
        dayNum: d.getDate(),
        isToday: dateKey === todayKey,
        isAttended: attendanceDates.includes(dateKey)
      });
    }
    return days;
  }, [attendanceDates, todayKey, lang]);

  const weeklyAttendanceCount = currentWeekDays.filter((d) => d.isAttended).length;

  // Change Periodization Week
  const handleSelectWeek = (wNum) => {
    triggerHaptic('selection');
    setCurrentWeek(wNum);
    localStorage.setItem('gym_period_week', wNum.toString());
    const splits = findWorkouts(profile.goal, profile.gender, levelInfo.level, wNum);
    setWorkoutSplits(splits);
  };

  // Replace exercise with chosen alternative
  const handleSwapExercise = (alt) => {
    if (!alternativeModal) return;
    triggerHaptic('impact');
    const { exIndex } = alternativeModal;
    setWorkoutSplits((prevSplits) => {
      const newSplits = JSON.parse(JSON.stringify(prevSplits));
      const curDay = newSplits[selectedDayIdx];
      if (curDay && curDay.exercises && curDay.exercises[exIndex]) {
        const oldEx = curDay.exercises[exIndex];
        curDay.exercises[exIndex] = {
          ...oldEx,
          name: alt.name,
          name_uz: alt.name_uz || alt.name,
          name_en: alt.name_en || alt.name,
          video_url: alt.video_url || oldEx.video_url,
          tip: alt.tip || oldEx.tip,
          tip_uz: alt.tip_uz || alt.tip,
          tip_en: alt.tip_en || alt.tip,
          isAlternativeApplied: true
        };
      }
      return newSplits;
    });
    setAlternativeModal(null);
    confetti({ particleCount: 50, spread: 45 });
  };

  const openRestTimer = (exName, sec = 60) => {
    triggerHaptic('selection');
    setCurrentExName(exName);
    setTimerSeconds(sec);
    setTimeLeft(sec);
    setTimerRunning(true);
    setTimerOpen(true);
  };

  const toggleSet = (exName, setIndex, defaultReps = '10') => {
    triggerHaptic('selection');
    const key = `${exName}-${setIndex}`;
    const nextState = !completedSets[key];
    setCompletedSets(prev => ({ ...prev, [key]: nextState }));
    
    // Auto-open rest timer on completing set
    if (nextState) {
      openRestTimer(exName, 60);
    }
  };

  const updateSetWeight = (exName, setIndex, field, value) => {
    const key = `${exName}-${setIndex}`;
    setSetWeights(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const toggleInlineVideo = (key) => {
    triggerHaptic('selection');
    setInlineVideoToggles(prev => ({
      ...prev,
      [key]: prev[key] === undefined ? false : !prev[key]
    }));
  };

  // Calculate Total Tonnage lifted in current workout
  const totalWorkoutTonnage = useMemo(() => {
    let tonnage = 0;
    Object.keys(completedSets).forEach((key) => {
      if (completedSets[key]) {
        const item = setWeights[key] || { weight: 50, reps: 10 };
        const w = parseFloat(item.weight) || 50;
        const r = parseInt(item.reps, 10) || 10;
        tonnage += (w * r);
      }
    });
    return Math.round(tonnage);
  }, [completedSets, setWeights]);

  // Water cup intake update
  const handleWaterClick = (cupIndex) => {
    triggerHaptic('selection');
    const newCups = cupIndex + 1 === waterCups ? cupIndex : cupIndex + 1;
    setWaterCups(newCups);
    localStorage.setItem('gym_water_cups', newCups.toString());
    if (newCups === 8) {
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  // Handle Photo selection from camera / gallery
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      const preview = URL.createObjectURL(file);
      setPhotoPreviewUrl(preview);
      triggerHaptic('selection');
    }
  };

  const removeSelectedPhoto = () => {
    setSelectedPhoto(null);
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    setPhotoPreviewUrl(null);
  };

  // Upload proof photo
  const handleUploadProof = async () => {
    if (!selectedPhoto) return;
    setUploadingPhoto(true);
    triggerHaptic('impact');

    try {
      const tgId = WebApp.initDataUnsafe?.user?.id || 123456;
      const formData = new FormData();
      formData.append('telegram_id', tgId.toString());
      formData.append('photo', selectedPhoto);
      formData.append('caption', activeWorkout?.day_name || 'Workout Finished');

      const res = await fetch(`${API_BASE_URL}/api/check-in`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        const updatedCheckIns = [data.check_in, ...checkIns];
        setCheckIns(updatedCheckIns);
        localStorage.setItem('gym_check_ins', JSON.stringify(updatedCheckIns));
        triggerHaptic('success');
        confetti({ particleCount: 80, spread: 70 });
        removeSelectedPhoto();
      } else {
        // Mock offline fallback
        const mockCheckIn = {
          id: Date.now(),
          photo_url: photoPreviewUrl,
          caption: activeWorkout?.day_name || 'Workout Finished',
          created_at: new Date().toISOString()
        };
        const updatedCheckIns = [mockCheckIn, ...checkIns];
        setCheckIns(updatedCheckIns);
        localStorage.setItem('gym_check_ins', JSON.stringify(updatedCheckIns));
        triggerHaptic('success');
        confetti({ particleCount: 80, spread: 70 });
        removeSelectedPhoto();
      }
    } catch (e) {
      // Mock offline fallback
      const mockCheckIn = {
        id: Date.now(),
        photo_url: photoPreviewUrl,
        caption: activeWorkout?.day_name || 'Workout Finished',
        created_at: new Date().toISOString()
      };
      const updatedCheckIns = [mockCheckIn, ...checkIns];
      setCheckIns(updatedCheckIns);
      localStorage.setItem('gym_check_ins', JSON.stringify(updatedCheckIns));
      triggerHaptic('success');
      confetti({ particleCount: 80, spread: 70 });
      removeSelectedPhoto();
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Submit Profile Form
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    triggerHaptic('heavy');
    const newProfile = { ...profile, isSubmitted: true };
    setProfile(newProfile);
    localStorage.setItem('gym_profile', JSON.stringify(newProfile));
    setIsEditingProfile(false);
    confetti({ particleCount: 90, spread: 60 });
    fetchWorkouts(newProfile, streakWeeks, currentWeek);
  };

  const activeWorkout = workoutSplits[selectedDayIdx] || workoutSplits[0];
  const currentBadge = RANK_BADGES[levelInfo.level] || RANK_BADGES[1];
  const BadgeIcon = currentBadge.icon;
  const currentWeekMeta = PERIODIZATION_WEEKS[currentWeek] || PERIODIZATION_WEEKS[1];

  // Calculated 1RM
  const calculated1RMValue = useMemo(() => {
    return calculate1RM(calcWeight, calcReps);
  }, [calcWeight, calcReps]);

  // Calculated Daily Nutrition
  const nutritionTargets = useMemo(() => {
    return calculateNutrition(profile.gender, profile.age, profile.weight, profile.goal);
  }, [profile]);

  // Render Language Selector Pill
  const renderLanguageSelector = (compact = false) => (
    <div className="flex items-center bg-slate-800/90 rounded-2xl p-0.5 border border-slate-700/80 shadow-sm">
      {[
        { code: 'ru', flag: '🇷🇺', label: 'RU' },
        { code: 'uz', flag: '🇺🇿', label: 'UZ' },
        { code: 'en', flag: '🇬🇧', label: 'EN' }
      ].map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => changeLanguage(l.code)}
          className={`px-2 py-1 rounded-xl text-[10px] font-black transition-all flex items-center gap-1 ${
            lang === l.code
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>{l.flag}</span>
          {!compact && <span>{l.label}</span>}
        </button>
      ))}
    </div>
  );

  // Onboarding View
  if (!profile.isSubmitted || isEditingProfile) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-5 flex flex-col justify-center max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Languages size={18} className="text-cyan-400" />
            <span className="text-xs font-bold text-slate-400">{t('switch_language', lang)}</span>
          </div>
          {renderLanguageSelector()}
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex p-3.5 bg-blue-600/20 text-blue-400 rounded-2xl mb-3 border border-blue-500/30 shadow-lg shadow-blue-600/20">
            <Dumbbell size={36} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">{t('setup_title', lang)}</h1>
          <p className="text-xs text-slate-400 mt-1">{t('setup_subtitle', lang)}</p>
        </div>

        <form onSubmit={handleSubmitProfile} className="space-y-4 bg-slate-800/80 backdrop-blur-md p-5 rounded-3xl border border-slate-700/60 shadow-2xl">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('gender_label', lang)}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'male', label: `🏋️‍♂️ ${t('gender_male', lang)}` },
                { id: 'female', label: `🏃‍♀️ ${t('gender_female', lang)}` }
              ].map((g) => (
                <button
                  type="button"
                  key={g.id}
                  onClick={() => {
                    triggerHaptic('selection');
                    setProfile({ ...profile, gender: g.id });
                  }}
                  className={`py-3 rounded-2xl font-bold text-xs transition-all ${
                    profile.gender === g.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-700/50'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {t('age_label', lang)}
              </label>
              <input
                type="number"
                min="14"
                max="90"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-3 text-white font-bold text-sm outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {t('weight_label', lang)}
              </label>
              <input
                type="number"
                min="35"
                max="200"
                step="0.5"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-3 text-white font-bold text-sm outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('goal_label', lang)}
            </label>
            <div className="space-y-2">
              {[
                { 
                  id: 'muscle_gain', 
                  label: `💪 ${t('goal_muscle_gain', lang)}`, 
                  desc: profile.gender === 'female' ? 'Ягодицы, подтянутые формы, осанка и рельеф' : '4-недельная прогрессивная перегрузка и сила' 
                },
                { 
                  id: 'weight_loss', 
                  label: `🔥 ${t('goal_weight_loss', lang)}`, 
                  desc: profile.gender === 'female' ? 'Плоский живот, тонкая талия, жиросжигание и кардио' : 'Интенсивный жиросжигающий метаболический сплит' 
                }
              ].map((goal) => (
                <button
                  type="button"
                  key={goal.id}
                  onClick={() => {
                    triggerHaptic('selection');
                    setProfile({ ...profile, goal: goal.id });
                  }}
                  className={`w-full p-3.5 rounded-2xl text-left transition-all border ${
                    profile.goal === goal.id
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-700/50 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{goal.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{goal.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            {isEditingProfile && (
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="py-3.5 px-4 rounded-2xl bg-slate-700 text-slate-300 font-bold text-xs"
              >
                {t('cancel', lang)}
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 font-extrabold rounded-2xl text-white text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{isEditingProfile ? t('save', lang) : t('start_journey_btn', lang)}</span>
              <Sparkles size={16} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  // FULLSCREEN LIVE WORKOUT MODE (When user clicks "Начать тренировку в зале")
  if (isLiveWorkoutOpen) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 max-w-md mx-auto space-y-4 pb-20 animate-in fade-in duration-200">
        {/* Live Workout Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-black text-xs animate-pulse">
              ⚡
            </div>
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                {t('live_active_title', lang)}
              </div>
              <h2 className="text-xs font-black text-white">
                {getLocalizedField(activeWorkout, 'day_name', lang)?.split(':')[1] || getLocalizedField(activeWorkout, 'day_name', lang)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {renderLanguageSelector(true)}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-xs ${soundEnabled ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'}`}
              title={t('sound_timer', lang)}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
            <button
              onClick={() => setIsLiveWorkoutOpen(false)}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
              title={t('close', lang)}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Step Progress Indicators: 1. Разминка -> 2. Упражнения -> 3. Заминка -> 4. Итоги */}
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
          {[
            { id: 'warmup', label: t('stage_warmup', lang) },
            { id: 'exercises', label: t('stage_exercises', lang) },
            { id: 'cooldown', label: t('stage_cooldown', lang) },
            { id: 'summary', label: t('stage_summary', lang) }
          ].map((st) => (
            <div
              key={st.id}
              className={`py-1.5 px-1 rounded-xl transition-all border ${
                workoutStage === st.id
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              {st.label}
            </div>
          ))}
        </div>

        {/* STAGE 1: JOINT & MOBILITY WARM-UP */}
        {workoutStage === 'warmup' && (
          <div className="space-y-3.5">
            <div className="p-3.5 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-3xl border border-amber-500/30 space-y-1">
              <h3 className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                <Flame size={15} />
                <span>{t('warmup_title', lang)}</span>
              </h3>
              <p className="text-[11px] text-slate-300">
                {t('warmup_desc', lang)}
              </p>
            </div>

            <div className="space-y-2">
              {getWarmupExercises(profile.gender).map((w, idx) => {
                const isDone = completedWarmups[w.id];
                return (
                  <div
                    key={w.id}
                    onClick={() => {
                      triggerHaptic('selection');
                      setCompletedWarmups(prev => ({ ...prev, [w.id]: !prev[w.id] }));
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isDone
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-slate-200'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <button className={`w-5 h-5 rounded-lg shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold ${
                      isDone ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700 bg-slate-800 text-transparent'
                    }`}>
                      ✓
                    </button>
                    <div className="space-y-0.5 flex-1">
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span className={isDone ? 'line-through opacity-75' : ''}>{idx + 1}. {getLocalizedField(w, 'name', lang)}</span>
                        <span className="text-[10px] bg-slate-800 text-cyan-300 px-1.5 py-0.2 rounded font-semibold shrink-0 ml-1">
                          {getLocalizedField(w, 'duration', lang)}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">{getLocalizedField(w, 'tip', lang)}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                triggerHaptic('heavy');
                setWorkoutStage('exercises');
                confetti({ particleCount: 40, spread: 40 });
              }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-extrabold rounded-2xl text-white text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <span>{t('warmup_ready_btn', lang)}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STAGE 2: ACTIVE EXERCISES WITH INLINE VIDEO PREVIEWS AND SETS */}
        {workoutStage === 'exercises' && (
          <div className="space-y-3.5">
            <div className="space-y-3">
              {activeWorkout?.exercises?.map((ex, idx) => {
                const isVideoVisible = inlineVideoToggles[ex.id || idx] !== false; // visible by default

                return (
                  <div key={ex.id || idx} className="p-3.5 bg-slate-900 rounded-3xl border border-slate-800 space-y-3 shadow-md">
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1 flex-1">
                        <span className="font-extrabold text-white text-xs">
                          {idx + 1}. {getLocalizedField(ex, 'name', lang)}
                        </span>
                        {ex.muscle_target && (
                          <div className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                            <Target size={11} />
                            <span>{getLocalizedField(ex, 'muscle_target', lang)}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {ex.alternatives && (
                          <button
                            onClick={() => setAlternativeModal({ exIndex: idx, exercise: ex })}
                            className="px-2 py-1 rounded-xl bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[10px] font-bold flex items-center gap-1"
                          >
                            <RefreshCw size={11} />
                            <span>{t('swap_btn', lang)}</span>
                          </button>
                        )}
                        {ex.video_url && (
                          <button
                            onClick={() => toggleInlineVideo(ex.id || idx)}
                            className="px-2 py-1 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-bold flex items-center gap-1"
                          >
                            {isVideoVisible ? <EyeOff size={11} /> : <Eye size={11} />}
                            <span>{isVideoVisible ? t('hide_video', lang) : t('show_video', lang)}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* INLINE VIDEO PLAYER DEMO (Always ready and resilient) */}
                    {ex.video_url && isVideoVisible && (
                      <div className="space-y-1.5 animate-in fade-in duration-200">
                        <SmartVideoPlayer
                          exercise={ex}
                          lang={lang}
                          autoplay={false}
                          onToggleExpand={() => {
                            triggerHaptic('selection');
                            setVideoModal(ex);
                            setVideoModalExpanded(true);
                          }}
                        />

                        {/* Coach Tip Banner */}
                        {ex.tip && (
                          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-1.5">
                            <Info size={13} className="text-amber-400 shrink-0 mt-0.5" />
                            <span>
                              <strong>{t('pro_tip', lang)}:</strong> {getLocalizedField(ex, 'tip', lang)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Target Sets Rows with Weight/Rep Input */}
                    <div className="space-y-2 border-t border-slate-800/80 pt-2">
                      <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 px-1">
                        <span className="col-span-2">{t('set_header', lang)}</span>
                        <span className="col-span-4">{t('weight_header', lang)}</span>
                        <span className="col-span-4">{t('reps_header', lang)}</span>
                        <span className="col-span-2 text-right">{t('done_header', lang)}</span>
                      </div>

                      {Array.from({ length: ex.sets || 3 }).map((_, sIdx) => {
                        const key = `${ex.name}-${sIdx}`;
                        const isDone = completedSets[key];
                        const curVal = setWeights[key] || { weight: '', reps: ex.reps?.split('-')[0] || '10' };

                        return (
                          <div
                            key={sIdx}
                            className={`grid grid-cols-12 items-center gap-1.5 p-1.5 rounded-xl border transition-all ${
                              isDone ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-950 border-slate-800'
                            }`}
                          >
                            <span className="col-span-2 text-xs font-black text-slate-300 pl-1">{sIdx + 1}</span>
                            <div className="col-span-4">
                              <input
                                type="number"
                                placeholder="50"
                                value={curVal.weight}
                                onChange={(e) => updateSetWeight(ex.name, sIdx, 'weight', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white text-center outline-none focus:border-cyan-400"
                              />
                            </div>
                            <div className="col-span-4">
                              <input
                                type="number"
                                placeholder="10"
                                value={curVal.reps}
                                onChange={(e) => updateSetWeight(ex.name, sIdx, 'reps', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white text-center outline-none focus:border-cyan-400"
                              />
                            </div>
                            <div className="col-span-2 flex justify-end">
                              <button
                                onClick={() => toggleSet(ex.name, sIdx)}
                                className={`w-7 h-7 rounded-lg text-xs font-black transition-all flex items-center justify-center ${
                                  isDone
                                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
                                }`}
                              >
                                {isDone ? '✓' : ''}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                triggerHaptic('heavy');
                setWorkoutStage('cooldown');
                confetti({ particleCount: 60, spread: 60 });
              }}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 font-extrabold rounded-2xl text-white text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <span>{t('finish_exercises_btn', lang)}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STAGE 3: COOLDOWN & STRETCHING */}
        {workoutStage === 'cooldown' && (
          <div className="space-y-3.5">
            <div className="p-3.5 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-3xl border border-cyan-500/30 space-y-1">
              <h3 className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                <HeartPulse size={15} />
                <span>{t('cooldown_title', lang)}</span>
              </h3>
              <p className="text-[11px] text-slate-300">
                {t('cooldown_desc', lang)}
              </p>
            </div>

            <div className="space-y-2">
              {COOLDOWN_EXERCISES.map((c, idx) => {
                const isDone = completedCooldowns[c.id];
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      triggerHaptic('selection');
                      setCompletedCooldowns(prev => ({ ...prev, [c.id]: !prev[c.id] }));
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isDone
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-slate-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <button className={`w-5 h-5 rounded-lg shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold ${
                      isDone ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700 bg-slate-800 text-transparent'
                    }`}>
                      ✓
                    </button>
                    <div className="space-y-0.5 flex-1">
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span className={isDone ? 'line-through opacity-75' : ''}>{idx + 1}. {getLocalizedField(c, 'name', lang)}</span>
                        <span className="text-[10px] bg-slate-800 text-cyan-300 px-1.5 py-0.2 rounded font-semibold shrink-0 ml-1">
                          {getLocalizedField(c, 'duration', lang)}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">{getLocalizedField(c, 'tip', lang)}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                triggerHaptic('heavy');
                markTodayAttended();
                setWorkoutStage('summary');
                confetti({ particleCount: 100, spread: 80 });
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 font-extrabold rounded-2xl text-slate-950 text-xs shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
            >
              <span>{t('finish_workout_btn', lang)} 🏆</span>
              <Sparkles size={16} />
            </button>
          </div>
        )}

        {/* STAGE 4: WORKOUT SUMMARY & PROOF CHECK-IN */}
        {workoutStage === 'summary' && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-tr from-blue-900/60 to-purple-900/60 rounded-3xl border border-blue-500/40 text-center space-y-2 shadow-2xl">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                {t('summary_congrats', lang)}
              </span>
              <h2 className="text-xl font-black text-white">{getLocalizedField(activeWorkout, 'day_name', lang)}</h2>
              <p className="text-[11px] text-slate-300">{t('summary_subtitle', lang)}</p>
              
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400">{t('stat_tonnage', lang)}</span>
                  <div className="text-base font-black text-cyan-300">{totalWorkoutTonnage || 3500} kg</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400">{t('stat_xp', lang)}</span>
                  <div className="text-base font-black text-amber-300">+150 XP</div>
                </div>
              </div>
            </div>

            {/* Photo Proof Check-in Section */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera size={16} className="text-amber-400" />
                  <h4 className="text-xs font-bold text-white">{t('proof_photo_title', lang)}</h4>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoSelect}
                className="hidden"
              />

              {!photoPreviewUrl ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3.5 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-white"
                >
                  <Camera size={20} className="text-blue-400" />
                  <span className="text-xs font-bold">{t('take_photo_btn', lang)}</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700 max-h-40">
                    <img src={photoPreviewUrl} alt="Proof" className="w-full h-40 object-cover" />
                    <button
                      onClick={removeSelectedPhoto}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/80 text-white"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  <button
                    onClick={handleUploadProof}
                    disabled={uploadingPhoto}
                    className="w-full py-3 bg-emerald-600 font-bold rounded-xl text-white text-xs flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={15} />
                    <span>{uploadingPhoto ? t('loading', lang) : t('save', lang)}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                triggerHaptic('success');
                setIsLiveWorkoutOpen(false);
                setWorkoutStage('warmup');
              }}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 font-black rounded-2xl text-white text-xs shadow-lg shadow-blue-600/30"
            >
              {t('save_summary_btn', lang)} ✓
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 max-w-md mx-auto space-y-4 pb-28">
      {/* TOP HEADER */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-xs uppercase shadow-md">
            {WebApp.initDataUnsafe?.user?.first_name?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>{WebApp.initDataUnsafe?.user?.first_name || 'Athlete'}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold border border-amber-500/30">
                ⭐ {userXp} XP
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              {profile.goal === 'muscle_gain' ? t('goal_muscle_gain', lang) : t('goal_weight_loss', lang)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              triggerHaptic('selection');
              setCalculatorModal(true);
            }}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-400 hover:text-white transition-colors"
            title={t('one_rm_calc', lang)}
          >
            <Calculator size={16} />
          </button>
          <button
            onClick={() => {
              triggerHaptic('selection');
              setIsEditingProfile(true);
            }}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            title={t('edit_profile', lang)}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* PROMINENT LANGUAGE SWITCHER BAR (Always visible at top) */}
      <div className="bg-slate-800/90 border border-slate-700/80 p-2 rounded-2xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-1.5 pl-1.5">
          <Globe size={15} className="text-cyan-400" />
          <span className="text-[11px] font-extrabold text-white">
            {lang === 'ru' ? 'Язык' : lang === 'uz' ? 'Til' : 'Language'}:
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { code: 'ru', flag: '🇷🇺', label: 'Русский' },
            { code: 'uz', flag: '🇺🇿', label: 'O\'zbek' },
            { code: 'en', flag: '🇬🇧', label: 'English' }
          ].map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => changeLanguage(l.code)}
              className={`py-1 px-2.5 rounded-xl text-[11px] font-black transition-all flex items-center gap-1.5 ${
                lang === l.code
                  ? 'bg-blue-600 text-white shadow-md ring-1 ring-blue-400 scale-[1.02]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: WORKOUT (Clean Dashboard & Big Start Workout Button)   */}
      {/* ============================================================ */}
      {activeTab === 'workout' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Quick Streak Mini Card */}
          <div className="p-3.5 bg-slate-800/90 border border-slate-700/80 rounded-3xl shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame size={20} className="animate-bounce" />
              </div>
              <div>
                <div className="text-xs font-black text-white">{getLocalizedField(levelInfo, 'rank_name', lang) || levelInfo.rank_name}</div>
                <div className="text-[10px] text-slate-400">
                  {streakWeeks} {t('active_streak', lang)} • {weeklyAttendanceCount}/3 {t('weekly_goal', lang)}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                triggerHaptic('selection');
                setRoadmapModal(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-blue-600/20 text-cyan-400 border border-blue-500/30 text-[10px] font-extrabold flex items-center gap-1"
            >
              <span>{levelInfo.level} {t('active_status', lang)}</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Mesocycle 4-Week Selector Chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity size={14} className="text-cyan-400" />
                <span>{t('periodization_title', lang)}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${currentWeekMeta.badge_bg}`}>
                {getLocalizedField(currentWeekMeta, 'tag', lang)}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((wNum) => {
                const isSelected = currentWeek === wNum;
                const meta = PERIODIZATION_WEEKS[wNum];
                return (
                  <button
                    key={wNum}
                    onClick={() => handleSelectWeek(wNum)}
                    className={`py-2 px-1.5 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md font-black scale-[1.02]'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-[10px] font-extrabold">{wNum} {t('week_short', lang)}</span>
                    <span className="text-[9px] opacity-80 truncate max-w-[70px]">{getLocalizedField(meta, 'tag', lang)}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-[11px] text-slate-300 flex items-start gap-2">
              <Info size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>{getLocalizedField(currentWeekMeta, 'description', lang)}</span>
            </div>
          </div>

          {/* 3-Day Split Navigation Chips */}
          <div className="grid grid-cols-3 gap-2">
            {workoutSplits.map((split, sIdx) => {
              const isSelected = selectedDayIdx === sIdx;
              return (
                <button
                  key={split.id || sIdx}
                  onClick={() => {
                    triggerHaptic('selection');
                    setSelectedDayIdx(sIdx);
                  }}
                  className={`py-3 px-2 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white border-blue-400/50 shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase opacity-75">
                    {split.day_number ? `${split.day_number} Day` : `Day ${sIdx + 1}`}
                  </span>
                  <div className="text-xs font-black line-clamp-1 mt-1 text-white">
                    {getLocalizedField(split, 'day_name', lang)?.split(':')[1] || getLocalizedField(split, 'day_name', lang)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* HUGE "START WORKOUT IN GYM" BUTTON */}
          <button
            onClick={() => {
              triggerHaptic('heavy');
              setIsLiveWorkoutOpen(true);
              setWorkoutStage('warmup');
              confetti({ particleCount: 70, spread: 60 });
            }}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-black rounded-3xl text-white text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
          >
            <Flame size={20} className="text-yellow-300 animate-bounce" />
            <span>{t('start_workout_btn', lang)}</span>
            <Sparkles size={18} />
          </button>

          {/* Active Workout Program Preview Card */}
          {activeWorkout && (
            <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-3xl space-y-3 shadow-xl">
              <div className="flex justify-between items-start border-b border-slate-700/60 pb-2.5">
                <div>
                  <h3 className="font-extrabold text-white text-xs">{getLocalizedField(activeWorkout, 'day_name', lang)}</h3>
                  <span className="text-[10px] text-slate-400">{getLocalizedField(activeWorkout, 'focus', lang)}</span>
                </div>
                <span className="px-2 py-0.5 rounded-xl bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30 shrink-0">
                  {activeWorkout.exercises?.length || 0} {t('exercises_count', lang)}
                </span>
              </div>

              <div className="space-y-2">
                {activeWorkout.exercises?.map((ex, idx) => (
                  <div key={ex.id || idx} className="p-2.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div className="space-y-0.5 flex-1 pr-2">
                      <div className="font-bold text-xs text-white">{idx + 1}. {getLocalizedField(ex, 'name', lang)}</div>
                      <div className="text-[10px] text-cyan-400 font-semibold">
                        {ex.sets} {t('sets_label', lang)} × {ex.reps} • {ex.rpe ? `RPE ${ex.rpe}` : 'RPE 8'}
                      </div>
                    </div>
                    {ex.video_url && (
                      <button
                        onClick={() => {
                          triggerHaptic('selection');
                          setVideoModal(ex);
                          setVideoModalExpanded(false);
                        }}
                        className="p-1.5 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1 text-[10px] font-bold shrink-0"
                      >
                        <Video size={13} />
                        <span>{t('video_btn', lang)}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: CALENDAR & DIARY (Attendance & Check-in History)      */}
      {/* ============================================================ */}
      {activeTab === 'calendar' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-3xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} className="text-blue-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                  {t('calendar_title', lang)}
                </span>
              </div>
              <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>{weeklyAttendanceCount} / 3 {t('weekly_goal', lang)}</span>
              </div>
            </div>

            {/* 7-Day Interactive Week Strip */}
            <div className="grid grid-cols-7 gap-1.5">
              {currentWeekDays.map((day) => (
                <button
                  key={day.dateKey}
                  onClick={() => toggleAttendanceDate(day.dateKey)}
                  className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                    day.isAttended
                      ? 'bg-emerald-600/25 border-emerald-500 text-white shadow-md'
                      : day.isToday
                      ? 'bg-blue-600/20 border-blue-400 text-blue-300'
                      : 'bg-slate-900/60 border-slate-700/60 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase opacity-80">{day.dayName}</span>
                  <span className="text-xs font-black my-0.5">{day.dayNum}</span>
                  <div className="text-[9px]">{day.isAttended ? '🔥' : '·'}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => toggleAttendanceDate(todayKey)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                isTodayAttended ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-blue-600 text-white'
              }`}
            >
              <Check size={14} />
              <span>{isTodayAttended ? '✓ Check-in Done' : 'Check-in Today'}</span>
            </button>
          </div>

          {/* Month History */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-3xl space-y-2.5 shadow-xl">
            <div className="flex justify-between items-center text-xs font-bold text-slate-200">
              <span>{t('month_activity', lang)}</span>
              <span className="text-emerald-400 font-extrabold">{attendanceDates.length} visits</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pt-1">
              {attendanceDates.map((dStr) => (
                <span key={dStr} className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  ✓ {dStr}
                </span>
              ))}
            </div>
          </div>

          {/* Past Photo Proofs Gallery */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-3xl space-y-2.5 shadow-xl">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <ImageIcon size={14} className="text-cyan-400" />
              <span>{t('checkin_history', lang)} ({checkIns.length})</span>
            </div>
            {checkIns.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {checkIns.map((ci) => (
                  <div
                    key={ci.id}
                    onClick={() => setPreviewModalImage(getAssetUrl(ci.photo_url))}
                    className="aspect-square rounded-2xl overflow-hidden border border-slate-700 bg-black cursor-pointer"
                  >
                    <img src={getAssetUrl(ci.photo_url)} alt="Proof" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 py-2 text-center">{t('no_checkins', lang)}</p>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: NUTRITION & WATER TRACKER (Daily Macro Targets & Water) */}
      {/* ============================================================ */}
      {activeTab === 'nutrition' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Daily Caloric & Macro Targets */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-3xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400">{t('nutrition_title', lang)}</span>
                <h3 className="text-xs font-black text-white">{t('daily_calories', lang)}</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                {profile.goal === 'muscle_gain' ? '+15% Surplus' : '-18% Deficit'}
              </span>
            </div>

            {/* Calories Big Box */}
            <div className="p-3.5 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-2xl border border-blue-500/30 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">{t('daily_calories', lang)}</span>
              <div className="text-3xl font-black text-white my-0.5">{nutritionTargets.calories} <span className="text-sm font-semibold text-slate-400">{t('kcal_day', lang)}</span></div>
              <span className="text-[10px] text-cyan-400">{t('bmr_label', lang)}: {nutritionTargets.bmr} kcal • {t('tdee_label', lang)}: {nutritionTargets.tdee}</span>
            </div>

            {/* Protein, Fats, Carbs Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-red-400 font-bold">{t('protein_label', lang)}</span>
                <div className="text-base font-black text-white">{nutritionTargets.protein} g</div>
                <span className="text-[9px] text-slate-500">2.0 g/kg</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-amber-400 font-bold">{t('fats_label', lang)}</span>
                <div className="text-base font-black text-white">{nutritionTargets.fats} g</div>
                <span className="text-[9px] text-slate-500">1.0 g/kg</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-emerald-400 font-bold">{t('carbs_label', lang)}</span>
                <div className="text-base font-black text-white">{nutritionTargets.carbs} g</div>
                <span className="text-[9px] text-slate-500">Energy</span>
              </div>
            </div>
          </div>

          {/* Interactive Water Tracker */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-3xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-cyan-400" />
                <h4 className="text-xs font-black text-white uppercase tracking-wider">{t('water_label', lang)}</h4>
              </div>
              <span className="text-xs font-bold text-cyan-400">
                {waterCups} / 8 {t('glasses_label', lang)} ({Math.round(waterCups * 250)} ml)
              </span>
            </div>

            <div className="grid grid-cols-8 gap-1.5">
              {Array.from({ length: 8 }).map((_, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => handleWaterClick(cIdx)}
                  className={`py-3 rounded-2xl border transition-all flex flex-col items-center justify-center ${
                    cIdx < waterCups
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-md scale-[1.03]'
                      : 'bg-slate-900/60 border-slate-700 text-slate-600'
                  }`}
                >
                  <Droplets size={16} className={cIdx < waterCups ? 'text-cyan-400 animate-pulse' : 'text-slate-600'} />
                  <span className="text-[9px] font-black mt-1">{cIdx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: PROFILE & RANKS (Level Roadmap, 1RM, Settings)        */}
      {/* ============================================================ */}
      {activeTab === 'profile' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* User Rank Card */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-3xl shadow-xl space-y-3.5 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full border ${currentBadge.bg} ${currentBadge.color} ${currentBadge.border}`}>
                  {t('active_status', lang)} {levelInfo.level}
                </span>
                <h2 className="text-lg font-black text-white mt-1">
                  {getLocalizedField(levelInfo, 'rank_name', lang) || levelInfo.rank_name}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-2xl border border-amber-500/40 font-black text-sm">
                <Flame size={18} className="text-orange-500" />
                <span>{streakWeeks} {t('week_short', lang)}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                <span>{t('progress_to_next', lang)}</span>
                <span className="text-cyan-400">
                  {levelInfo.level >= 5 ? 'Max Rank' : `${levelInfo.weeks_left} ${t('weeks_left', lang)}`}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(8, levelInfo.progress_percent || 0)}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                triggerHaptic('selection');
                setRoadmapModal(true);
              }}
              className="w-full py-2.5 px-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-between text-xs font-bold text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-amber-400" />
                <span>{t('unlocked_perks', lang)}</span>
              </div>
              <ChevronRight size={14} className="text-cyan-400" />
            </button>
          </div>

          {/* 1RM Calculator Trigger Card */}
          <div
            onClick={() => {
              triggerHaptic('selection');
              setCalculatorModal(true);
            }}
            className="p-4 rounded-3xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-all shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Calculator size={20} />
              </div>
              <div>
                <div className="text-xs font-black text-white">{t('one_rm_calc', lang)}</div>
                <div className="text-[10px] text-slate-400">{t('intensity_pct', lang)}</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </div>

          {/* Language Selection Card in Profile */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-3xl shadow-xl space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-white">
              <Globe size={16} className="text-cyan-400" />
              <span>{t('switch_language', lang)}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: 'ru', flag: '🇷🇺', title: 'Русский', sub: 'RU' },
                { code: 'uz', flag: '🇺🇿', title: 'O\'zbekcha', sub: 'UZ' },
                { code: 'en', flag: '🇬🇧', title: 'English', sub: 'EN' }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLanguage(l.code)}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    lang === l.code
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 font-black scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{l.flag}</span>
                  <span className="text-xs font-bold">{l.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => {
              triggerHaptic('selection');
              setIsEditingProfile(true);
            }}
            className="w-full py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2"
          >
            <Settings size={15} />
            <span>{t('edit_profile', lang)}</span>
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* BOTTOM NAVIGATION BAR (Fixed at bottom)                      */}
      {/* ============================================================ */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 p-2">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
          {[
            { id: 'workout', label: t('tab_workouts', lang), icon: Dumbbell },
            { id: 'calendar', label: t('tab_calendar', lang), icon: CalendarIcon },
            { id: 'nutrition', label: t('tab_nutrition', lang), icon: Droplets },
            { id: 'profile', label: t('tab_profile', lang), icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  triggerHaptic('selection');
                  setActiveTab(tab.id);
                }}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-cyan-400 border border-blue-500/40 font-black'
                    : 'text-slate-500 hover:text-slate-300 font-bold'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
                <span className="text-[10px] mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODALS */}
      {/* 🏆 ROADMAP MODAL */}
      {roadmapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl overflow-hidden border border-blue-500/40 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-amber-400" />
                <h3 className="text-sm font-black text-white">{t('unlocked_perks', lang)}</h3>
              </div>
              <button onClick={() => setRoadmapModal(false)} className="p-1.5 rounded-full bg-slate-800 text-slate-400">
                <X size={16} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3.5">
              <div className="p-3.5 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-2xl border border-blue-500/30 text-center space-y-1">
                <span className="text-[10px] uppercase font-black text-cyan-400">{t('active_status', lang)}</span>
                <div className="text-base font-black text-white">
                  {levelInfo.level} • {getLocalizedField(levelInfo, 'rank_name', lang) || levelInfo.rank_name}
                </div>
              </div>

              <div className="space-y-3">
                {LEVEL_PERKS.map((lvl) => {
                  const isUnlocked = levelInfo.level >= lvl.level;
                  const isCurrent = levelInfo.level === lvl.level;
                  const weeksToUnlock = Math.max(0, lvl.streak_req - streakWeeks);

                  return (
                    <div
                      key={lvl.level}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500/50' : isUnlocked ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-900/80 border-slate-800 opacity-75'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                            isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                          }`}>
                            {isUnlocked ? <Unlock size={13} /> : <Lock size={13} />}
                          </div>
                          <div>
                            <div className="text-xs font-black text-white">{getLocalizedField(lvl, 'rank_name', lang)}</div>
                            <span className="text-[10px] text-slate-400">{lvl.weeks_span}</span>
                          </div>
                        </div>
                        {!isUnlocked && (
                          <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                            {weeksToUnlock} {t('week_short', lang)}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 pt-1 border-t border-slate-700/50">
                        {lvl.perks.map((p, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-1.5 text-[11px]">
                            {isUnlocked ? <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" /> : <Lock size={11} className="text-slate-500 shrink-0 mt-0.5" />}
                            <span className={isUnlocked ? 'text-slate-200' : 'text-slate-400'}>
                              <strong>{getLocalizedField(p, 'name', lang)}:</strong> <span className="text-[10px] text-slate-400">{p.desc}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🧮 1RM CALCULATOR MODAL */}
      {calculatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Calculator size={18} className="text-cyan-400" />
                <h3 className="text-sm font-black text-white">{t('one_rm_calc', lang)}</h3>
              </div>
              <button onClick={() => setCalculatorModal(false)} className="p-1 rounded-full bg-slate-800 text-slate-400">
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t('lifted_weight', lang)}</label>
                <input
                  type="number"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-3 py-2 text-white font-bold text-sm text-center outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t('reps_performed', lang)}</label>
                <input
                  type="number"
                  value={calcReps}
                  onChange={(e) => setCalcReps(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-3 py-2 text-white font-bold text-sm text-center outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="p-3 bg-gradient-to-tr from-cyan-950/60 to-blue-900/60 rounded-2xl border border-cyan-500/40 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">{t('calc_result', lang)}</span>
              <div className="text-3xl font-black text-cyan-300">{calculated1RMValue} kg</div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400">90% Strength</span>
                <div className="font-bold text-white">{Math.round(calculated1RMValue * 0.9)} kg</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400">80% Volume</span>
                <div className="font-bold text-white">{Math.round(calculated1RMValue * 0.8)} kg</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] text-slate-400">70% Pump</span>
                <div className="font-bold text-white">{Math.round(calculated1RMValue * 0.7)} kg</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔄 SMART ALTERNATIVE MODAL */}
      {alternativeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl overflow-hidden border border-blue-500/40 shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-black text-white">{getLocalizedField(alternativeModal.exercise, 'name', lang)}</h4>
              <button onClick={() => setAlternativeModal(null)} className="p-1 rounded-full bg-slate-800 text-slate-400">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2">
              {alternativeModal.exercise.alternatives?.map((alt, aIdx) => (
                <div key={aIdx} className="p-3 rounded-2xl bg-slate-800 border border-slate-700 space-y-1.5">
                  <div className="font-bold text-xs text-white">{getLocalizedField(alt, 'name', lang)}</div>
                  <div className="text-[10px] text-slate-400">{getLocalizedField(alt, 'tip', lang)}</div>
                  <button
                    onClick={() => handleSwapExercise(alt)}
                    className="w-full py-2 bg-blue-600 font-bold rounded-xl text-white text-xs flex items-center justify-center gap-1"
                  >
                    <Check size={13} />
                    <span>{t('select_this_exercise', lang)}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🎬 VIDEO TECHNIQUE MODAL (Standard & Fullscreen Cinema Mode) */}
      {videoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
          <div className={`bg-slate-900 border border-purple-500/50 rounded-3xl w-full flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
            videoModalExpanded
              ? 'max-w-4xl h-[88vh] max-h-[92vh] p-4 sm:p-5'
              : 'max-w-md p-4 space-y-3'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <div className="flex items-center gap-2 flex-1 mr-2 overflow-hidden">
                <Video size={16} className="text-purple-400 shrink-0" />
                <h4 className="text-xs font-bold text-white truncate">
                  {getLocalizedField(videoModal, 'name', lang)}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Direct YouTube App Launch */}
                <a
                  href={getDirectYoutubeUrl(videoModal.video_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-bold flex items-center gap-1 hover:bg-red-600/30"
                  title={t('open_youtube', lang)}
                >
                  <ExternalLink size={12} />
                  <span className="hidden sm:inline">{t('open_youtube', lang)}</span>
                </a>

                {/* Size toggle: Maximize / Minimize */}
                <button
                  onClick={() => setVideoModalExpanded(!videoModalExpanded)}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  title={videoModalExpanded ? t('exit_fullscreen', lang) : t('fullscreen_video', lang)}
                >
                  {videoModalExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>

                <button
                  onClick={() => {
                    setVideoModal(null);
                    setVideoModalExpanded(false);
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Resilient Smart Video Player */}
            <SmartVideoPlayer
              exercise={videoModal}
              lang={lang}
              isModal={true}
              autoplay={true}
              isExpanded={videoModalExpanded}
              onToggleExpand={() => setVideoModalExpanded(!videoModalExpanded)}
            />

            {/* Coach Biomechanics Tip */}
            {videoModal.tip && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-1.5">
                <Info size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{t('pro_tip', lang)}:</strong> {getLocalizedField(videoModal, 'tip', lang)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULL PHOTO PREVIEW MODAL */}
      {previewModalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700">
            <button onClick={() => setPreviewModalImage(null)} className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-white z-10">
              <X size={16} />
            </button>
            <img src={previewModalImage} alt="Full Proof" className="w-full max-h-[70vh] object-contain bg-black" />
          </div>
        </div>
      )}

      {/* REST TIMER MODAL */}
      {timerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xs p-6 text-center space-y-4 shadow-2xl relative">
            <button onClick={() => { setTimerOpen(false); setTimerRunning(false); }} className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400">
              <X size={16} />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">{t('rest_timer_title', lang)}</span>
              <h4 className="text-sm font-bold text-white truncate mt-0.5">{currentExName}</h4>
            </div>

            <div className="text-4xl font-black font-mono text-white tracking-tight py-2">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => { triggerHaptic('impact'); setTimerRunning(!timerRunning); }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${
                  timerRunning ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                }`}
              >
                {timerRunning ? <Pause size={14} /> : <Play size={14} />}
                <span>{timerRunning ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start'}</span>
              </button>
              <button
                onClick={() => { triggerHaptic('selection'); setTimeLeft(timerSeconds); setTimerRunning(false); }}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL UP CELEBRATION MODAL */}
      {levelUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl w-full max-w-sm p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg animate-bounce">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="text-xs font-black uppercase text-amber-400">Level Up!</span>
              <h3 className="text-2xl font-black text-white mt-1">Lvl {levelUpModal.level} • {levelUpModal.rank_name}</h3>
            </div>
            <button onClick={() => setLevelUpModal(null)} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs">
              Continue 🔥
            </button>
          </div>
        </div>
      )}
    </div>
  );
}