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

// class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       this.props.close();
//     }
//   };

//   render() {
//     const { modalData, close } = this.props;

//     return createPortal(
//       <div onClick={this.closeModal} className="Overlay">
//         <div className="Modal">
//           <span onClick={close} className="Close">
//             X
//           </span>
//           <img src={modalData.largeImageURL} alt="" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

export default Modal;
