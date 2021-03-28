const BASE_URL = 'https://api.juliuskrahn.com/';

const auth = {
  _key: null as null | string,
  login(key: string) {
    this._key = key;
  },
  logout() {
    this._key = null;
  }
}

interface Options {
  content?: { [key: string]: any };
  sendKey?: boolean;
}

const defaultOptions = {
  content: undefined,
  sendKey: false,
}

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
  const userContent = (options.content ? options.content : {}) as { [key: string]: any };
  const body = { ...userContent };
  if (options.sendKey) {
    if (typeof auth._key !== 'string') {
      throw new Unauthorized(401, 'Unauthorized (no admin key provided)');
    }
    body.key = auth._key;
  }
  let jsonBody: string | undefined = JSON.stringify(body);
  if (jsonBody === "{}") {
    jsonBody = undefined;
  }
  return jsonBody;
}

async function processResponse(response: Response) {
  checkStatus(response.status);
  const body = await response.json();
  return body;
}

const api = {

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

class ApiError extends Error { }

class Failed extends ApiError {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`)
  }
}

class Unauthorized extends Error {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`)
  }
}

class NotFound extends Error {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`)
  }
}

class ServerError extends Error {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`)
  }
}

export {
  api,
  auth,
  ApiError,
  Failed,
  Unauthorized,
  NotFound,
  ServerError,
};
