type LogLevel = "debug" | "info" | "warn" | "error";

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

let currentLevel: LogLevel = "debug";

function formatMessage(level: LogLevel, message: any) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

function log(level: LogLevel, message: any) {
  if (LEVELS[level] < LEVELS[currentLevel]) return;

  const formattedMessage = formatMessage(level, message);

  switch (level) {
    case "debug":
      console.debug(formattedMessage);
      break;
    case "info":
      console.info(formattedMessage);
      break;
    case "warn":
      console.warn(formattedMessage);
      break;
    case "error":
      console.error(formattedMessage);
      break;
  }
}

export const Logger = {
  setLevel: (level: LogLevel) => {
    if (LEVELS[level] !== undefined) currentLevel = level;
  },
  debug: (msg: any) => log("debug", msg),
  info: (msg: any) => log("info", msg),
  warn: (msg: any) => log("warn", msg),
  error: (msg: any) => log("error", msg),
};
