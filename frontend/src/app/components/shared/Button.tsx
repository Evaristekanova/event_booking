import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
  text?: string;
  className?: string;
  disabled?: boolean;
}

function Button({
  onClick,
  children,
  text,
  className,
  disabled,
  type,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 flex gap-1 items-center ${className} bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300`}
    >
      {children}
      {text}
    </button>
  );
}

export default Button;
