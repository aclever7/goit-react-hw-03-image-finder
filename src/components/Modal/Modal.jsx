import { createPortal } from 'react-dom';
import { Component } from 'react';
import { OverlayDiv, ModalDiv } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.showModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.showModal();
    }
  };

  render() {
    return createPortal(
      <OverlayDiv onClick={this.handleBackdropClick}>
        <ModalDiv>{this.props.children}</ModalDiv>
      </OverlayDiv>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  showModal: PropTypes.func.isRequired,
};
