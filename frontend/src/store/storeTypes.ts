export const MessagePushMutation = 'messagePush';
export const MessagePopMutation = 'messagePop';

export const Auth = {
  LoginAction: 'login',
  LogoutAction: 'logout',
  LoginMutation: 'login',
  LogoutMutation: 'logout',
};

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
  StoreAllTagsMutation: 'storeAllTags',
  StoreAllTagsAction: 'storeAllTags',
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
  LoadAllAction: 'loadAll',
};
