import { createPortal } from 'react-dom';

import { Overlay, ImageModal } from './ModalStyled';

import PropTypes from "prop-types";
import { useEffect } from 'react';
import { useCallback } from 'react';

const modalRoot = document.getElementById("modal-root");

export default function Modal({onClose, tags, largeImageURL}) {

  const closeModal = useCallback(({target, currentTarget, code}) => {
    if (target === currentTarget || code === "Escape") {
        onClose();
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal)
    }
  }, [closeModal])

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