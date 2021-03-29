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
  commentsForArticlWitheUrl: string | null;
}

export const commentsModule = {
  namespaced: true,
  data(): CommentsModuleState {
    return {
      comments: [],
      commentsForArticlWitheUrl: null,
    };
  },
  mutations: {
    [storeTypes.Comments.SetArticleUrl](state, payload: { articleUrl: string }) {
      state.commentsForArticlWitheUrl = payload.articleUrl;
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
  },
  actions: {
    async [storeTypes.Comments.AddAction](context, payload: AddCommentUncomittedPayload) {
      const { id } = await api.post(`article/${context.state.commentsForArticlWitheUrl}/comments`, {
        content: payload, sendKey: true,
      });
      context.commit(storeTypes.Comments.AddMutation, id);
    },
    async [storeTypes.Comments.RemoveAction](context, payload: { id: string }) {
      await api.delete(`article/${context.state.commentsForArticlWitheUrl}/comments/${payload.id}`, { sendKey: true });
      context.commit(storeTypes.Comments.RemoveMutation, payload);
    },
    async [storeTypes.Comments.AddRespAction](context, payload: AddRespUncomittedPayload) {
      const { id } = await api.post(`article/${context.state.commentsForArticlWitheUrl}/comments/${payload.commentId}/resps`, {
        content: payload, sendKey: true,
      });
      context.commit(storeTypes.Comments.AddRespMutation, { id, ...payload });
    },
    async [storeTypes.Comments.RemoveRespAction](context, payload: {
      commentId: string; id: string;
    }) {
      await api.delete(`article/${context.state.commentsForArticlWitheUrl}/comments/${payload.commentId}/resps/${payload.id}`, {
        sendKey: true,
      });
      context.commit(storeTypes.Comments.RemoveRespMutation, payload);
    },
    async [storeTypes.Comments.LoadAllAction](context) {
      if (context.state.comments?.length) {
        return;
      }
      const { comments }: { comments: CommentsModuleState['comments'] } = await api.get(`article/${context.state.commentsForArticlWitheUrl}/comments`);
      comments.forEach((comment) => context.commit(storeTypes.Comments.AddMutation, comment));
    },
  },
} as Module<CommentsModuleState, RootState>;
