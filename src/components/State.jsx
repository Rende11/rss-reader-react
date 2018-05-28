import React, { Component } from 'react';
import _ from 'lodash';

import FeedList from './FeedList';
import RssForm from './RssForm';

export default class State extends Component {

  state = { rssData: [] };

  proxy = 'https://cors-anywhere.herokuapp.com';

  handleOnSubmit = (data) => {
    const rssData = [data, ...this.state.rssData];
    this.setState({ rssData });
  }

  handleUpdate = (newData) => {
    const oldRssData = [ ...this.state.rssData ];
    newData.forEach(newFeedData => {
      const oldFeed = _.find(oldRssData, oldRssItem => oldRssItem.rssLink === newFeedData.rssLink);
      oldFeed.news = [...newFeedData.news, ...oldFeed.news];
    });
    this.setState({ rssData: oldRssData });
  }


  render() {
    return <div>
      <RssForm onSubmit={this.handleOnSubmit} feeds={this.state.rssData} handleUpdate={this.handleUpdate}/>
      <FeedList feeds={this.state.rssData}/>
    </div>
  }

}
