import { SheetManager } from "react-native-actions-sheet";
import { FormDrawerOptions } from "./types";

export const openFormDrawer = (options: FormDrawerOptions) => {
  SheetManager.show("form-drawer", { payload: options });
};

export const closeFormDrawer = () => {
  SheetManager.hide("form-drawer");
};
