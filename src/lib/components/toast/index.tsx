import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ToastContextProps, ToastHookContextProps } from './types';

const ToastHookContext = createContext<ToastHookContextProps>({
  setIsOpen: () => {},
  setMessage: () => {},
  setOptions: () => {},
  prevTimer: { current: -1 },
});

export const ToastContext = createContext<ToastContextProps>({
  isOpen: false,
  message: '',
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<any>();
  const prevTimer = useRef(-1);

  const hookValue = useMemo(() => ({ setIsOpen, setMessage, setOptions, prevTimer }), []);
  const value = useMemo(() => ({ isOpen, message, options }), [isOpen, message, options]);

  return (
    <ToastContext.Provider value={value}>
      <ToastHookContext.Provider value={hookValue}>{children}</ToastHookContext.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = <T extends { duration?: number } = any>() => {
  const { setIsOpen, setMessage, setOptions, prevTimer } = useContext(ToastHookContext);

  const showToast = useCallback(
    (message: string, options?: T) => {
      const duration = options?.duration ?? 2000;

      if (prevTimer.current >= 0) {
        clearTimeout(prevTimer.current);
      }

      setIsOpen(true);
      setMessage(message);
      options && setOptions(options);

      prevTimer.current = window.setTimeout(() => {
        setIsOpen(false);
      }, duration);
    },
    [setIsOpen, setMessage]
  );

  return { showToast };
};

export const useToastComponent = <T,>() => {
  return useContext<ToastContextProps<T>>(ToastContext);
};
