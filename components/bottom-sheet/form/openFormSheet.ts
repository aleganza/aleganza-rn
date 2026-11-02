import { SheetManager } from "../manager";
import type { FormSheetOptions } from "./types";

export const openFormSheet = (options: FormSheetOptions) => {
  SheetManager.show("form-sheet", { ...options });
};

export const closeFormSheet = () => {
  SheetManager.hide("form-sheet");
};
