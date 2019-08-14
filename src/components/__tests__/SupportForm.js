import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SupportForm from '../Pager/SupportForm';

jest.mock('../../utils/api');
Enzyme.configure({ adapter: new Adapter() });

const supportRequestUrl = 'http://localhost:3000/api/v1/test';

describe(`The SupportForm component`, () => {

  it (`renders as expected`, () => {
    const component = renderer.create(
      <SupportForm
        supportRequestUrl={supportRequestUrl}
        closeSupportDialog={() => {}}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test (`user enters name in input and is shown`, () => {
    const wrapper = shallow(
      <SupportForm
        supportRequestUrl={supportRequestUrl}
        closeSupportDialog={() => {}}
      />
    );

    wrapper.find('#name').simulate('change', {
      target: { value: 'calvin' }
    });

    expect(wrapper.find('#name').props().value).toEqual('calvin');
  });

  test (`user enters email in input and is shown`, () => {
    const wrapper = shallow(
      <SupportForm
        supportRequestUrl={supportRequestUrl}
        closeSupportDialog={() => {}}
      />
    );

    wrapper.find('#email').simulate('change', {
      target: { value: 'calvin@pups.com' }
    });

    expect(wrapper.find('#email').props().value).toEqual('calvin@pups.com');
  });

  test (`user enters message in input and is shown`, () => {
    const wrapper = shallow(
      <SupportForm
        supportRequestUrl={supportRequestUrl}
        closeSupportDialog={() => {}}
      />
    );

    wrapper.find('#message').simulate('change', {
      target: { value: 'need a walk' }
    });

    expect(wrapper.find('#message').props().value).toEqual('need a walk');
  });

  test (`user submits support form, fires event preventsDefault`, () => {
    const wrapper = shallow(
      <SupportForm
        supportRequestUrl={supportRequestUrl}
        closeSupportDialog={() => {}}
      />
    );

    let prevented = false;
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        prevented = true;
      }
    });

    expect(prevented).toBe(true);
  });

  test (`user hits enter on input, fires event preventsDefault`, () => {
    let closed = false;
    const closeSupportDialog = () => { closed = true };
    const wrapper = shallow(
      <SupportForm
        supportRequestUrl={supportRequestUrl}
        closeSupportDialog={closeSupportDialog}
      />
    );

    let prevented = false;
    wrapper.find('#name').simulate('keydown', {
      key: 'Enter',
      preventDefault: () => {
        prevented = true;
      }
    });

    expect(prevented).toBe(true);
  });

  test (`user clicks on close (x) button`, () => {
    let closed = false;
    const closeSupportDialog = () => { closed = true };
    const wrapper = shallow(
      <SupportForm
        supportRequestUrl={supportRequestUrl}
        closeSupportDialog={closeSupportDialog}
      />
    );

    wrapper.find('.container--form__close').simulate('click');
    expect(closed).toBe(true);
  });

});