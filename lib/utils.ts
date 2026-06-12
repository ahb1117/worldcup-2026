const KSA_TZ = 'Asia/Riyadh';

export function formatKSADateShort(utcString: string): string {
  return new Date(utcString).toLocaleDateString('en-SA', {
    timeZone: KSA_TZ,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatKSADate(utcString: string): string {
  return new Date(utcString).toLocaleDateString('en-SA', {
    timeZone: KSA_TZ,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatKSATime(utcString: string): string {
  return new Date(utcString).toLocaleTimeString('en-SA', {
    timeZone: KSA_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatKSADateTime(utcString: string): string {
  return new Date(utcString).toLocaleString('en-SA', {
    timeZone: KSA_TZ,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function getCurrentKSATime(): string {
  return new Date().toLocaleTimeString('en-SA', {
    timeZone: KSA_TZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export function getCountdown(utcString: string, now: Date): { days: number; hours: number; minutes: number; seconds: number } | null {
  const diff = new Date(utcString).getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
