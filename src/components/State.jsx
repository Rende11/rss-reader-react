import React, { Component } from 'react';

import FeedList from './FeedList';
import RssForm from './RssForm';

export default class State extends Component {

  state = { linksList: [] };

  handleOnSubmit = (value) => {
    const linksList = [value, ...this.state.linksList];
    this.setState({ linksList });
    console.log(this.state);
  }

  render() {
    return <div>
      <RssForm onSubmit={this.handleOnSubmit}/>
      <FeedList links={this.state.linksList}/>
    </div>

  }

}
