export const MessagePushMutation = 'messagePush';
export const MessagePopMutation = 'messagePop';

export const Auth = {
  Name: 'auth',
  LoginAction: 'login',
  LogoutAction: 'logout',
  LoginMutation: 'login',
  LogoutMutation: 'logout',
  TryToLoginAgainAction: 'tryToLoginAgain',
};

export const Articles = {
  Name: 'articles',
  PutMutation: 'put',
  RemoveMutation: 'remove',
  LoadFullAction: 'loadFull',
  LoadAllAction: 'loadAll',
  LoadAllWithTagAction: 'loadAllWithTag',
  CreateAction: 'create',
  UpdateAction: 'update',
  DeleteAction: 'delete',
  PutAllTagsMutation: 'putAllTags',
  LoadAllTagsAction: 'loadAllTags',
  AllSortedDescByPublishedGetter: 'allSortedDescByPublished',
  AllWithTagSortedDescByPublishedGetter: 'allWithTagSortedDescByPublished',
  SetFlagsMutation: 'setFlags',
};

export const Comments = {
  Name: 'comments',
  SetArticleUrlTitle: 'setArticleUrl',
  AddMutation: 'add',
  RemoveMutation: 'remove',
  AddAction: 'add',
  RemoveAction: 'remove',
  AddRespMutation: 'addResp',
  RemoveRespMutation: 'removeResp',
  AddRespAction: 'addResp',
  RemoveRespAction: 'removeResp',
  LoadAllAction: 'loadAll',
};
