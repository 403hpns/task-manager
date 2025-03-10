import { PropsWithChildren, ReactNode, createContext, useState } from 'react';

type ModalContext = {
  isModalOpen: boolean;
  modalProps: ModalProps | null;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContext | null>(null);

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
}

function ModalProvider({ children }: PropsWithChildren) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const openModal = (props: ModalProps) => {
    setModalProps(props);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalProps(null);
  };

  const contextValue = {
    isModalOpen,
    modalProps,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
