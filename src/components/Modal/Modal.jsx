import { createPortal } from 'react-dom';

import { Overlay, ImageModal } from './ModalStyled';

import PropTypes from "prop-types";
import { useEffect } from 'react';

const modalRoot = document.getElementById("modal-root");

export default function Modal({onClose, tags, largeImageURL}) {

  useEffect(() => {
    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal)
    }
  }, [])

  const closeModal = ({target, currentTarget, code}) => {
    if (target === currentTarget || code === "Escape") {
        onClose();
    }
  }

  return (
    createPortal(
      <Overlay onClick={closeModal}>
          <ImageModal>
              <img src={largeImageURL} alt={tags} />
          </ImageModal>
      </Overlay>,
    modalRoot
    )
  )
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}