// components/ui/CustomToast.tsx
import { XCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { toast as sonnerToast } from "sonner";
import React from "react";
import clsx from "clsx";

export interface CustomToastProps {
  id: string | number;
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
  variant?: "success" | "error" | "info" | "warning" | "default";
}

export const CustomToast: React.FC<CustomToastProps> = ({
  id,
  title,
  description,
  button,
  variant = "default",
}) => {
  const variantMap = {
    default: {
      icon: <Info className="text-gray-600 w-5 h-5" />,
      bg: "bg-gray-50",
      text: "text-gray-700",
    },
    success: {
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      bg: "bg-green-50",
      text: "text-green-700",
    },
    error: {
      icon: <XCircle className="text-red-600 w-5 h-5" />,
      bg: "bg-red-50",
      text: "text-red-700",
    },
    info: {
      icon: <Info className="text-blue-600 w-5 h-5" />,
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    warning: {
      icon: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
  };

  const { icon, bg, text } = variantMap[variant];

  return (
    <div
      className={clsx(
        "w-full max-w-sm p-4 rounded-lg shadow-lg flex items-start gap-3",
        bg
      )}
    >
      <div className="shrink-0 mt-1">{icon}</div>
      <div className="flex flex-col flex-1">
        <p className={clsx("text-sm font-medium", text)}>{title}</p>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
        {button && (
          <button
            className="mt-2 self-start text-sm font-medium text-indigo-600 hover:underline"
            onClick={() => {
              button.onClick?.();
              sonnerToast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        )}
      </div>
    </div>
  );
};
