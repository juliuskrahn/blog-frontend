import { Module } from 'vuex';
import router from '@/router';
import { auth, api } from '@/service/api';
import { Failed } from '@/service/apiErrors';
import RootState from '../rootState';
import * as storeTypes from '../storeTypes';

export interface AuthModuleState {
  userIsAdmin: boolean;
}

export const authModule = {
  namespaced: true,
  state(): AuthModuleState {
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
    [storeTypes.Auth.LoginAction](context, payload: { key: string }) {
      auth.login(payload.key);
      try {
        api.post('admin-login', { sendKey: true });
        context.commit(storeTypes.Auth.LoginMutation);
        localStorage.setItem('key', payload.key);
        context.commit(storeTypes.MessagePushMutation, { text: 'Logged in' }, { root: true });
        router.push('/');
      } catch (e) {
        if (e instanceof Failed) {
          context.commit(storeTypes.MessagePushMutation, { text: 'Error: couldn\'t login. Wrong key?' }, { root: true });
          auth.logout();
        }
      }
    },
    [storeTypes.Auth.TryToLoginAgainAction](context) {
      const key: unknown = localStorage.getItem('key');
      if (typeof key === 'string') {
        auth.login(key);
        context.commit(storeTypes.Auth.LoginMutation);
      }
    },
    [storeTypes.Auth.LogoutAction](context) {
      auth.logout();
      context.commit(storeTypes.Auth.LogoutMutation);
    },
  },
} as Module<AuthModuleState, RootState>;
