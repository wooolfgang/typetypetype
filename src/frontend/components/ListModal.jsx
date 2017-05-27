import React from 'react';
import Modal from './Modal';

class ListModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal modalOpen={modalOpen} closeModal={toggleModal} width={'100vh'} height={'80vh'}>
        <span> Hello </span>
        <span> Hello </span>
        <span> Hello </span>
      </Modal>
    );
  }
}

export default ListModal;