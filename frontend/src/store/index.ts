import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import * as storeTypes from './storeTypes';
import { auth, api, Failed } from '@/service/api';
import articlesModule from './modules/articles';
import commentsModule from './modules/comments';

export interface State {
  messages: Array<{
    text: string;
  }>;
  userIsAdmin: boolean;
}

export const injectionKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    articles: articlesModule,
    comments: commentsModule,
  },
  state(): State {
    return {
      messages: [],
      userIsAdmin: false,
    };
  },
  mutations: {
    [storeTypes.MessagePushMutation](state, payload: State['messages'][0]) {
      state.messages.push(payload);
    },
    [storeTypes.MessagePopMutation](state, payload: { index: number }) {
      state.messages.splice(payload.index, 1);
    },
    [storeTypes.LoginMutation](state) {
      state.userIsAdmin = true;
    },
    [storeTypes.LogoutMutation](state) {
      state.userIsAdmin = false;
    },
  },
  actions: {
    [storeTypes.LoginAction](context, payload) {
      auth.login(payload.key);
      try {
        api.post('admin-login', { sendKey: true });
        context.commit(storeTypes.LoginMutation);
        context.commit(storeTypes.MessagePushMutation, { text: 'Logged in' });
      } catch (e) {
        if (e instanceof Failed) {
          context.commit(storeTypes.MessagePushMutation, { text: 'Login failed' });
          auth.logout();
        }
      }
    },
    [storeTypes.LogoutAction](context) {
      auth.logout();
      context.commit(storeTypes.LoginMutation);
    }
  },
});
