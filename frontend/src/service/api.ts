/* eslint no-underscore-dangle: 0 */

import {
  Failed,
  Unauthorized,
  NotFound,
  ServerError,
} from './apiErrors';

const BASE_URL = 'https://api.juliuskrahn.com/';

export const auth = {
  _key: null as null | string,
  login(key: string) {
    this._key = key;
  },
  logout() {
    this._key = null;
  },
};

interface Options {
  // eslint-disable-next-line
  content?: { [key: string]: any };
  sendKey?: boolean;
}

const defaultOptions = {
  content: undefined,
  sendKey: false,
};

function checkStatus(status: number) {
  switch (status) {
    case 400:
      throw new Failed(status, 'Failed');
    case 401:
      throw new Unauthorized(status, 'Unauthorized');
    case 404:
      throw new NotFound(status, 'Not found');
    case 429:
      throw new ServerError(status, 'The server is overloaded');
    default:
      if (status >= 400 && status <= 499) {
        throw new ServerError(status, 'Unknown Client Error');
      }
      if (status >= 500 && status <= 599) {
        throw new ServerError(status, 'Internal Server Error');
      }
      break;
  }
}

function buildRequestBody(options: Options): string | undefined {
  // eslint-disable-next-line
  const userContent = (options.content ? options.content : {}) as { [key: string]: any };
  const body = { ...userContent };
  if (options.sendKey) {
    if (typeof auth._key !== 'string') {
      throw new Unauthorized(401, 'Unauthorized (no admin key provided)');
    }
    body.key = auth._key;
  }
  let jsonBody: string | undefined = JSON.stringify(body);
  if (jsonBody === '{}') {
    jsonBody = undefined;
  }
  return jsonBody;
}

async function processResponse(response: Response) {
  checkStatus(response.status);
  const body = await response.json();
  return body;
}

export const api = {

  async get(path: string) {
    const response = await fetch(BASE_URL + path);
    return processResponse(response);
  },

  async post(path: string, options: Options = defaultOptions) {
    const response = await fetch(BASE_URL + path, {
      method: 'POST',
      body: buildRequestBody(options),
    });
    return processResponse(response);
  },

  async patch(path: string, options: Options = defaultOptions) {
    const response = await fetch(BASE_URL + path, {
      method: 'PATCH',
      body: buildRequestBody(options),
    });
    return processResponse(response);
  },

  async delete(path: string, options: Options = defaultOptions) {
    const response = await fetch(BASE_URL + path, {
      method: 'DELETE',
      body: buildRequestBody(options),
    });
    return processResponse(response);
  },
};
