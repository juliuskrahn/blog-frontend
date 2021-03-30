import { AppConfig } from 'vue';
import { store } from './store';
import * as storeTypes from './store/storeTypes';

export const appErrorHandler: AppConfig['errorHandler'] = (error, vm, info) => {
  let name = '';
  let message = '';
  // eslint-disable-next-line
  let stack: string | undefined;
  if (error instanceof Error) {
    name = error.name;
    message = error.message;
    stack = error.stack;
  }
  store.commit(`${storeTypes.MessagePushMutation}`, { text: `${name}: ${message}` });
  console.error(error, `Vue info: ${info}`);
};

export const globalErrorHandler = (event: ErrorEvent) => {
  let name = '';
  // eslint-disable-next-line
  let stack: string | undefined;
  if (event.error instanceof Error) {
    name = event.error.name;
    stack = event.error.stack;
  }
  store.commit(`${storeTypes.MessagePushMutation}`, { text: `${name}: ${event.message}` });
};

export const globalPromiseRejectionHandler = (event: PromiseRejectionEvent) => {
  store.commit(`${storeTypes.MessagePushMutation}`, { text: `${event.reason}` });
};
