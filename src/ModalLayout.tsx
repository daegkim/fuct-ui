import { PropsWithChildren } from 'react';
import { useModalComponent } from './lib/components/modal';
import { DefaultModalComponentProps } from './lib/components/modal/types';

const ModalLayout = ({ children, uuid }: PropsWithChildren<DefaultModalComponentProps>) => {
  const { closeModal } = useModalComponent<{ name: string }>();
  return (
    <div>
      <div>{uuid}</div>
      <>{children}</>
      <button
        onClick={() => {
          uuid && closeModal(uuid, { name: 'ferde' });
        }}
      >
        close
      </button>
    </div>
  );
};

export default ModalLayout;
