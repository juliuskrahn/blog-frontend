import { Module } from 'vuex';
import { api } from '@/service/api';
import RootState from '../rootState';
import * as storeTypes from '../storeTypes';

interface BaseComment {
  author: string;
  content: string;
}

interface AddRespUncomittedPayload extends BaseComment {
  commentId: string;
}

interface AddRespPayload extends BaseComment {
  commentId: string;
  id: string;
}

interface Comment extends BaseComment {
  id: string;
  resps: {
    [id: string]: BaseComment;
  };
}

interface AddCommentUncomittedPayload extends Comment {
  id: never;
}

export interface CommentsModuleState {
  comments: Array<Comment>;
  commentsForArticlWithUrlTitle: string | null;
  authorName: string;
}

// eslint-disable-next-line
function isSet(val: any) {
  if (val === null) {
    throw new TypeError('Not set!');
  }
}

export const commentsModule = {
  namespaced: true,
  data(): CommentsModuleState {
    return {
      comments: [],
      commentsForArticlWithUrlTitle: null,
      authorName: localStorage.getItem('author') || '',
    };
  },
  mutations: {

    [storeTypes.Comments.SetArticleUrlTitle](state, payload: { articleUrlTitle: string }) {
      if (payload.articleUrlTitle !== state.commentsForArticlWithUrlTitle) {
        state.comments = [];
      }
      state.commentsForArticlWithUrlTitle = payload.articleUrlTitle;
    },

    [storeTypes.Comments.AddMutation](state, payload: Comment) {
      state.comments.push(payload);
    },

    [storeTypes.Comments.RemoveMutation](state, payload: { id: string }) {
      const index = state.comments.findIndex((comment) => comment.id === payload.id);
      state.comments.splice(index, 1);
    },

    [storeTypes.Comments.AddRespMutation](state, payload: AddRespPayload) {
      const { id, ...resp } = payload;
      const index = state.comments.findIndex((comment) => comment.id === payload.commentId);
      state.comments[index].resps[id] = resp;
    },

    [storeTypes.Comments.RemoveRespMutation](state, payload: { commentId: string; id: string }) {
      const index = state.comments.findIndex((comment) => comment.id === payload.commentId);
      delete state.comments[index].resps[payload.id];
    },

    [storeTypes.Comments.SetAuthorName](state, payload: { authorName: string }) {
      state.authorName = payload.authorName;
      localStorage.setItem('author', payload.authorName);
    },

  },
  actions: {

    async [storeTypes.Comments.AddAction](context, payload: AddCommentUncomittedPayload) {
      isSet(context.state.commentsForArticlWithUrlTitle);
      const { id } = await api.post(`article/${context.state.commentsForArticlWithUrlTitle}/comments`, {
        content: payload, sendKey: true,
      });
      context.commit(storeTypes.Comments.AddMutation, { ...payload, id });
    },

    async [storeTypes.Comments.RemoveAction](context, payload: { id: string }) {
      isSet(context.state.commentsForArticlWithUrlTitle);
      await api.delete(`article/${context.state.commentsForArticlWithUrlTitle}/comments/${encodeURIComponent(payload.id)}`, { sendKey: true });
      context.commit(storeTypes.Comments.RemoveMutation, payload);
    },

    async [storeTypes.Comments.AddRespAction](context, payload: AddRespUncomittedPayload) {
      isSet(context.state.commentsForArticlWithUrlTitle);
      const { id } = await api.post(`article/${context.state.commentsForArticlWithUrlTitle}/comments/${encodeURIComponent(payload.commentId)}/resps`, {
        content: payload, sendKey: true,
      });
      context.commit(storeTypes.Comments.AddRespMutation, { ...payload, id });
    },

    async [storeTypes.Comments.RemoveRespAction](context, payload: {
      commentId: string; id: string;
    }) {
      isSet(context.state.commentsForArticlWithUrlTitle);
      await api.delete(`article/${context.state.commentsForArticlWithUrlTitle}/comments/${encodeURIComponent(payload.commentId)}/resps/${encodeURIComponent(payload.id)}`, {
        sendKey: true,
      });
      context.commit(storeTypes.Comments.RemoveRespMutation, payload);
    },

    async [storeTypes.Comments.LoadAllAction](context) {
      isSet(context.state.commentsForArticlWithUrlTitle);
      if (context.state.comments?.length) {
        return;
      }
      const { comments }: { comments: CommentsModuleState['comments'] } = await api.get(`article/${context.state.commentsForArticlWithUrlTitle}/comments`);
      comments.forEach((comment) => context.commit(storeTypes.Comments.AddMutation, comment));
    },

  },
} as Module<CommentsModuleState, RootState>;
