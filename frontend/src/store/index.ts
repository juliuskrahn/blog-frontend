import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import RootState from './rootState';
import * as storeTypes from './storeTypes';

import authModule from './modules/auth';
import articlesModule from './modules/articles';
import commentsModule from './modules/comments';

export const injectionKey: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    auth: authModule,
    articles: articlesModule,
    comments: commentsModule,
  },
  state(): RootState {
    return {
      messages: [],
    };
  },
  mutations: {
    [storeTypes.MessagePushMutation](state, payload: RootState['messages'][0]) {
      state.messages.push(payload);
    },
    [storeTypes.MessagePopMutation](state, payload: { index: number }) {
      state.messages.splice(payload.index, 1);
    },
  },
});
