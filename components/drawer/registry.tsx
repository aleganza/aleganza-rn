import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

import { FormDrawer } from "./form-drawer/form-drawer";
import { FormDrawerOptions } from "./form-drawer/types";

registerSheet("form-drawer", FormDrawer);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "form-drawer": SheetDefinition<{ payload: FormDrawerOptions }>;
  }
}

export { FormDrawer };
