import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

export interface ToastHookContextProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setOptions: Dispatch<SetStateAction<any>>;
  prevTimer: MutableRefObject<number>;
}

export interface ToastContextProps<T = any> {
  isOpen: boolean;
  message: string;
  options?: T;
}

export interface FuctToastOption {
  duration?: number;
  position?: 'top' | 'bottom';
  color?: 'blue' | 'green' | 'red';
}
