import React, { useState, useEffect, useMemo } from 'react';
import { 
  ExternalLink, 
  RefreshCw, 
  Search, 
  AlertTriangle, 
  Play, 
  Maximize2, 
  Minimize2, 
  HelpCircle, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { t, getLocalizedField } from './i18n';
import { getYoutubeId, getYoutubeEmbedUrl, getDirectYoutubeUrl } from './workoutsData';
import { openTelegramLink, hapticImpact, hapticSelection } from './telegram';

/**
 * SmartVideoPlayer - Resilient video player with automatic embed error detection,
 * copyright/embed block fallbacks, alternative video switching, and 1-tap YouTube app opening.
 */
export default function SmartVideoPlayer({
  exercise,
  lang = 'ru',
  isModal = false,
  autoplay = false,
  isExpanded = false,
  onToggleExpand = null,
  className = ''
}) {
  const exerciseName = getLocalizedField(exercise, 'name', lang);
  
  // Available video sources (primary + alternatives)
  const videoSources = useMemo(() => {
    const list = [];
    if (exercise?.video_url) {
      list.push({
        name: exerciseName,
        url: exercise.video_url,
        isPrimary: true
      });
    }
    if (Array.isArray(exercise?.alternatives)) {
      exercise.alternatives.forEach((alt, idx) => {
        if (alt.video_url) {
          list.push({
            name: getLocalizedField(alt, 'name', lang) || `Альтернатива #${idx + 1}`,
            url: alt.video_url,
            isPrimary: false
          });
        }
      });
    }
    return list;
  }, [exercise, lang, exerciseName]);

  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const [hasEmbedError, setHasEmbedError] = useState(false);
  const [showHelpBanner, setShowHelpBanner] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const currentSource = videoSources[activeSourceIndex] || videoSources[0] || { url: exercise?.video_url };
  const currentVideoUrl = currentSource.url || exercise?.video_url || '';

  // Reset states when exercise changes
  useEffect(() => {
    setActiveSourceIndex(0);
    setHasEmbedError(false);
    setShowHelpBanner(false);
  }, [exercise?.id, exercise?.video_url]);

  // Listen to YouTube postMessage errors (error codes 2, 5, 100, 101, 150)
  useEffect(() => {
    const handlePostMessage = (event) => {
      try {
        if (!event.data) return;
        let data = event.data;
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch {
            return;
          }
        }
        if (
          data.event === 'onError' ||
          (data.info && typeof data.info === 'number' && [2, 5, 100, 101, 150].includes(data.info))
        ) {
          console.warn('YouTube embed error event intercepted:', data);
          setHasEmbedError(true);
        }
      } catch (e) {
        // Ignore parsing errors
      }
    };

    window.addEventListener('message', handlePostMessage);
    return () => window.removeEventListener('message', handlePostMessage);
  }, [currentVideoUrl]);

  // Open direct YouTube video (bypasses all iframe / embed / copyright blocks)
  const handleOpenDirectYoutube = (e) => {
    if (e) e.stopPropagation();
    hapticImpact('medium');
    const directUrl = getDirectYoutubeUrl(currentVideoUrl);
    openTelegramLink(directUrl);
  };

  // Search YouTube for exercise technique
  const handleSearchYoutube = (e) => {
    if (e) e.stopPropagation();
    hapticImpact('light');
    const searchTerms = `${exerciseName} техника выполнения tutorial`;
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerms)}`;
    openTelegramLink(searchUrl);
  };

  // Switch to next alternative video
  const handleSwitchAlternative = (e) => {
    if (e) e.stopPropagation();
    hapticSelection();
    if (videoSources.length > 1) {
      const nextIndex = (activeSourceIndex + 1) % videoSources.length;
      setActiveSourceIndex(nextIndex);
      setHasEmbedError(false);
      setRetryKey((k) => k + 1);
    }
  };

  // Retry loading current video
  const handleRetry = (e) => {
    if (e) e.stopPropagation();
    hapticSelection();
    setHasEmbedError(false);
    setRetryKey((k) => k + 1);
  };

  const embedUrl = getYoutubeEmbedUrl(currentVideoUrl, autoplay);

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {/* Video Container */}
      <div 
        className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl transition-all ${
          isModal && isExpanded ? 'flex-1 min-h-[360px]' : 'aspect-video'
        }`}
      >
        {/* If embed failed or restricted, show fallback resolution card */}
        {hasEmbedError ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2 shadow-lg shadow-amber-500/10">
              <AlertTriangle size={24} />
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
              {t('video_error_title', lang)}
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-400 max-w-xs mb-3 leading-relaxed">
              {t('video_error_desc', lang)}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xs">
              {/* Primary 1-Click Launch in YouTube App */}
              <button
                onClick={handleOpenDirectYoutube}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/25 active:scale-95 transition-transform"
              >
                <Play size={13} className="fill-current" />
                <span>{t('open_in_youtube_btn', lang)}</span>
                <ExternalLink size={11} className="opacity-80" />
              </button>

              {/* Alternative Video Switcher */}
              {videoSources.length > 1 && (
                <button
                  onClick={handleSwitchAlternative}
                  className="w-full py-2 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 font-semibold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  <RefreshCw size={12} />
                  <span>{t('switch_to_backup_video', lang)}</span>
                </button>
              )}
            </div>

            {/* Quick Search & Retry Bar */}
            <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-400">
              <button
                onClick={handleSearchYoutube}
                className="hover:text-cyan-400 flex items-center gap-1 underline underline-offset-2"
              >
                <Search size={10} />
                <span>{t('search_exercise_youtube', lang)}</span>
              </button>
              <span>•</span>
              <button
                onClick={handleRetry}
                className="hover:text-white flex items-center gap-1"
              >
                <RotateCcw size={10} />
                <span>Попробовать снова</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Iframe Embed */
          <>
            <iframe
              key={retryKey + currentVideoUrl}
              src={embedUrl}
              title={exerciseName}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full border-0"
              onError={() => setHasEmbedError(true)}
            />

            {/* Floating Top Bar: Direct App Launcher & Fullscreen */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
              {/* Direct YouTube App launcher */}
              <button
                onClick={handleOpenDirectYoutube}
                className="px-2 py-1 rounded-xl bg-black/75 hover:bg-black/90 text-white hover:text-red-400 border border-slate-700/80 backdrop-blur-md text-[10px] font-bold flex items-center gap-1 shadow-lg transition-colors"
                title={t('open_youtube', lang)}
              >
                <Play size={10} className="fill-current text-red-500" />
                <span className="hidden sm:inline">YouTube</span>
                <ExternalLink size={10} />
              </button>

              {/* Fullscreen / Expand toggle if provided */}
              {onToggleExpand && (
                <button
                  onClick={() => {
                    hapticSelection();
                    onToggleExpand();
                  }}
                  className="p-1.5 rounded-xl bg-black/75 hover:bg-black/90 text-white hover:text-cyan-400 border border-slate-700/80 backdrop-blur-md shadow-lg transition-colors"
                  title={isExpanded ? t('exit_fullscreen', lang) : t('fullscreen_video', lang)}
                >
                  {isExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                </button>
              )}
            </div>

            {/* Source info pill at bottom left */}
            {videoSources.length > 1 && (
              <div className="absolute bottom-2 left-2 z-10">
                <button
                  onClick={handleSwitchAlternative}
                  className="px-2 py-0.5 rounded-lg bg-black/70 hover:bg-black/90 text-slate-300 hover:text-purple-300 border border-slate-700/60 backdrop-blur-md text-[9px] font-medium flex items-center gap-1 transition-colors"
                >
                  <RefreshCw size={9} />
                  <span>Видео {activeSourceIndex + 1}/{videoSources.length}</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Persistent Quick-Action & Help Strip below the video */}
      <div className="flex items-center justify-between px-1 text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenDirectYoutube}
            className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition-colors"
          >
            <Play size={10} className="fill-current" />
            <span>{t('open_youtube', lang)}</span>
          </button>

          {videoSources.length > 1 && (
            <>
              <span className="text-slate-600">•</span>
              <button
                onClick={handleSwitchAlternative}
                className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <RefreshCw size={10} />
                <span>{t('switch_to_backup_video', lang)}</span>
              </button>
            </>
          )}
        </div>

        {/* Video troubleshooting help button */}
        <button
          onClick={() => {
            hapticSelection();
            setShowHelpBanner(!showHelpBanner);
          }}
          className="text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
        >
          <HelpCircle size={10} />
          <span>{t('video_help_btn', lang)}</span>
        </button>
      </div>

      {/* Expandable Troubleshooting Drawer */}
      {showHelpBanner && (
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/20 text-[11px] space-y-2 animate-in fade-in duration-200">
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white">
                Если видео не воспроизводится в Telegram:
              </p>
              <p className="text-slate-300 leading-relaxed text-[10px]">
                Некоторые авторы видео запрещают встроенный показ на сайтах (защита авторских прав). Чтобы посмотреть технику без ограничений:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={handleOpenDirectYoutube}
              className="p-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 font-semibold text-[10px] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Play size={11} className="fill-current text-red-400" />
                {t('open_in_youtube_btn', lang)}
              </span>
              <ChevronRight size={12} />
            </button>

            <button
              onClick={handleSearchYoutube}
              className="p-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-semibold text-[10px] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Search size={11} className="text-cyan-400" />
                {t('search_exercise_youtube', lang)}
              </span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
