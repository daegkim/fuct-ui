import type { PropsWithChildren } from 'react';
import { ToastProvider } from './toast';
import { ModalProvider } from './modal';

const FuctProvider = ({ children }: PropsWithChildren) => {
  return (
    <ModalProvider>
      <ToastProvider>{children}</ToastProvider>
    </ModalProvider>
  );
};

export default FuctProvider;
