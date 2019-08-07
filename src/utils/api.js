export function getPage(url) {
  return fetch(url)
    .then(errorHandler)
    .then((res) => res.json())
    .then((page) => {
      if(page.message) {
        console.log(page.message);
        throw new Error(getErrorMsg(page.message));
      }
    })
    .catch((e) => false);
}

function errorHandler (res) {
  if (!res.ok) {
    console.log('res: ', res);
    throw Error(res.statusText);
  }

  return res;
}

function getErrorMsg (message, username) {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }

  return message;
}