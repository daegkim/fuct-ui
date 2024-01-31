import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

export interface ToastHookContextProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  prevTimer: MutableRefObject<number>;
}

export interface ToastContextProps {
  isOpen: boolean;
  message: string;
}
