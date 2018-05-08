import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class FeedList extends Component {

  render() {
    return (
      <ListGroup>
        {this.props.links.map(link => <ListGroupItem>{link}</ListGroupItem>)}
      </ListGroup>);
  }
}
