export function getPage(url) {
  return fetch(url)
    .then(errorHandler)
    .then((res) => res.json())
    .catch((e) => {
      throw Error(e.message);
    });
}

export function sendSupportMessage(url, data) {
  return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}

function errorHandler (res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}
