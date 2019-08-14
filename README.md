# Data Theorem React Pager

Data Theorem React Pager is a package that provides a viewer to pages.

## Installation

Use the package manager [npm](https://nodejs.org/en/) to install.

```bash
npm install https://github.com/marvinsjsu/data-theorem-react-pager
```

Usage Example
---

The following is an example of what using this component might look like in an
app:

```jsx
import React from 'react';
import Pager from 'data-theorem-pager';

export default function EmployeePages({ employees }) {
  return (
    <div>
      <h1>Employees</h1>
      <Pager
        pages={employees.map(employee => (
          <ul>
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
          <>
            <div>
              <select onChange={e => goToLabel(e.target.value)}>
                {pageLabels.map(label => (
                  <option
                    value={label}
                    selected={label === currentPageLabel}
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
          </>
        )}
      </Pager>
    </div>
  );
}
```

API
---

*prop: **pages*** (required)
An array of nodes to render. Can be whatever you want the page data to be.
Using the active page index, one of the array elements will be rendered.

*prop: **getLabel*** (required)
A function in the form `(i)=>string` where `i` is a page index indicating an
entry in the `pages` array provided. The function should return the label for
that page.

*prop: **children*** (required)
A function in the form that returns a node and takes the following arguments:
- page: The current page node to be rendered
- goPrevious: A function to call when you want to navigate to the previous page
- goNext: A function to call when you want to navigate to the next page
- goToLabel: A function to call when you want to navigate to a page with
  particular label.
- currentPageLabel: A string indiciating the label of the current page
- pageLabels: An array containing the string labels of all pages.
- openSupportDialog: A function to call to open the support dialog. The Pager
  component will render an overlay containing a form asking the user for their
  name, email, and a message. Once the information is validated and submitted,
  the data will be sent to the URL specified by the supportRequestUrl prop.
  This prop will be `null` if the `supportRequestUrl` prop is not provided.
- pageInfo: An object containing the parsed JSON info fetched for this page.
  See the `pageInfoUrl` prop.
- pageInfoIsLoading: Will be `true` while the request for the current page info
  is ongoing, `false` otherwise.
- pageinfoError: If the request to fetch the current page's page info failed,
  this will be an error string. Otherwise it will be `null`.

*prop: **supportRequestUrl*** (default: null)
A string representing the url to send a support request to. This URL must
support a POST request being made to it. The body content will be in the
following shape:

```json
{
  "name": "User's Name",
  "email": "User's Email Address",
  "message": "The message entered by the user",
}
```

Responses handled:

- **200 OK** or **201 Created** or **202 Accepted** or **204 No Content** if the support request was processed without issue.
- **400 Bad Request** if the body was malformed. The response may contain a
  response body the form `{ message: "Error message"}` in which case the
  message will be displayed to the user.
- Other 4xx or 5xx codes will result in a generic message.

If this prop is not provided, the `openSupportDialog` provided to the render
function will be `null`.

*props: **pageInfoUrl*** (default: null)
A function in the form `(label)=>string` that, when provided a page label,
returns a URL to call to fetch the page info for that label. Responses in the
*200-299* range will be considered successful. The response body will be
parsed as JSON and provided to the render function as `pageInfo`. If an error
occurs, it will be provided in `pageInfoError`.

Test Suite
---

To test, clone this repo and run

```
yarn
yarn test
```

or

```
npm
npm test
```