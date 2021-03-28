/* eslint max-classes-per-file: 0 */

export class ApiError extends Error { }

export class Failed extends ApiError {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`);
  }
}

export class Unauthorized extends Error {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`);
  }
}

export class NotFound extends Error {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`);
  }
}

export class ServerError extends Error {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`);
  }
}
