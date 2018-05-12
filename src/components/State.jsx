import React, { Component } from 'react';

import FeedList from './FeedList';
import RssForm from './RssForm';
import Modal from './RssModal';

export default class State extends Component {

  state = { rssData: [], isModalOpen: false };

  handleOnSubmit = (data) => {
    const rssData = [data, ...this.state.rssData];
    this.setState({ rssData });
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }
  render() {
    return <div>
      <RssForm onSubmit={this.handleOnSubmit}/>
      <Modal isOpen={this.state.isModalOpen} close={this.closeModal}/>
      <FeedList feeds={this.state.rssData} openModal={this.openModal}/>
    </div>
  }

}
