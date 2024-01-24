import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, modalData }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  });

  return createPortal(
    <div onClick={closeModal} className="Overlay">
      <div className="Modal">
        <span onClick={close} className="Close">
          X
        </span>
        <img src={modalData.largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
