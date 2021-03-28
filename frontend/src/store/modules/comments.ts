import { Module } from 'vuex';
import { State as RootState, store } from "../";
import * as storeTypes from "../storeTypes";
import { api } from '@/service/api';

interface BaseComment {
  author: string;
  content: string;
}

interface Resp extends BaseComment { }

interface AddRespUncomittedPayload extends Resp {
  commentId: string;
}

interface AddRespPayload extends Resp {
  commentId: string;
  id: string;
}

interface Comment extends BaseComment {
  id: string;
  resps: {
    [id: string]: Resp;
  }
}

interface AddCommentUncomittedPayload extends Comment {
  id: never;
}

interface State {
  comments: Array<Comment>;
  articleUrl: string | null;
}

export default {
  namespaced: true,
  data(): State {
    return {
      comments: [],
      articleUrl: null,
    };
  },
  mutations: {
    [storeTypes.Comments.SetArticleUrl](state, payload: { articleUrl: string }) {
      state.articleUrl = payload.articleUrl;
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
    [storeTypes.Comments.RemoveRespMutation](state, payload: { commentId: string, id: string }) {
      const index = state.comments.findIndex((comment) => comment.id === payload.commentId);
      delete state.comments[index].resps[payload.id];
    },
  },
  actions: {
    async [storeTypes.Comments.AddAction](context, payload: AddCommentUncomittedPayload) {
      const { id } = await api.post(`article/${context.state.articleUrl}/comments`, {
        content: payload, sendKey: true
      });
      context.commit(storeTypes.Comments.AddMutation, id);
    },
    async [storeTypes.Comments.RemoveAction](context, payload: { id: string }) {
      await api.delete(`article/${context.state.articleUrl}/comments/${payload.id}`, { sendKey: true });
      context.commit(storeTypes.Comments.RemoveMutation, payload);
    },
    async [storeTypes.Comments.AddRespAction](context, payload: AddRespUncomittedPayload) {
      const { id } = await api.post(`article/${context.state.articleUrl}/comments/${payload.commentId}/resps`, {
        content: payload, sendKey: true
      });
      context.commit(storeTypes.Comments.AddRespMutation, { id, ...payload });
    },
    async [storeTypes.Comments.RemoveRespAction](context, payload: { commentId: string, id: string }) {
      await api.delete(`article/${context.state.articleUrl}/comments/${payload.commentId}/resps/${payload.id}`, { sendKey: true });
      context.commit(storeTypes.Comments.RemoveRespMutation, payload);
    },
    async [storeTypes.Comments.LoadAllAction](context) {
      const { comments } = await api.get(`article/${context.state.articleUrl}/comments`);
      for (let comment of comments) {
        context.commit(storeTypes.Comments.AddMutation, comment);
      }
    },
  }
} as Module<State, RootState>;
