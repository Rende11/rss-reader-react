import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap';
import uuid from 'uuid/v1';

import Modal from './RssModal';

export default class FeedList extends Component {

  handleShow = (data) => (e) => {
    e.preventDefault();
    this.props.openModal(data);
  }

  renderFeedNews = (feed) => {
    return  (
      [<ListGroupItem href={feed.feedLink} active key={uuid()}>{feed.feedName}</ListGroupItem>]
      .concat(feed.news.map(newsItem => <ListGroupItem key={uuid()} href={newsItem.link}>{newsItem.title}
      <span className="pull-right"><Button onClick={this.handleShow(newsItem)} bsSize="xs" bsStyle="link">Show description</Button></span></ListGroupItem>))
    )
  }

  render() {
    return (
      <Col md={8} mdOffset={2}>
        {this.props.feeds.map(newsFeed => <ListGroup key={uuid()}>{this.renderFeedNews(newsFeed)}</ListGroup>)}
      </Col>
    );
  }
}
