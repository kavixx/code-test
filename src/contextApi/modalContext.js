import React, { useState } from 'react';

const ModalContext = React.createContext();
export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);

  const openModal = id => {
    setIsOpen(true);
    setId(id);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <ModalContext.Provider value={{ isOpen, id, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
export default ModalContext;
