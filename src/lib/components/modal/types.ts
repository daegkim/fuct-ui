export interface Modal {
  uuid: string;
  resolve: (value?: any) => void;
  component: JSX.Element;
}

export interface ModalHookContextProps {
  openModal: <T = any>(component: JSX.Element) => Promise<T>;
}

export interface ModalContextProps<T = any> {
  closeModal: (uuid: string, returnData: T) => void;
}

export interface DefaultModalComponentProps {
  uuid?: string;
  index?: number;
}
