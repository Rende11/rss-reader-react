import React, { Component } from 'react';
import { Jumbotron, FormControl, HelpBlock, Button } from 'react-bootstrap';
import isURL from 'validator/lib/isURL';
import cn from 'classnames';
import axios from 'axios';
import _ from 'lodash';


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
      const rssLink = this.state.rssLink;
      this.setState({ rssLink: '', formState: 'valid' });
      try {
        const dataWithOriginalUrl = await this.getAndParseDataFromUrl(rssLink);
        this.props.onSubmit(dataWithOriginalUrl);
        this.setState({ formState: 'neutral' });
      } catch (e) {
        this.setState({ formState: 'invalid' });
        console.error(e);
        }
    } else {
      this.setState({ formState: 'invalid' });
    }
  }

  getNewData = async (rssdata) => {
    const rsslinks = rssdata.map(feed => feed.rssLink);
    const newdata = rsslinks.map(async link => await this.getAndParseDataFromUrl(link));
    return newdata;
  }

  isValidInput = () => {
    const value = this.state.rssLink;
    const links = this.props.feeds.map(feed => feed.rssLink);
    return isURL(value) && !links.includes(value);
  }

  getAndParseDataFromUrl = async (rssLink) => {
    const requestUrl = `${this.proxy}/${rssLink}`;
    const rssData = await axios.get(requestUrl);
    const parsedRss = this.parseRssData(rssData.data);
    const convertedData = this.convertParsedData(parsedRss);
    const dataWithOriginalUrl = { ...convertedData, rssLink };
    return dataWithOriginalUrl;
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

  handleRefresh = async () => {
    const feeds = this.props.feeds;
    const actualData = await this.getNewData(feeds);
    const feedsWithNewArticles = Promise.all(actualData)
      .then(actualData => actualData
        .map(newFeed => {
          const oldFeed = _.find(feeds, oldFeedItem => oldFeedItem.rssLink === newFeed.rssLink);
          const newArticles = _.differenceWith(newFeed.news, oldFeed.news, (first, second) => first.guid === second.guid);
          return { ...newFeed, news: newArticles };
          }));
    this.props.handleUpdate(await feedsWithNewArticles);
  }

  cycleUpdate = async () => {
    try {
      await  this.handleRefresh();
      setTimeout(this.cycleUpdate, 5000);
    } catch (err) {
      console.error(err);
      setTimeout(this.cycleUpdate, 20000);
    }
  }

  async componentWillMount() {
    await this.cycleUpdate();
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
      <h1>RSS Feed Reader</h1>
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
