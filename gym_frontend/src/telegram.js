import WebApp from '@twa-dev/sdk'

/**
 * Safe wrapper for Telegram WebApp SDK
 */
export const isTelegram = () => {
  return typeof window !== 'undefined' && Boolean(window.Telegram?.WebApp?.initData)
}

export const initTelegramApp = () => {
  try {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      WebApp.ready()
      WebApp.expand()
      
      // Enable closing confirmation to prevent accidental swipes
      WebApp.enableClosingConfirmation()
      
      // Set header color to match dark background
      if (WebApp.setHeaderColor) {
        WebApp.setHeaderColor('#0b0f19')
      }
      if (WebApp.setBackgroundColor) {
        WebApp.setBackgroundColor('#0b0f19')
      }
    }
  } catch (err) {
    console.warn('Telegram WebApp init error / running in standalone browser:', err)
  }
}

export const getTelegramUser = () => {
  try {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user) {
      return window.Telegram.WebApp.initDataUnsafe.user
    }
  } catch (e) {
    console.warn('Could not read Telegram user', e)
  }
  return {
    id: 123456789,
    first_name: 'Athlete',
    username: 'gym_hero',
  }
}

/**
 * Trigger native haptic feedback
 * @param {'light' | 'medium' | 'heavy' | 'rigid' | 'soft'} type 
 */
export const hapticImpact = (type = 'medium') => {
  try {
    if (WebApp.HapticFeedback?.impactOccurred) {
      WebApp.HapticFeedback.impactOccurred(type)
    } else if (navigator?.vibrate) {
      navigator.vibrate(type === 'heavy' ? 30 : 15)
    }
  } catch (err) {
    // Silently ignore in browser
  }
}

/**
 * Trigger native notification haptics
 * @param {'error' | 'success' | 'warning'} type 
 */
export const hapticNotification = (type = 'success') => {
  try {
    if (WebApp.HapticFeedback?.notificationOccurred) {
      WebApp.HapticFeedback.notificationOccurred(type)
    } else if (navigator?.vibrate) {
      navigator.vibrate(type === 'success' ? [20, 50, 20] : 40)
    }
  } catch (err) {
    // Silently ignore in browser
  }
}

/**
 * Trigger native selection changed haptic (light tick)
 */
export const hapticSelection = () => {
  try {
    if (WebApp.HapticFeedback?.selectionChanged) {
      WebApp.HapticFeedback.selectionChanged()
    }
  } catch (err) {
    // Silently ignore in browser
  }
}
