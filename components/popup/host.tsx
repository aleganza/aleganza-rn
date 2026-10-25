import React from "react";

import { useTheme } from "@/lib/theme/useTheme";
import { Txt } from "../ui/texts";
import { BasePopup } from "./base-popup";
import { usePopupStore } from "./store";

export const PopupHost: React.FC = () => {
  const { theme } = useTheme();
  const current = usePopupStore((state) => state.current);
  const close = usePopupStore((state) => state.close);

  if (!current) return null;

  return (
    <BasePopup
      visible
      title={current.title}
      confirmText={current.confirmText}
      cancelText={current.cancelText}
      destructive={current.destructive}
      showCancel={current.type === "confirm"}
      dismissOnBackdrop={current.dismissOnBackdrop}
      onConfirm={() => close(true)}
      onCancel={() => close(false)}
    >
      {current.message ? (
        <Txt
          style={{
            textAlign: "center",
            color: theme.colors.textSupporting,
          }}
        >
          {current.message}
        </Txt>
      ) : undefined}
    </BasePopup>
  );
};
