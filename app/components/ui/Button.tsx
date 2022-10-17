import React from "react";
import clsx from "clsx";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  title?: string;
  theme: "primary" | "secondary" | "tertiary";
  size: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  title,
  theme,
  size,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx("transition-c rounded px-3 py-1 font-black", {
        "text-xs": size === "small",
        "text-sm": size === "medium",
        "text-lg": size === "large",
        "bg-slate-200 text-slate-900 hover:bg-slate-300": theme === "primary",
        "bg-amber-200 text-amber-900 hover:bg-amber-300": theme === "secondary",
        "bg-indigo-200 text-indigo-900 hover:bg-indigo-300":
          theme === "tertiary",
      })}
    >
      {children ? children : title}
    </button>
  );
};

export default Button;
