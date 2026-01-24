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
