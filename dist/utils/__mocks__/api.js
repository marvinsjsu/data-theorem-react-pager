"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPage = getPage;
exports.sendSupportMessage = sendSupportMessage;

function getPage(url) {
  console.log('USING MOCK GETPAGE');
  return new Promise(function (resolve) {
    return resolve({
      success: true,
      ok: true
    });
  });
}

function sendSupportMessage(url, data) {
  console.log('USING MOCK SENDSUPPORTMESSAGE');
  return new Promise(function (resolve) {
    return resolve({
      success: true,
      ok: true
    });
  });
}

function errorHandler(res) {
  console.log('USING MOCK ERRORHANDLER');
  return res;
}