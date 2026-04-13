import { toaster } from "../toaster/toaster";

type ErrorHandlerOptions = {
  context?: string;
};

/**
 * Handles errors, logs them, and shows a toast message.
 */

export const handleError = (error: unknown, options?: ErrorHandlerOptions) => {
  console.error("Error:", error, options?.context ?? "");

  if (typeof error === "string") {
    toaster.error(error);
  } else if (error instanceof Error) {
    toaster.error(error.message);
  } else {
    toaster.error("Si è verificato un errore imprevisto.");
  }
};
