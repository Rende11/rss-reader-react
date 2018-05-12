import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


export default class RssModal extends Component {


  render() {
    return (
      <Modal show={this.props.isOpen}>
        <Modal.Header onClick={this.props.close} closeButton>
          <Modal.Title>{this.props.data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.data.body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
