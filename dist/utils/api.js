"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPage = getPage;
exports.sendSupportMessage = sendSupportMessage;

function getPage(url) {
  return fetch(url).then(errorHandler).then(function (res) {
    return res.json();
  })["catch"](function (e) {
    throw Error(e.message);
  });
}

function sendSupportMessage(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function errorHandler(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}