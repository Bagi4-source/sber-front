import {
  useState,
  useRef,
  useEffect,
  type KeyboardEventHandler,
  useMemo,
  useCallback,
  type FocusEventHandler,
} from "react";
import type { Option, UseSelectProps, UseSelectReturn } from "./types";

export function useSelect({
  options,
  onSelect,
  value,
  listRef,
}: UseSelectProps): UseSelectReturn {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    value ?? null,
  );
  const [isOpen, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [filter, setFilter] = useState("");
  const [highlight, setHighlight] = useState(-1);

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uniqueOptions = useMemo(() => {
    const usedValues = new Set<string>();
    return options.filter((o) => {
      const exist = usedValues.has(o.value);
      usedValues.add(o.value);
      return !exist;
    });
  }, [options]);

  const filtered = useMemo(
    () =>
      uniqueOptions.filter((o) =>
        o.name.toLowerCase().startsWith(filter.toLowerCase()),
      ),
    [filter, uniqueOptions],
  );

  const scrollTo = useCallback(
    (index: number) => {
      if (index < 0) return;
      listRef?.scrollToRow({
        behavior: "smooth",
        index,
      });
    },
    [listRef],
  );

  const open = useCallback(() => {
    setOpen(true);
    scrollTo(highlight);
  }, [highlight, scrollTo]);
  const close = () => setOpen(false);

  const clearSelection = useCallback(() => {
    onSelect?.(null);
    setSelectedOption(null);
    setHighlight(-1);
    setFilter("");
  }, [onSelect]);

  const selectOption = useCallback(
    (option: Option) => {
      const index = filtered.indexOf(option);
      setFilter("");
      setHighlight(index);
      setSelectedOption(option);
      onSelect?.(option);
      setOpen(false);
      inputRef.current?.focus();
    },
    [filtered, onSelect],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " ") {
          open();
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlight((h) => Math.min(h + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlight((h) => Math.max(h - 1, 0));
          break;
        case "Home":
          e.preventDefault();
          setHighlight(0);
          break;
        case "End":
          e.preventDefault();
          setHighlight(filtered.length - 1);
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[highlight]) {
            selectOption(filtered[highlight]);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    },
    [filtered, highlight, isOpen, open, selectOption],
  );

  const onBlur: FocusEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!ref.current?.contains(e.relatedTarget)) close();
  }, []);

  useEffect(() => {
    setSelectedOption(value ?? null);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    scrollTo(highlight);
  }, [highlight, scrollTo]);

  useEffect(() => {
    if (!isOpen || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDropUp(rect.bottom + 250 > window.innerHeight);
  }, [isOpen]);

  return {
    isOpen,
    filter,
    highlight,
    ref,
    inputRef,
    filtered,
    dropUp,
    selectedOption,
    handleKeyDown,
    onBlur,
    open,
    close,
    setFilter,
    setHighlight,
    selectOption,
    clearSelection,
  };
}
