import React, { Component } from 'react';
import { Jumbotron, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import isEmail from 'validator/lib/isEmail';
import cn from 'classnames';

import FeedList from './FeedList';

export default class RssForm extends Component {

  state = { rssLink: '', formState: 'neutral' };

  handleOnChange = (e) => {
    const value = e.target.value;
    this.setState({ rssLink: value });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setValidationForm();
    this.props.onSubmit(this.state.rssLink);
    this.setState({ rssLink: '' })
  }

  setValidationForm = () => {
    const value = this.state.rssLink;
    const result =  isEmail(value) ? 'valid' : 'invalid';
    this.setState({ formState: result });
  }


  render() {
    const validatorClass = cn({
      "has-error": this.state.formState === 'invalid',
      "has-success": this.state.formState === 'valid',
      "": this.state.formState === 'neutral',
    });

    return  <Jumbotron>
      <h1> Hello RSS </h1>
      <form onSubmit={this.handleOnSubmit}>
          <div className={validatorClass}>
            <FormControl type="text" name="rssLink" onChange={this.handleOnChange} placeholder="input link with rss" value={this.state.rssLink}/>
          </div>
          <HelpBlock>Enter a valid RSS URL</HelpBlock>
        <Button type="submit" bsStyle="info">Submit</Button>
      </form>
    </Jumbotron>
  }
}
