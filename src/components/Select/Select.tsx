import { forwardRef, type HTMLAttributes } from "react";
import cn from "classnames";
import { List } from "react-window";
import { useSelect } from "./useSelect";
import type { Option } from "./types";
import css from "./Select.module.scss";
import { RowComponent } from "./RowComponent.tsx";

interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: (value: Option) => void;
  options: Option[];
  initialValue?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, initialValue, onSelect, placeholder = "Введите..." }) => {
    const {
      filter,
      isOpen,
      highlight,
      ref,
      value,
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
    } = useSelect({ options, initialValue, onSelect });

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
            className={css.input}
            value={isOpen ? filter : filter || selectedOption?.name}
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
              className={css.clear}
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
            >
              ×
            </span>
          )}
          <span className={css.arrow}>▼</span>
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
                  value,
                  selectOption,
                }}
                style={{ overflowX: "hidden" }}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
