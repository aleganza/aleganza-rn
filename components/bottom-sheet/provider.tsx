import { ReactNode } from "react";

import { FormSheet } from "./form/form-sheet";
import { ShowcaseSheet } from "./sheets/showcase-sheet";
import { MyTestSheet } from "./sheets/TestSheet";

/**
 * Insert your sheets here so they can be used globally.
 * Children are rendered first so the sheets paint above the app content.
 */
export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}

      <MyTestSheet />
      <ShowcaseSheet />
      <FormSheet />
    </>
  );
};
