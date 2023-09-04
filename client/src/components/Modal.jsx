import React from "react";
import { createPortal } from "react-dom";
const Modal = ({ children ,closeModal}) => {
  const modalRoot = document.getElementById("modal-root");
  return createPortal(
    <>
      <div className="fixed w-screen h-screen bg-slate-900/60 z-10" onClick={closeModal}>{children}</div>
    </>,

    modalRoot
  );
};

export default Modal;
