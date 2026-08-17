import React, { useState, useEffect, useRef } from 'react';
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
  Info,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { findWorkouts, calculateLevel, RANKS } from './workoutsData';

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

export default function App() {
  const fileInputRef = useRef(null);

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

  // Workout state & 3-Day split selection
  const [workoutSplits, setWorkoutSplits] = useState(() => {
    try {
      const saved = localStorage.getItem('gym_profile');
      const p = saved ? JSON.parse(saved) : { goal: 'muscle_gain', gender: 'male' };
      return findWorkouts(p.goal || 'muscle_gain', p.gender || 'male', 1);
    } catch {
      return findWorkouts('muscle_gain', 'male', 1);
    }
  });
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedSets, setCompletedSets] = useState({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);

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

  // Video Technique Modal State
  const [videoModal, setVideoModal] = useState(null); // { exerciseName, videoUrl, tip, sets, reps }

  // Rest Timer State
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentExName, setCurrentExName] = useState('');

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
      // Browser fallback
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
  const fetchWorkouts = async (userProfile = profile, streak = streakWeeks) => {
    setLoading(true);
    // Ensure workouts are instantly set from local catalog first
    const localSplits = findWorkouts(userProfile.goal, userProfile.gender, levelInfo?.level || 1);
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
        if (data.workouts && data.workouts.length > 0) {
          setWorkoutSplits(data.workouts);
        }
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
      const fallbackSplits = findWorkouts(userProfile.goal, userProfile.gender, levelInfo?.level || 1);
      setWorkoutSplits(fallbackSplits);
      const fallbackLevel = calculateLevel(streak);
      setLevelInfo(fallbackLevel);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile.isSubmitted) {
      fetchWorkouts(profile, streakWeeks);
    }
  }, [profile.isSubmitted]);

  // Rest Timer Countdown logic
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      triggerHaptic('success');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const openRestTimer = (exName, sec = 60) => {
    triggerHaptic('selection');
    setCurrentExName(exName);
    setTimerSeconds(sec);
    setTimeLeft(sec);
    setTimerRunning(true);
    setTimerOpen(true);
  };

  const toggleSet = (exName, setIndex) => {
    triggerHaptic('selection');
    const key = `${exName}-${setIndex}`;
    setCompletedSets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle Photo selection from camera / gallery
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerHaptic('selection');
      setSelectedPhoto(file);
      const preview = URL.createObjectURL(file);
      setPhotoPreviewUrl(preview);
    }
  };

  const removeSelectedPhoto = () => {
    triggerHaptic('selection');
    setSelectedPhoto(null);
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    setPhotoPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Upload Check-in Photo Proof
  const handleUploadProof = async () => {
    if (!selectedPhoto) return;
    setUploadingPhoto(true);
    triggerHaptic('impact');

    const prevLevel = levelInfo?.level || 1;
    const activeWorkout = workoutSplits[selectedDayIdx] || workoutSplits[0];

    let newStreak = streakWeeks + 1;
    let newXp = userXp + 150;
    let newStatus = calculateLevel(newStreak);
    let uploadedSuccessfully = false;

    try {
      const tgId = WebApp.initDataUnsafe?.user?.id || 123456;
      const formData = new FormData();
      formData.append('telegram_id', tgId.toString());
      formData.append('workout_id', (activeWorkout?.id || 101).toString());
      formData.append('workout_title', activeWorkout?.day_name || 'Дневная тренировка');
      formData.append('photo', selectedPhoto);

      const res = await fetch(`${API_BASE_URL}/api/check-in`, {
        method: 'POST',
        body: formData
      });

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.new_streak_weeks !== undefined) newStreak = data.new_streak_weeks;
        if (data.total_xp !== undefined) newXp = data.total_xp;
        if (data.new_status) newStatus = data.new_status;
        if (data.check_ins && data.check_ins.length > 0) {
          setCheckIns(data.check_ins);
          localStorage.setItem('gym_check_ins', JSON.stringify(data.check_ins));
        }
        uploadedSuccessfully = true;
      }
    } catch (err) {
      console.warn('Upload server unavailable, using local offline storage');
    }

    // Always update streak, xp and level
    setStreakWeeks(newStreak);
    localStorage.setItem('gym_streak', newStreak.toString());
    setUserXp(newXp);
    localStorage.setItem('gym_xp', newXp.toString());
    setLevelInfo(newStatus);

    if (!uploadedSuccessfully && photoPreviewUrl) {
      const localCheckIn = {
        id: Date.now(),
        workout_title: activeWorkout?.day_name || 'Тренировка в зале',
        photo_url: photoPreviewUrl,
        created_at: new Date().toISOString()
      };
      setCheckIns((prev) => {
        const updated = [localCheckIn, ...prev].slice(0, 20);
        localStorage.setItem('gym_check_ins', JSON.stringify(updated));
        return updated;
      });
    }

    // Confetti celebration
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    triggerHaptic('success');

    // Check if level upgraded
    if (newStatus && newStatus.level > prevLevel) {
      setTimeout(() => {
        setLevelUpModal(newStatus);
      }, 400);
    }

    removeSelectedPhoto();
    setUploadingPhoto(false);
  };

  // Submit Profile Form
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    triggerHaptic('heavy');
    const updated = { ...profile, isSubmitted: true };
    setProfile(updated);
    setIsEditingProfile(false);
    localStorage.setItem('gym_profile', JSON.stringify(updated));
    const splits = findWorkouts(updated.goal, updated.gender, levelInfo?.level || 1);
    setWorkoutSplits(splits);
    setSelectedDayIdx(0);
    fetchWorkouts(updated, streakWeeks);
  };

  // Current active day split
  const activeWorkout = workoutSplits[selectedDayIdx] || workoutSplits[0];
  const currentBadge = RANK_BADGES[levelInfo.level] || RANK_BADGES[1];
  const BadgeIcon = currentBadge.icon;

  // Onboarding / Profile Edit View
  if (!profile.isSubmitted || isEditingProfile) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-5 flex flex-col justify-center max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex p-3.5 bg-blue-600/20 text-blue-400 rounded-2xl mb-3 border border-blue-500/30">
            <Dumbbell size={36} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Настройка программы</h1>
          <p className="text-xs text-slate-400 mt-1">3-дневный сплит, видео упражнений и фото-отчеты</p>
        </div>

        <form onSubmit={handleSubmitProfile} className="space-y-4 bg-slate-800/80 backdrop-blur-md p-5 rounded-3xl border border-slate-700/60 shadow-2xl">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Пол</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'male', label: '🏋️‍♂️ Мужской' },
                { id: 'female', label: '🏃‍♀️ Женский' }
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
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Возраст</label>
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
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Вес (кг)</label>
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
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Главная цель</label>
            <div className="space-y-2">
              {[
                { id: 'muscle_gain', label: '💪 Набор массы & Сила', desc: 'Классический 3-дневный силовой сплит' },
                { id: 'weight_loss', label: '🔥 Похудение & Рельеф', desc: 'Интенсивный жиросжигающий 3-дневный план' }
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
                Отмена
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 font-extrabold rounded-2xl text-white text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{isEditingProfile ? 'Сохранить изменения' : 'Сформировать 3-дневный сплит'}</span>
              <Sparkles size={16} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 max-w-md mx-auto space-y-4 pb-20">
      {/* Top App Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-xs uppercase shadow-md">
            {WebApp.initDataUnsafe?.user?.first_name?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <span>{WebApp.initDataUnsafe?.user?.first_name || 'Атлет'}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold border border-amber-500/30">
                ⭐ {userXp} XP
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              {profile.goal === 'muscle_gain' ? 'Набор массы' : 'Жиросжигание'} • 3-дневный сплит
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            triggerHaptic('selection');
            setIsEditingProfile(true);
          }}
          className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Настройки"
        >
          <Settings size={16} />
        </button>
      </div>

      {/* Gamification Dashboard Card */}
      <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-3xl shadow-xl relative overflow-hidden space-y-3.5">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full border ${currentBadge.bg} ${currentBadge.color} ${currentBadge.border}`}>
                Уровень {levelInfo.level} • {currentBadge.name.split(' ')[0]}
              </span>
            </div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span>{levelInfo.rank_name}</span>
              <BadgeIcon className={`w-5 h-5 ${currentBadge.color}`} />
            </h2>
          </div>

          {/* Fire Streak Counter */}
          <div className="flex items-center gap-1.5 bg-gradient-to-b from-amber-500/20 to-orange-600/20 text-amber-300 px-3 py-1.5 rounded-2xl border border-amber-500/40 font-black text-sm shadow-md">
            <Flame size={18} className="text-orange-500 animate-bounce" />
            <span>{streakWeeks} нед.</span>
          </div>
        </div>

        {/* Dynamic Level Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
            <span>Прогресс ранга</span>
            <span className="text-cyan-400">
              {levelInfo.level >= 5 ? 'Максимальный ранг!' : `${levelInfo.weeks_left || 1} нед. до след. ранга (${levelInfo.progress_percent || 0}%)`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${Math.max(8, levelInfo.progress_percent || 0)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3-DAY SPLIT SELECTOR TABS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={14} className="text-blue-400" />
            <span>Дни тренировочного сплита</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">3 тренировки в неделю</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {workoutSplits.map((split, idx) => {
            const isSelected = selectedDayIdx === idx;
            return (
              <button
                key={split.id || idx}
                onClick={() => {
                  triggerHaptic('selection');
                  setSelectedDayIdx(idx);
                }}
                className={`py-2.5 px-2 rounded-2xl text-center transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white font-black border-blue-400 shadow-lg shadow-blue-600/30 scale-[1.02]'
                    : 'bg-slate-800/80 text-slate-400 font-bold border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div className="text-xs">День {split.day_number || idx + 1}</div>
                <div className="text-[9px] opacity-80 truncate mt-0.5">
                  {split.day_name?.split('(')[1]?.replace(')', '') || 'Программа'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE DAY WORKOUT CARD */}
      {loading ? (
        <div className="text-center py-10 text-slate-400 text-xs font-medium">Загрузка сплита...</div>
      ) : activeWorkout ? (
        <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-3xl space-y-3.5 shadow-xl">
          <div className="flex justify-between items-start border-b border-slate-700/60 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-sm leading-snug">{activeWorkout.day_name}</h3>
              <span className="text-[10px] text-slate-400">Сложность: Уровень {activeWorkout.difficulty_level}</span>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
              {activeWorkout.exercises?.length || 0} упр.
            </span>
          </div>

          {/* Exercises List */}
          <div className="space-y-2.5">
            {activeWorkout.exercises?.map((ex, idx) => (
              <div key={idx} className="p-3 bg-slate-900/90 rounded-2xl text-xs border border-slate-800 space-y-2.5">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-100">{idx + 1}. {ex.name}</span>
                    {ex.tip && <div className="text-[10px] text-slate-400">{ex.tip}</div>}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Technique Video Demonstration Button */}
                    {ex.video_url && (
                      <button
                        onClick={() => {
                          triggerHaptic('selection');
                          setVideoModal(ex);
                        }}
                        className="px-2 py-1 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95"
                        title="Видео техники"
                      >
                        <Video size={12} className="text-purple-400" />
                        <span>Видео</span>
                      </button>
                    )}

                    {/* Rest Timer Button */}
                    {ex.rest_sec > 0 && (
                      <button
                        onClick={() => openRestTimer(ex.name, ex.rest_sec)}
                        className="px-2 py-1 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95"
                      >
                        <Clock size={12} className="text-cyan-400" />
                        <span>{ex.rest_sec}с</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sets × Reps & Interactive Checkboxes */}
                <div className="flex justify-between items-center pt-1.5 border-t border-slate-800/80">
                  <span className="text-slate-400 font-medium">
                    {ex.sets} подходов × <strong className="text-blue-400 font-extrabold">{ex.reps}</strong>
                  </span>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: ex.sets || 3 }).map((_, sIdx) => {
                      const isDone = completedSets[`${ex.name}-${sIdx}`];
                      return (
                        <button
                          key={sIdx}
                          onClick={() => toggleSet(ex.name, sIdx)}
                          className={`w-6 h-6 rounded-lg text-[10px] font-black transition-all ${
                            isDone
                              ? 'bg-emerald-500 text-slate-950 shadow-sm'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : sIdx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* PHOTO PROOF CHECK-IN SECTION */}
      <div className="bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 p-4 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera size={16} className="text-amber-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Фото-отчет тренировки (Check-in)</h4>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-extrabold">
            +150 XP
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          Сделайте фото в зале для подтверждения тренировки и прокачки ранга:
        </p>

        {/* Hidden Camera Input */}
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
            onClick={() => {
              triggerHaptic('selection');
              fileInputRef.current?.click();
            }}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-900/50 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-[0.99] text-slate-400 hover:text-white"
          >
            <Camera size={24} className="text-blue-400" />
            <span className="text-xs font-bold">Сделать фото или выбрать из галереи</span>
            <span className="text-[10px] text-slate-500">JPG, PNG (селфи или тренажеры)</span>
          </button>
        ) : (
          <div className="space-y-2.5">
            {/* Live Photo Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black max-h-48 flex items-center justify-center">
              <img src={photoPreviewUrl} alt="Preview" className="w-full h-48 object-cover" />
              <button
                onClick={removeSelectedPhoto}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black"
                title="Удалить"
              >
                <X size={14} />
              </button>
            </div>

            {/* Confirm Check-in Button */}
            <button
              onClick={handleUploadProof}
              disabled={uploadingPhoto}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 font-extrabold rounded-2xl text-white text-xs shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <CheckCircle2 size={16} />
              <span>{uploadingPhoto ? 'Загружаем отчет...' : 'Подтвердить тренировку (+150 XP & стрик)'}</span>
            </button>
          </div>
        )}
      </div>

      {/* GALLERY OF PAST PHOTO CHECK-INS */}
      {checkIns.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon size={14} className="text-cyan-400" />
              <span>История фото-отчетов ({checkIns.length})</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {checkIns.map((ci) => (
              <div
                key={ci.id}
                onClick={() => setPreviewModalImage(getAssetUrl(ci.photo_url))}
                className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700/80 cursor-pointer hover:border-cyan-400 transition-all bg-slate-800 shadow-sm group"
              >
                <img
                  src={getAssetUrl(ci.photo_url)}
                  alt="Proof"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs px-1 py-0.5 text-[8px] text-center text-slate-300 truncate font-semibold">
                  {ci.created_at ? new Date(ci.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) : 'Зал'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL PHOTO PREVIEW MODAL */}
      {previewModalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <button
              onClick={() => setPreviewModalImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-white z-10 hover:bg-black"
            >
              <X size={16} />
            </button>
            <img src={previewModalImage} alt="Full Proof" className="w-full max-h-[70vh] object-contain bg-black" />
            <div className="p-3 text-center text-xs font-bold text-slate-300">
              📸 Подтвержденная тренировка в зале
            </div>
          </div>
        </div>
      )}

      {/* VIDEO TECHNIQUE MODAL */}
      {videoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-sm p-4 space-y-3 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <Video size={16} className="text-purple-400" />
                <h4 className="text-xs font-bold text-white truncate max-w-[220px]">
                  {videoModal.name}
                </h4>
              </div>
              <button
                onClick={() => setVideoModal(null)}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Embedded Responsive Video Frame */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
              <iframe
                src={`${videoModal.video_url}?autoplay=1&mute=1&loop=1&playsinline=1`}
                title={videoModal.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Tips and Advice */}
            {videoModal.tip && (
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 flex items-start gap-2">
                <Info size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>{videoModal.tip}</span>
              </div>
            )}

            <button
              onClick={() => {
                const sec = videoModal.rest_sec || 60;
                setVideoModal(null);
                openRestTimer(videoModal.name, sec);
              }}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 font-bold rounded-xl text-white text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Clock size={14} />
              <span>Запустить таймер отдыха ({videoModal.rest_sec || 60}с)</span>
            </button>
          </div>
        </div>
      )}

      {/* REST TIMER MODAL */}
      {timerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xs p-6 text-center space-y-4 shadow-2xl relative">
            <button
              onClick={() => {
                triggerHaptic('selection');
                setTimerOpen(false);
                setTimerRunning(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Таймер отдыха</span>
              <h4 className="text-sm font-bold text-white truncate mt-0.5">{currentExName}</h4>
            </div>

            {/* Countdown Display */}
            <div className="py-2">
              <div className="text-4xl font-black font-mono text-white tracking-tight">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-semibold">
                {timeLeft === 0 ? '🎉 Отдых завершен! Новый подход!' : 'Секунд до следующего подхода'}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  triggerHaptic('impact');
                  setTimerRunning(!timerRunning);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${
                  timerRunning ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                }`}
              >
                {timerRunning ? <Pause size={14} /> : <Play size={14} />}
                <span>{timerRunning ? 'Пауза' : timeLeft === 0 ? 'Заново' : 'Старт'}</span>
              </button>

              <button
                onClick={() => {
                  triggerHaptic('selection');
                  setTimeLeft(timerSeconds);
                  setTimerRunning(false);
                }}
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
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl w-full max-w-sm p-6 shadow-2xl text-center space-y-4 relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg animate-bounce">
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">Новый уровень достигнут!</span>
              <h3 className="text-2xl font-black text-white mt-1">
                Lvl {levelUpModal.level} • {levelUpModal.rank_name}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Серия: {levelUpModal.streak_weeks} нед. • XP: {levelUpModal.xp || userXp}
              </p>
            </div>

            <button
              onClick={() => {
                triggerHaptic('success');
                setLevelUpModal(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 active:scale-98 transition-all"
            >
              Продолжить тренировки 🔥
            </button>
          </div>
        </div>
      )}
    </div>
  );
}