import { type FC, type HTMLAttributes } from "react";
import cn from "classnames";
import { List } from "react-window";
import { useSelect } from "./useSelect";
import type { Option } from "./types";
import css from "./Select.module.scss";
import { RowComponent } from "./RowComponent.tsx";

interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: (value: Option) => void;
  options: Option[];
  placeholder?: string;
}

export const Select: FC<SelectProps> = ({
  options,
  onSelect,
  placeholder = "Select",
}) => {
  const {
    filter,
    isOpen,
    highlight,
    ref,
    inputRef,
    filtered,
    dropUp,
    selectedOption,
    open,
    close,
    handleKeyDown,
    setFilter,
    selectOption,
    clearSelection,
  } = useSelect({ options, onSelect });

  const displayValue = selectedOption?.name ?? filter ?? "";

  return (
    <div
      ref={ref}
      className={cn(css.sberSelect, { [css.open]: isOpen })}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls="select-list"
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) close();
      }}
    >
      <div className={css.inputWrapper} onClick={open}>
        <input
          ref={inputRef}
          name={"select-input"}
          className={css.input}
          value={displayValue}
          onChange={(e) => {
            if (selectedOption) {
              clearSelection();
            }
            open();
            setFilter(e.target.value);
          }}
          placeholder={placeholder}
          aria-autocomplete="list"
        />
        {selectedOption && (
          <span
            className={cn(css.clear, css.actionBtn)}
            onClick={(e) => {
              e.stopPropagation();
              clearSelection();
            }}
          >
            ×
          </span>
        )}
        <span
          className={cn(css.arrow, css.actionBtn)}
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div
          role="listbox"
          className={cn(css.options, { [css.dropUp]: dropUp })}
        >
          {filtered.length === 0 ? (
            <div className={cn(css.option, css.empty)}>Нет опций</div>
          ) : (
            <List
              rowComponent={RowComponent}
              rowCount={filtered.length}
              rowHeight={34}
              rowProps={{
                options: filtered,
                highlight,
                selectedOption,
                selectOption,
              }}
              style={{ overflowX: "hidden" }}
            />
          )}
        </div>
      )}
    </div>
  );
};
