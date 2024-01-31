import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ToastContextProps, ToastHookContextProps } from './types';

const ToastHookContext = createContext<ToastHookContextProps>({
  setIsOpen: () => {},
  setMessage: () => {},
  prevTimer: { current: -1 },
});

export const ToastContext = createContext<ToastContextProps>({
  isOpen: false,
  message: '',
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const prevTimer = useRef(-1);

  const hookValue = useMemo(() => ({ setIsOpen, setMessage, prevTimer }), [setIsOpen, setMessage, prevTimer]);
  const value = useMemo(() => ({ isOpen, message }), [isOpen, message]);

  return (
    <ToastContext.Provider value={value}>
      <ToastHookContext.Provider value={hookValue}>{children}</ToastHookContext.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { setIsOpen, setMessage, prevTimer } = useContext(ToastHookContext);

  const showToast = useCallback(
    (message: string) => {
      if (prevTimer.current >= 0) {
        clearTimeout(prevTimer.current);
      }

      setIsOpen(true);
      setMessage(message);

      prevTimer.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    },
    [setIsOpen, setMessage]
  );

  return { showToast };
};
