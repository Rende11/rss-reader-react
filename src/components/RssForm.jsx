import React, { Component } from 'react';
import { Jumbotron, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import isURL from 'validator/lib/isURL';
import cn from 'classnames';
import axios from 'axios';

import FeedList from './FeedList';

export default class RssForm extends Component {

  state = { rssLink: '', formState: 'neutral' };

  proxy = 'https://cors-anywhere.herokuapp.com';

  handleOnChange = (e) => {
    const value = e.target.value;
    this.setState({ rssLink: value });
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();
    if (this.isValidInput()) {
      const value = this.state.rssLink;
      this.setState({ rssLink: '', formState: 'valid' });
      const requestUrl = `${this.proxy}/${value}`;
      try {
        const rssData = await axios.get(requestUrl);
        const parsedRss = this.parseRssData(rssData.data);
        const convertedData = this.convertParsedData(parsedRss);
        this.props.onSubmit(convertedData);
        this.setState({ formState: 'neutral' });
      } catch (e) {
        this.setState({ formState: 'invalid' });
        console.error(e);
        }
    } else {
      this.setState({ formState: 'invalid' });
    }
  }

  isValidInput = () => {
    const value = this.state.rssLink;
    return isURL(value);
  }

  parseRssData = (data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'application/xml');
    return doc;
  }

  convertParsedData = (data) => {
    const feedName = data.querySelector('title').textContent;
    const feedLink = data.querySelector('link').textContent;
    const newsItems = [...data.querySelectorAll('item')];
    const preparedNews = newsItems.map((item) => {
      const guid = item.querySelector('guid');
      const title = item.querySelector('title');
      const link = item.querySelector('link');
      const desc = item.querySelector('description');
      return guid && title && link && desc ?
        {
                  guid: guid.textContent,
                  title: title.textContent,
                  link: link.textContent,
                  desc: desc.textContent,

        } : null;

    }).filter(item => !!item);
    return ({ feedName, feedLink, news: preparedNews });
  }

  render() {
    const validatorClass = cn({
      "has-error": this.state.formState === 'invalid',
      "has-success": this.state.formState === 'valid',
      "": this.state.formState === 'neutral',
    });

    const helpMessages = {
      "invalid": "Invalid or already used URL",
      "valid": "Looks good, please wait",
      "": ""
    }
    return  <Jumbotron>
      <h1> Hello RSS </h1>
      <form onSubmit={this.handleOnSubmit}>
          <div className={validatorClass}>
            <FormControl type="text" name="rssLink" onChange={this.handleOnChange} placeholder="input link with rss" value={this.state.rssLink}/>
            <span className="help-block">{helpMessages[this.state.formState]}</span>
          </div>
          <HelpBlock>Enter a valid RSS URL</HelpBlock>
        <Button type="submit" bsStyle="info">Submit</Button>
      </form>
    </Jumbotron>
  }
}
