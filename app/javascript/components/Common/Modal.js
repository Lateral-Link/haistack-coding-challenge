import React from "react";
import { ModalOverlay, ModalContent, ModalTitle, ModalButtons, ModalButton } from "../styles/Common/Modal";

const Modal = ({ title, message, onCancel, onConfirm }) => {
  const hasCancel = typeof onCancel === 'function';

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <p>{message}</p>
        <ModalButtons hasCancel={hasCancel}>
          {hasCancel && <ModalButton onClick={onCancel}>Cancel</ModalButton>}
          <ModalButton onClick={onConfirm}>Confirm</ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
