import React from "react";
import css from "./Button.module.scss";

interface Props {
  text: string;
  onClick: () => void;
}

export const Button: React.FC<Props> = ({ text, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") onClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={css.sberButton}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {text}
    </div>
  );
};
