import React from 'react';
import PropTypes from 'prop-types';

export default class SupportForm extends React.Component {

  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    supportRequestUrl: PropTypes.string.isRequired
  };

  state = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit');
    const { sendMessage } = this.props;
    sendMessage({...this.state});
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

  render () {
    const { name, email, message } = this.state;
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
