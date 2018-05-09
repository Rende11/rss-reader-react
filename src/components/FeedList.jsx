import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import uuid from 'uuid/v1';

export default class FeedList extends Component {

  render() {
    return (
      <Col md={8} mdOffset={2}>
        <ListGroup>
          {this.props.links.map(link => <ListGroupItem key={uuid()} href="#">{link}</ListGroupItem>)}
        </ListGroup>
      </Col>);
  }
}
