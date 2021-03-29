import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import RootState from './rootState';
import * as storeTypes from './storeTypes';
import { uuid4 } from './utils';

import { authModule, AuthModuleState } from './modules/auth';
import { articlesModule, ArticlesModuleState } from './modules/articles';
import { commentsModule, CommentsModuleState } from './modules/comments';

export const injectionKey: InjectionKey<Store<StoreState>> = Symbol('StoreInjectionKey');

interface StoreState extends RootState {
  auth: AuthModuleState;
  articles: ArticlesModuleState;
  comments: CommentsModuleState;
}

type Message = RootState['messages'][0];
interface MessagePayload extends Message {
  id: never;
}

export const store = createStore<RootState>({
  strict: process.env.NODE_ENV !== 'production',
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
    [storeTypes.MessagePushMutation](state, payload: MessagePayload) {
      const message: Message = {
        text: payload.text,
        id: uuid4(),
      };
      state.messages.push(message);
    },
    [storeTypes.MessagePopMutation](state, payload: { id: string }) {
      const index = state.messages.findIndex((message) => message.id === payload.id);
      if (index === -1) {
        throw Error(`No message with this id: "${payload.id}"`);
      }
      state.messages.splice(index, 1);
    },
  },
});
