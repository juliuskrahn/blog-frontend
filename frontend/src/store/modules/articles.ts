import { Module } from 'vuex';
import { api } from '@/service/api';
import RootState from '../rootState';
import * as storeTypes from '../storeTypes';

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

export interface ArticlesModuleState {
  articles: {
    [key: string]: Article;
  };
  tags: string[];
  flags: {
    loadedAllArticles: boolean;
    loadedAllArticlesWithTags: string[];
    loadedAllTags: boolean;
  };
}

export const articlesModule = {
  namespaced: true,
  state(): ArticlesModuleState {
    return {
      articles: {},
      tags: [],
      flags: {
        loadedAllArticles: false,
        loadedAllArticlesWithTags: [],
        loadedAllTags: false,
      },
    };
  },
  mutations: {

    [storeTypes.Articles.PutMutation](state, payload: ArticleEntity) {
      const { urlTitle, ...article } = payload;
      state.articles[urlTitle] = article;
    },

    [storeTypes.Articles.RemoveMutation](state, payload: { urlTitle: string }) {
      delete state.articles[payload.urlTitle];
    },

    [storeTypes.Articles.PutAllTagsMutation](state, payload: { tags: string[] }) {
      state.tags = payload.tags;
    },

    [storeTypes.Articles.SetFlagsMutation](state, payload) {
      state.flags = { ...state.flags, ...payload };
    },

  },
  actions: {

    async [storeTypes.Articles.LoadFullAction](context, payload: { urlTitle: string }) {
      // loads a single article (with content)
      if (context.state.articles[payload.urlTitle]?.content) {
        return;
      }
      const { article } = await api.get(`article/${payload.urlTitle}`);
      context.commit(storeTypes.Articles.PutMutation, article);
    },

    async [storeTypes.Articles.LoadAllAction](context) {
      // loads all articles (content excluded)
      if (context.state.flags.loadedAllArticles) {
        return;
      }
      const { articles }: { articles: Array<ArticleEntity> } = await api.get('article');
      if (!Array.isArray(articles)) {
        throw new TypeError();
      }
      articles.forEach((article) => {
        if (!context.state.articles[article.urlTitle]?.content) {
          context.commit(storeTypes.Articles.PutMutation, article);
        }
      });
      context.commit(storeTypes.Articles.SetFlagsMutation, { loadedAllArticles: true });
    },

    async [storeTypes.Articles.LoadAllWithTagAction](context, payload: { tag: string }) {
      // loads all articles with a specific tag (content excluded)
      if (context.state.flags.loadedAllArticles
        || context.state.flags.loadedAllArticlesWithTags.includes(payload.tag)) {
        return;
      }
      const { articles }: { articles: Array<ArticleEntity> } = await api.get(`tag/${payload.tag}`);
      if (!Array.isArray(articles)) {
        throw new TypeError();
      }
      articles.forEach((article) => {
        if (!context.state.articles[article.urlTitle]?.content) {
          context.commit(storeTypes.Articles.PutMutation, article);
        }
      });
      context.commit(storeTypes.Articles.SetFlagsMutation, {
        loadedAllArticlesWithTags: [...context.state.flags.loadedAllArticlesWithTags, payload.tag],
      });
    },

    async [storeTypes.Articles.CreateAction](context, payload: UncomittedArticleEntity) {
      await api.post('article', { sendKey: true, content: payload });
      context.commit(storeTypes.Articles.PutMutation, payload);
      context.commit(storeTypes.MessagePushMutation, { text: 'Article created' }, { root: true });
    },

    async [storeTypes.Articles.UpdateAction](context, payload: ArticleEntity) {
      await api.patch(`article/${payload.urlTitle}`, { sendKey: true, content: payload });
      context.commit(storeTypes.Articles.PutMutation, payload);
      context.commit(storeTypes.MessagePushMutation, { text: 'Article updated' }, { root: true });
    },

    async [storeTypes.Articles.DeleteAction](context, payload: { urlTitle: string }) {
      await api.delete(`article/${payload.urlTitle}`, { sendKey: true });
      context.commit(storeTypes.Articles.RemoveMutation, payload);
      context.commit(storeTypes.MessagePushMutation, { text: 'Article deleted' }, { root: true });
    },

    async [storeTypes.Articles.LoadAllTagsAction](context) {
      if (context.state.flags.loadedAllTags) {
        return;
      }
      const { tags } = await api.get('tag');
      context.commit(storeTypes.Articles.PutAllTagsMutation, { tags });
      context.commit(storeTypes.Articles.SetFlagsMutation, { loadedAllTags: true });
    },

  },
  getters: {

    [storeTypes.Articles.AllSortedDescByPublishedGetter](state: ArticlesModuleState) {
      const articles: Array<ArticleEntity> = [];
      Object.entries(state.articles).forEach(
        ([urlTitle, article]) => articles.push({ urlTitle, ...article }),
      );
      return articles.sort((a, b) => b.published.localeCompare(a.published));
    },

    [storeTypes.Articles.AllWithTagSortedDescByPublishedGetter](state: ArticlesModuleState) {
      function wrapped(tag: string) {
        const articles: Array<ArticleEntity> = [];
        Object.entries(state.articles).forEach(([urlTitle, article]) => {
          if (article.tag === tag) { articles.push({ urlTitle, ...article }); }
        });
        return articles.sort((a, b) => b.published.localeCompare(a.published));
      }
      return wrapped;
    },

  },
} as Module<ArticlesModuleState, RootState>;
