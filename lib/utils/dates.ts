// 3 giorni fa
// 8 ore fa
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) return "Adesso";

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 5) return "adesso";
  if (seconds < 60) return `${seconds} secondi fa`;

  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return "1 minuto fa";
  if (minutes < 60) return `${minutes} minuti fa`;

  const hours = Math.floor(minutes / 60);
  if (hours === 1) return "1 ora fa";
  if (hours < 24) return `${hours} ore fa`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "1 giorno fa";
  if (days < 7) return `${days} giorni fa`;

  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 settimana fa";
  if (weeks < 4) return `${weeks} settimane fa`;

  const months = Math.floor(days / 30);
  if (months === 1) return "1 mese fa";
  if (months < 12) return `${months} mesi fa`;

  const years = Math.floor(days / 365);
  if (years === 1) return "1 anno fa";
  return `${years} anni fa`;
}


// "5 dicembre 2025"
export function formatDate(start_date: string): string {
  const date = new Date(start_date);

  if (isNaN(date.getTime())) {
    return "Data sconosciuta";
  }

  const dataFormatted = date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dateFinal =
    dataFormatted.charAt(0).toUpperCase() + dataFormatted.slice(1);

  return `${dateFinal}`;
}

// "oggi alle 14:30"
export function formatDateTime(start_date: string): string {
  const date = new Date(start_date);

  if (isNaN(date.getTime())) {
    return "Data sconosciuta";
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );

  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  let dayString: string;

  if (target.getTime() === today.getTime()) {
    dayString = "oggi";
  } else if (target.getTime() === tomorrow.getTime()) {
    dayString = "domani";
  } else {
    dayString = date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
    });
    dayString = dayString.charAt(0).toUpperCase() + dayString.slice(1);
  }

  const timeString = date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dayString} alle ${timeString}`;
}

// "5 dic · 09:30 - 11:15"
export const formatDateTimeComplete = (start: Date, end: Date) => {
  const day = start.getDate();
  const month = start.toLocaleString("it-IT", { month: "short" });
  const startHour = start.getHours().toString().padStart(2, "0");
  const startMin = start.getMinutes().toString().padStart(2, "0");
  const endHour = end.getHours().toString().padStart(2, "0");
  const endMin = end.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} · ${startHour}:${startMin} - ${endHour}:${endMin}`;
};
