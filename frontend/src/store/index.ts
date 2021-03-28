import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import * as storeTypes from './storeTypes';
import authModule from './modules/auth';
import articlesModule from './modules/articles';
import commentsModule from './modules/comments';

export interface State {
  messages: Array<{
    text: string;
  }>;
}

export const injectionKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    auth: authModule,
    articles: articlesModule,
    comments: commentsModule,
  },
  state(): State {
    return {
      messages: [],
    };
  },
  mutations: {
    [storeTypes.MessagePushMutation](state, payload: State['messages'][0]) {
      state.messages.push(payload);
    },
    [storeTypes.MessagePopMutation](state, payload: { index: number }) {
      state.messages.splice(payload.index, 1);
    },
  },
});
