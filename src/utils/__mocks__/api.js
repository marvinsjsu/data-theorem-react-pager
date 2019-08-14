export function getPage(url) {
  console.log('USING MOCK GETPAGE');

  return new Promise((resolve) => (
    resolve({
      success: true,
      ok: true
    })
  ));
}

export function sendSupportMessage(url, data) {
  console.log('USING MOCK SENDSUPPORTMESSAGE');

  return new Promise((resolve) => (
    resolve({
      success: true,
      ok: true
    })
  ));
}

function errorHandler (res) {
  console.log('USING MOCK ERRORHANDLER');

  return res;
}
