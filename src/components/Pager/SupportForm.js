import React from 'react';
import PropTypes from 'prop-types';

import { sendSupportMessage } from '../../utils/api';

export default class SupportForm extends React.Component {

  static propTypes = {
    supportRequestUrl: PropTypes.string.isRequired,
    closeSupportDialog: PropTypes.func.isRequired
  };

  state = {
    name: '',
    email: '',
    message: '',
    successMessage: null,
    errorMessage: null
  };

  onSubmit = (e) => {
    e.preventDefault();
    this._sendMessage({...this.state});
  };

  catchEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  onChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    });
  };

  _sendMessage = ({ name, email, message }) => {
    if (name && email && message) {
      const { supportRequestUrl } = this.props;

      sendSupportMessage(supportRequestUrl, {
        name,
        email,
        message
      })
        .then((res) => {
          if ([200, 201, 202, 204].includes(res.status)) {
            this.setState({
              successMessage: 'Support request was submitted.',
              name: '',
              email: '',
              message: '',
              errorMessage: null
            });
          }

          if (res.status === 400) {
            return res.json();
          }
        })
        .then((data) => {
          if (data && data.message) {
            this.setState({
              errorMessage: data.message || 'Something went wrong. Please try again.'
            });
          }
        })
        .catch((e) => {
          this.setState({
            errorMessage: e.message
          });
        });
    }
  };

  render () {
    const { name, email, message, successMessage, errorMessage } = this.state;
    const { closeSupportDialog } = this.props;

    return (
      <div className='container--form' id='support-form'>
        <form onSubmit={this.onSubmit}>
          <h4 className='title'>Support Request Form</h4>
          <button
            className="container--form__close"
            onClick={closeSupportDialog}
          >
            &times;
          </button>
          {successMessage && (
            <div className='row'>
              <h4 className='message message__success'>
                {successMessage}
              </h4>
            </div>
          )}
          {errorMessage && (
            <div className='row'>
              <h4 className='message message__error'>
                {errorMessage}
              </h4>
            </div>
          )}
          <div className='row'>
            <input
              id='name'
              className='input'
              type='text'
              name='name'
              value={name}
              placeholder='name'
              onChange={(e) => this.onChange('name', e)}
              onKeyDown={this.catchEnter}
              required
            />
          </div>

          <div className='row'>
            <input
              id='email'
              className='input'
              type='email'
              name='email'
              value={email}
              placeholder='email'
              onChange={(e) => this.onChange('email', e)}
              onKeyDown={this.catchEnter}
              required
            />
          </div>

          <div className='row'>
            <textarea
              id='message'
              className='textarea--message'
              name='message'
              value={message}
              placeholder='message'
              onChange={(e) => this.onChange('message', e)}
              onKeyDown={this.catchEnter}
              required
            />
          </div>

          <div className='row'>
            <button
              type='submit'
              className='btn'
              disabled={!name || !email || !message}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
};
