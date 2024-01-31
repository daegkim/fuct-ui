import type { PropsWithChildren } from 'react';
import { ToastProvider } from './toast';

const FuctProvider = ({ children }: PropsWithChildren) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default FuctProvider;
