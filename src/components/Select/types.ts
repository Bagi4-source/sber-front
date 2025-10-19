import type {
  Dispatch,
  KeyboardEventHandler,
  RefObject,
  SetStateAction,
} from "react";

export interface Option {
  name: string;
  value: string;
}

export interface UseSelectProps {
  options: Option[];
  initialValue?: string;
  onSelect?: (option: Option) => void;
}

export interface UseSelectReturn {
  isOpen: boolean;
  filter: string;
  highlight: number;
  value?: string;
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
