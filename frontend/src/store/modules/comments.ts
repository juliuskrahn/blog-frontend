import { Module } from 'vuex';
import { State as RootState } from "../";
import * as storeTypes from "../storeTypes";
import { api } from '@/service/api';

interface BaseComment {
  author: string;
  content: string;
}

interface Resp extends BaseComment { }

interface Comment extends BaseComment {
  id: string;
  resps: {
    [id: string]: Resp;
  }
}

interface State {
  comments: Array<Comment>;
  forArticle: string | null;
}

export default {
  namespaced: true,
  data(): State {
    return {
      comments: [],
      forArticle: null,
    };
  },
  mutations: {
    [storeTypes.Comments.AddMutation](state, payload) {

    },
    [storeTypes.Comments.RemoveMutation](state, payload) {

    },
    [storeTypes.Comments.AddRespMutation](state, payload) {

    },
    [storeTypes.Comments.RemoveRespMutation](state, payload) {

    },
  },
  actions: {
    [storeTypes.Comments.AddAction](context, payload) {

    },
    [storeTypes.Comments.RemoveAction](context, payload) {

    },
    [storeTypes.Comments.AddRespAction](context, payload) {

    },
    [storeTypes.Comments.RemoveRespAction](context, payload) {

    },
    [storeTypes.Comments.LoadAllAction](context, payload) {

    },
  }
} as Module<State, RootState>;
