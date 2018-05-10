import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import uuid from 'uuid/v1';

export default class FeedList extends Component {


  renderFeedNews = (feed) => {
    return  (
      [<ListGroupItem href={feed.feedLink} active key={uuid()}>{feed.feedName}</ListGroupItem>]
        .concat(feed.news.map(newsItem => <ListGroupItem key={uuid()} href={newsItem.link}>{newsItem.title}</ListGroupItem>))
    )
  }

  render() {
    return (
      <Col md={8} mdOffset={2}>
        {this.props.feeds.map(newsFeed => <ListGroup key={uuid()}>{this.renderFeedNews(newsFeed)}</ListGroup>)}
      </Col>);
  }
}
