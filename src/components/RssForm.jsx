import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import FeedList from './FeedList';

export default class RssForm extends Component {

  state = { rssLink: '' };

  handleOnChange = (e) => {
    const value = e.target.value;
    this.setState({ rssLink: value });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.rssLink);
    this.setState({ rssLink: '' })
  }

  render() {
    return  <Jumbotron>
      <h1> Hello RSS </h1>
      <form onSubmit={this.handleOnSubmit}>
        <input type="text" name="rssLink" onChange={this.handleOnChange} placeholder="input link with rss" value={this.state.rssLink}/>
        <input type="submit" value="submit" />
      </form>
    </Jumbotron>
  }
}
