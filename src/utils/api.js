export function getPage(url) {
  return fetch(url)
    .then(errorHandler)
    .then((res) => true)
    .catch((e) => false);
}

function errorHandler (res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}