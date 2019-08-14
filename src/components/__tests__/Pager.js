import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Pager from '../Pager';
import SupportForm from '../Pager/SupportForm';

jest.mock('../../utils/api');
Enzyme.configure({ adapter: new Adapter() });

describe(`The Pager component`, () => {

  it (`renders as expected`, () => {
    const component = renderer.create(pageComponent);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test (`pageIndex initial value and after goNext/goPrevious`, () => {
    const wrapper = mount(pageComponent);
    expect(wrapper.state().pageIndex).toBe(0);

    const { goNext, goPrevious } = wrapper.children().props();

    goNext();
    expect(wrapper.state().pageIndex).toBe(1);

    goPrevious();
    expect(wrapper.state().pageIndex).toBe(0);

    goPrevious();
    expect(wrapper.state().pageIndex).toBe(employees.length - 1);

    goNext();
    expect(wrapper.state().pageIndex).toBe(0);
  });

  test (`update showSupportDialog when openSupportDialog is invoked`, () => {
    const wrapper = mount(pageComponent);
    expect(wrapper.state().pageIndex).toBe(0);

    const { openSupportDialog, closeSupportDialog } = wrapper.children().props();

    openSupportDialog();
    expect(wrapper.state().showSupportDialog).toBe(true);
  });
});


const employees = [
  {
    last_name: 'mante',
    first_name: 'marvin',
    department: 'engineering',
    salary: 'underpaid'
  },
  {
    last_name: 'oani',
    first_name: 'aimee',
    department: 'teaching',
    salary: 'definitely underpaid',
  },
  {
    last_name: 'mante',
    first_name: 'sophia',
    department: 'exploring',
    salary: 'more than we make combined'
  },
];

const pageComponent = (
  <Pager
    pages={employees.map((employee, idx) => (
      <ul key={idx}>
        <li>Name: {employee.last_name}, {employee.first_name}</li>
        <li>Department: {employee.department}</li>
        <li>Salary: ${employee.salary}</li>
      </ul>
    ))}
    getLabel={
      i => `${employees[i].last_name}, ${employees[i].first_name}`
    }
    pageInfoUrl={(label) => `https://www.example.com/employees/info?label=${label}`}
    supportRequestUrl="https://www.example.com/support"
  >
    {({
      page,
      goPrevious,
      goNext,
      goToLabel,
      currentPageLabel,
      pageLabels,
      openSupportDialog,
      pageInfoIsLoading,
      pageInfoError,
      pageInfo,
    })=>(
      <React.Fragment>
        <div>
          <select onChange={e => goToLabel(e.target.value)} defaultValue={currentPageLabel}>
            {pageLabels.map(label => (
              <option
                key={label}
                value={label}
              >
                {label}
              </option>
            ))}
          </select>
          <button onClick={goPrevious}>Previous</button>
          <button onClick={goNext}>Next</button>
          <button onClick={openSupportDialog}>Help</button>
        </div>
        <div>
          {page}
        </div>
        {pageInfoIsLoading && (
          <div>Loading more info...</div>
        )}
        {pageInfoError && (
          <div>Error fetching info: {pageInfoError}</div>
        )}
        {pageInfo && (
          <div>
            # of Likes: {pageInfo.likes}
          </div>
        )}
      </React.Fragment>
    )}
  </Pager>
);