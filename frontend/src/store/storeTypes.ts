export const LoginAction = 'login';
export const LogoutAction = 'logout';
export const LoginMutation = 'login';
export const LogoutMutation = 'logout';

export const MessagePushMutation = 'messagePush';
export const MessagePopMutation = 'messagePop';

export const Articles = {
  _prefix: 'articles',
  PutMutation: 'put',
  RemoveMutation: 'remove',
  LoadFullAction: 'loadFull',
  LoadAllAction: 'loadAll',
  LoadAllWithTagAction: 'loadAllWithTag',
  CreateAction: 'create',
  UpdateAction: 'update',
  DeleteAction: 'delete',
  AllSortedDescByPublishedGetter: 'allSortedDescByPublished',
  AllWithTagSortedDescByPublishedGetter: 'allWithTagSortedDescByPublished'
};

export const Comments = {
  _prefix: 'comments',
  AddMutation: 'add',
  RemoveMutation: 'remove',
  AddAction: 'add',
  RemoveAction: 'remove',
  AddRespMutation: 'addResp',
  RemoveRespMutation: 'removeResp',
  AddRespAction: 'addResp',
  RemoveRespAction: 'removeResp',
  LoadAll: 'loadAll',
  AllSortedDescByCommentedGetter: 'allSortedDescByCommented',
};
