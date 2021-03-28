import { Module } from 'vuex';
import { State as RootState } from '..';
import * as storeTypes from '../storeTypes';
import { api } from '@/service/api';

interface Article {
  title: string;
  description: string;
  tag: string;
  published: string;
  content?: string;
}

interface ArticleEntity extends Article {
  urlTitle: string;
}

interface UncomittedArticleEntity extends ArticleEntity {
  published: never;
}

interface State {
  articles: {
    [key: string]: Article
  };
  _flags: {
    loadedAll: boolean;
    loadedAllWithTags: string[];
  };
}

export default {
  namespaced: true,
  state() {
    return {
      articles: {},
      _flags: {
        loadedAll: false,
        loadedAllWithTags: [],
      }
    };
  },
  mutations: {
    [storeTypes.Articles.PutMutation](state, payload: ArticleEntity) {
      const { urlTitle, ...articlce } = payload;
      state.articles[urlTitle] = articlce;
    },
    [storeTypes.Articles.RemoveMutation](state, payload: { urlTitle: string }) {
      delete state.articles[payload.urlTitle];
    },
  },
  actions: {
    async [storeTypes.Articles.LoadFullAction](context, payload: { urlTitle: string }) {
      // loads a single article (with content)
      if (context.state.articles[payload.urlTitle]?.content) {
        return;
      }
      const article = await api.get(`articlce/${payload.urlTitle}`);
      context.commit(storeTypes.Articles.PutMutation, article);
    },
    async [storeTypes.Articles.LoadAllAction](context) {
      // loads all articles (content excluded)
      if (context.state._flags.loadedAll) {
        return;
      }
      const articles = await api.get('articlce');
      if (!Array.isArray(articles)) {
        throw new TypeError();
      }
      for (let article of articles as ArticleEntity[]) {
        context.commit(storeTypes.Articles.PutMutation, article);
      }
    },
    async [storeTypes.Articles.LoadAllWithTagAction](context, payload: { tag: string }) {
      // loads all articles with a specific tag (content excluded)
      if (context.state._flags.loadedAllWithTags.includes(payload.tag)) {
        return;
      }
      const articles = await api.get(`tag/${payload.tag}`);
      if (!Array.isArray(articles)) {
        throw new TypeError();
      }
      for (let article of articles as ArticleEntity[]) {
        context.commit(storeTypes.Articles.PutMutation, article);
      }
    },
    async [storeTypes.Articles.CreateAction](context, payload: UncomittedArticleEntity) {
      await api.post('article', { sendKey: true, content: payload });
      context.commit(storeTypes.Articles.PutMutation, payload);
    },
    async [storeTypes.Articles.UpdateAction](context, payload: ArticleEntity) {
      await api.patch(`article/${payload.urlTitle}`, { sendKey: true, content: payload });
      context.commit(storeTypes.Articles.PutMutation, payload);
    },
    async [storeTypes.Articles.DeleteAction](context, payload: { urlTitle: string }) {
      await api.delete(`article/${payload.urlTitle}`, { sendKey: true });
      context.commit(storeTypes.Articles.RemoveMutation, payload);
    },
  },
  getters: {
    [storeTypes.Articles.AllSortedDescByPublishedGetter](state: State) {
      const articles = [];
      for (const [urlTitle, article] of Object.entries(state.articles)) {
        articles.push({ urlTitle, ...article });
      }
      return articles.sort((a, b) => b.published.localeCompare(a.published));
    },
    [storeTypes.Articles.AllWithTagSortedDescByPublishedGetter](state: State) {
      function wrapped(tag: string) {
        const articles = [];
        for (const [urlTitle, article] of Object.entries(state.articles)) {
          if (article.tag === tag) {
            articles.push({ urlTitle, ...article });
          }
        }
        return articles.sort((a, b) => b.published.localeCompare(a.published));
      }
      return wrapped;
    },
  }
} as Module<State, RootState>;
