import React, {
  forwardRef,
  type KeyboardEventHandler,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import cn from "classnames";
import css from "./Button.module.scss";

interface ButtonProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<ButtonHTMLAttributes<HTMLDivElement>, "disabled"> {}

export const Button = forwardRef<HTMLDivElement, ButtonProps>(
  (
    {
      children,
      onClick,
      onKeyDown,
      className,
      tabIndex,
      role,
      disabled,
      ...other
    },
    ref,
  ) => {
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
      onKeyDown?.(e);
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <div
        {...other}
        ref={ref}
        role={role ?? "button"}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : (tabIndex ?? 0)}
        className={cn(css.sberButton, className, {
          [css.disabled]: disabled,
        })}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    );
  },
);

Button.displayName = "Button";
