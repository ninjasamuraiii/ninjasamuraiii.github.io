
export const tg = (window as any).Telegram?.WebApp;

export const hapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' | 'success' | 'warning' | 'error' = 'light') => {
  if (tg?.HapticFeedback) {
    if (['success', 'warning', 'error'].includes(type)) {
      tg.HapticFeedback.notificationOccurred(type);
    } else {
      tg.HapticFeedback.impactOccurred(type);
    }
  }
};

export const expandWebApp = () => {
    if (tg) {
        tg.expand();
        tg.ready();
    }
};
