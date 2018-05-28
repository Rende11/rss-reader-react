import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';
import uuid from 'uuid/v1';

import Modal from './RssModal';


export default class FeedList extends Component {


  state = { isModalOpen: false, modalData: {}};

  handleShow = (data) => (e) => {
    e.preventDefault();
    this.setState({ isModalOpen: true, modalData: data });
  }

  handleClose = e => {
    this.setState({ isModalOpen: false });
  }

  renderFeedNews = (feed) => {
    return  (
      [<ListGroupItem href={feed.feedLink} active key={uuid()}>{feed.feedName}</ListGroupItem>]
        .concat(feed.news.map(newsItem => <ListGroupItem key={uuid()} href={newsItem.link}>{newsItem.title}
        <span className="pull-right">
          <Button onClick={this.handleShow(newsItem)} bsSize="xs" bsStyle="link">Show description</Button>
        </span>
      </ListGroupItem>)))
  }

  render() {
    return (
      <Col md={9} mdOffset={2}>
        <Modal data={this.state.modalData} isOpen={this.state.isModalOpen} handleClose={this.handleClose}/>
        {this.props.feeds.map(newsFeed => <ListGroup key={uuid()}>{this.renderFeedNews(newsFeed)}</ListGroup>)}
      </Col>
    );
  }
}
