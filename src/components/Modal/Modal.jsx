import { Component } from 'react'
import { createPortal } from 'react-dom';

import { Overlay, ImageModal } from './ModalStyled';

import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal)
  }

  closeModal = ({target, currentTarget, code}) => {
    if (target === currentTarget || code === "Escape") {
        this.props.onClose();
    }
  }

  render() {
    const { closeModal } = this;
    const { tags, largeImageURL } = this.props;
    return createPortal(
        <Overlay onClick={closeModal}>
            <ImageModal>
                <img src={largeImageURL} alt={tags} />
            </ImageModal>
        </Overlay>,
      modalRoot
    )
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}