import { type RowComponentProps } from "react-window";
import cn from "classnames";
import css from "./Select.module.scss";
import type {
  UseSelectProps,
  UseSelectReturn,
} from "src/components/Select/types.ts";

export function RowComponent({
  index,
  options,
  highlight,
  selectedOption,
  selectOption,
  style,
}: RowComponentProps<
  Pick<UseSelectProps, "options"> &
    Pick<UseSelectReturn, "selectOption" | "highlight" | "selectedOption">
>) {
  const option = options[index];
  return (
    <div
      key={option.value}
      style={style}
      role="option"
      aria-selected={option.value === selectedOption?.value}
      className={cn(css.option, {
        [css.highlighted]: index === highlight,
        [css.selected]: option.value === selectedOption?.value,
      })}
      onClick={() => selectOption(option)}
    >
      {option.name}
    </div>
  );
}
