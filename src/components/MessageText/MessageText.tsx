import css from "./MessageText.module.scss";
import type { PropsWithChildren } from "react";

export const MessageText = ({ children }: PropsWithChildren) => {
  return <div className={css.messageText}>{children}</div>;
};
