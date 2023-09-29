import React from "react";
import {ModalOverlay, ModalContent, ModalTitle, ModalButtons, ModalButton} from "../styles/Common/Modal";

const Modal = ({ title, message, onCancel, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <p>{message}</p>
        <ModalButtons>
          <ModalButton onClick={onCancel}>Cancel</ModalButton>
          <ModalButton onClick={onConfirm}>Confirm</ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
