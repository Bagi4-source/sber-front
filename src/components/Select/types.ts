import type {
  Dispatch,
  FocusEventHandler,
  KeyboardEventHandler,
  RefObject,
  SetStateAction,
} from "react";
import type { ListImperativeAPI } from "react-window";

export interface Option {
  name: string;
  value: string;
}

export interface UseSelectProps {
  options: Option[];
  listRef: ListImperativeAPI | null;
  value?: Option | null;
  onSelect?: (option: Option | null) => void;
}

export interface UseSelectReturn {
  isOpen: boolean;
  filter: string;
  highlight: number;
  value?: string;
  onBlur: FocusEventHandler<HTMLDivElement>;
  handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
  ref: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  selectedOption: Option | null;
  filtered: Option[];
  dropUp: boolean;
  open: () => void;
  close: () => void;
  setFilter: Dispatch<SetStateAction<string>>;
  setHighlight: Dispatch<SetStateAction<number>>;
  selectOption: (option: Option) => void;
  clearSelection: () => void;
}
