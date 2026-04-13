import { ReactNode } from "react";
import { MyTestSheet } from "./sheets/TestSheet";

/**
 * insert here your Sheets so they can be used globally.
 * very important: children MUSt BE listed last!
 */
export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <MyTestSheet />

      {children}
    </>
  );
};
