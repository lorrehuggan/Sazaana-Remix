import React from "react";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/solid/";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  title?: string;
  theme: "primary" | "secondary" | "tertiary" | "primary-outline";
  size: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  state?: "idle" | "loading" | "success" | "error" | "submitting";
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  title,
  theme,
  size,
  type,
  state,
}) => {
  return (
    <button
      aria-label="click to search artist"
      aria-hidden={state === "submitting"}
      disabled={state === "submitting" || state === "loading"}
      type={type}
      onClick={onClick}
      className={clsx("transition-c rounded-sm px-3 py-1 transition-opacity ", {
        "text-xs": size === "small",
        "text-sm": size === "medium",
        "text-lg": size === "large",
        "cursor-not-allowed opacity-50":
          state === "submitting" || state === "loading",
        "bg-zinc-300 text-zinc-900 hover:bg-zinc-500": theme === "primary",
        "border-[1px]  hover:border-emerald-500 hover:bg-emerald-500":
          theme === "primary-outline",
        "bg-amber-200 text-amber-900 hover:bg-amber-300": theme === "secondary",
        "bg-indigo-200 text-indigo-900 hover:bg-indigo-300":
          theme === "tertiary",
      })}
    >
      {state === "submitting" || state === "loading" ? (
        <ArrowPathIcon className="h-5 w-5 animate-spin" />
      ) : children ? (
        children
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
