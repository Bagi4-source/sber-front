import React, { useState, useRef, useEffect } from "react";
import css from "./Select.module.scss";

interface Option {
  name: string;
  value: string;
}

interface Props {
  options: Option[];
  onSelect: (value: string) => void;
}

export const Select: React.FC<Props> = ({ options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter((o) => o.name.startsWith(filter));
  const selected = filtered[highlight];

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown")
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    if (e.key === "ArrowUp") setHighlight((h) => Math.max(h - 1, 0));
    if (e.key === "Enter" && selected) {
      onSelect(selected.value);
      setOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      className={css.sberSelect}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`select-input ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Введите..."
        />
        {filter && (
          <span className="clear" onClick={() => setFilter("")}>
            ×
          </span>
        )}
        <span className="arrow">▼</span>
      </div>
      {open && (
        <div className="options">
          {filtered.length === 0 && (
            <div className="option empty">Нет опций</div>
          )}
          {filtered.map((opt, i) => (
            <div
              key={opt.value}
              className={`option ${i === highlight ? "highlighted" : ""}`}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
