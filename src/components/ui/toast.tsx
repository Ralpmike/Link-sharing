// components/ui/toast.tsx
"use client";

import { toast as sonnerToast } from "sonner";
import { CustomToast } from "../custom/CustomToast";

type Variant = "success" | "error" | "info" | "warning";

interface ToastOptions {
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
  variant?: Variant;
}

export function toast({
  title,
  description,
  button,
  variant = "info",
}: ToastOptions) {
  return sonnerToast.custom((id) => (
    <CustomToast
      id={id}
      title={title}
      description={description}
      button={button}
      variant={variant}
    />
  ));
}
