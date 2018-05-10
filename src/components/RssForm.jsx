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
    if (this.isValidInput()) {
      this.props.onSubmit(this.state.rssLink);
      this.setState({ rssLink: '', formState: 'valid' });
    } else {
      this.setState({ formState: 'invalid' });
    }
  }

  isValidInput = () => {
    const value = this.state.rssLink;
    return isEmail(value);
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
