import { Module } from 'vuex';
import { State as RootState } from '..';
import * as storeTypes from '../storeTypes';
import { auth, api, Failed } from '@/service/api';

interface State {
  userIsAdmin: boolean;
}

export default {
  state(): State {
    return {
      userIsAdmin: false,
    };
  },
  mutations: {
    [storeTypes.Auth.LoginMutation](state) {
      state.userIsAdmin = true;
    },
    [storeTypes.Auth.LogoutMutation](state) {
      state.userIsAdmin = false;
    },
  },
  actions: {
    [storeTypes.Auth.LoginAction](context, payload) {
      auth.login(payload.key);
      try {
        api.post('admin-login', { sendKey: true });
        context.commit(storeTypes.Auth.LoginMutation);
        context.commit(storeTypes.MessagePushMutation, { text: 'Logged in' }, { root: true });
      } catch (e) {
        if (e instanceof Failed) {
          context.commit(storeTypes.MessagePushMutation, { text: 'Login failed' }, { root: true });
          auth.logout();
        }
      }
    },
    [storeTypes.Auth.LogoutAction](context) {
      auth.logout();
      context.commit(storeTypes.Auth.LogoutMutation);
    }
  },
} as Module<State, RootState>;
