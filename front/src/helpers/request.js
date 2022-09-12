const request = (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    const base = 'http://localhost:8080';
    const uri = base + url;
    fetch(uri, { credentials: 'include', ...options })
      .then((result) => {
        result
          .json()
          .then((response) => {
            if (response.success) resolve(response.data);
            else if (response.code)
              reject({
                code: response.code,
                error: response.error,
                data: response.data,
              });
            else
              reject({
                code: 'UNKNOWN_RESPONSE',
                error: 'Unknown response from the server',
              });
          })
          .catch((error) => {
            reject({
              code: 'INVALID_RESPONSE',
              error: 'Invalid response from the server',
            });
          });
      })
      .catch((result) => {
        reject({
          code: 'INTERNET_FAILURE',
          error: 'Internet Failure',
          data: result,
        });
      });
  });
};

const customRequest = (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    const uri = url;
    fetch(uri, { ...options })
      .then((result) => {
        result
          .json()
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject({
              code: 'INVALID_RESPONSE',
              error: 'Invalid response from the server',
            });
          });
      })
      .catch((result) => {
        reject({
          code: 'INTERNET_FAILURE',
          error: 'Internet Failure',
          data: result,
        });
      });
  });
};

const get = (url) => {
  return request(url);
};

const post = (url, data) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const remove = (url, data) => {
  return request(url, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const put = (url, data) => {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { get, post, put, remove, customRequest };
