import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useModalComponent } from '.';
import Backdrop from '../backdrop';
import { DefaultModalComponentProps } from './types';

const FuctConfirm = ({ children, uuid, index }: PropsWithChildren<DefaultModalComponentProps>) => {
  const { closeModal } = useModalComponent<boolean>();

  return (
    <Backdrop>
      <ModalWrapper $index={index}>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              uuid && closeModal(uuid, true);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              uuid && closeModal(uuid, false);
            }}
          >
            CANCEL
          </button>
        </ModalFooter>
      </ModalWrapper>
    </Backdrop>
  );
};

const ModalWrapper = styled.div<{ $index?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + ${({ $index }) => ($index ?? 0) * 10}px), calc(-50% - ${({ $index }) => ($index ?? 0) * 10}px));

  background-color: #fff;
  padding: 16px 8px 8px 8px;
`;

const ModalBody = styled.div`
  background-color: #fff;
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 4px;
  justify-content: right;

  background-color: #fff;
`;

export default FuctConfirm;
