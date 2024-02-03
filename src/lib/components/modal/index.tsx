import { produce } from 'immer';
import type { PropsWithChildren } from 'react';
import { cloneElement, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Modal, ModalContextProps, ModalHookContextProps } from './types';

const ModalHookContext = createContext<ModalHookContextProps>({
  openModal: () => new Promise(() => {}),
});

const ModalContext = createContext<ModalContextProps>({
  closeModal: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = useCallback((component: JSX.Element) => {
    return new Promise<any>((resolve) => {
      setModals(
        produce((draft) => {
          draft.push({ uuid: uuidv4(), resolve, component });
        })
      );
    });
  }, []);

  const closeModal = useCallback(<T,>(uuid: string, returnData: T) => {
    setModals(
      produce((draft) => {
        const targetModalIndex = draft.findIndex((modal) => modal.uuid === uuid);

        if (targetModalIndex < 0) {
          return;
        }
        draft[targetModalIndex].resolve(returnData);
        draft.splice(targetModalIndex, 1);
      })
    );
  }, []);

  const hookValue = useMemo(() => ({ openModal }), [openModal]);
  const value = useMemo(() => ({ closeModal }), [closeModal]);

  return (
    <ModalContext.Provider value={value}>
      <ModalHookContext.Provider value={hookValue}>
        <>{children}</>
        <div id="fuct-modal-area">
          {modals.map((modal) => (
            <div key={modal.uuid}>{cloneElement(modal.component, { key: modal.uuid, uuid: modal.uuid })}</div>
          ))}
        </div>
      </ModalHookContext.Provider>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { openModal } = useContext(ModalHookContext);
  return { openModal };
};

export const useModalComponent = <T = any,>() => {
  return useContext<ModalContextProps<T>>(ModalContext);
};
