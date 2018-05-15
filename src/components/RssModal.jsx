import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class RssModal extends Component {


  render() {
    return (
      <Modal show={this.props.isOpen}>
        <Modal.Header onClick={this.props.handleClose} closeButton>
          <Modal.Title>{this.props.data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.data.desc}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
