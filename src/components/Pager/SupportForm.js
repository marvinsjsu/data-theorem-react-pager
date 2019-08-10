import React from 'react';
import PropTypes from 'prop-types';

export default class SupportForm extends React.Component {

  static propTypes = {
    sendSupportMessage: PropTypes.func.isRequired,
    supportRequestUrl: PropTypes.string.isRequired
  };

  state = {
    name: '',
    email: '',
    message: ''
  };

  componentDidMount() {

  };

  onSubmit = (e) => {
    e.preventDefault();
    const { sendSupportMessage } = this.props;


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
        <button onClick={closeSupportDialog} className="container--form__close">&times;</button>
        <form onSubmit={this.onSubmit}>
          <div className='row'>
            <input
              id='name'
              className='input--name'
              type='text'
              name='name'
              value={name}
              onChange={(e) => this.onChange('name', e)}
            />
          </div>

          <div className='row'>
            <input
              id='email'
              className='input--email'
              type='email'
              name='email'
              value={email}
              onChange={(e) => this.onChange('email', e)}
            />
          </div>

          <div className='row'>
            <textarea
              id='message'
              className='textarea--message'
              name='message'
              value={message}
              onChange={(e) => this.onChange('message', e)}
            />
          </div>

          <div className='row'>
            <button
              type='submit'
              className='btn'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
};
