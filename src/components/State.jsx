import React, { Component } from 'react';

import FeedList from './FeedList';
import RssForm from './RssForm';

export default class State extends Component {

  state = { rssData: [] };

  handleOnSubmit = (data) => {
    const rssData = [data, ...this.state.rssData];
    this.setState({ rssData });
  }

  render() {
    return <div>
      <RssForm onSubmit={this.handleOnSubmit}/>
      <FeedList feeds={this.state.rssData}/>
    </div>

  }

}
