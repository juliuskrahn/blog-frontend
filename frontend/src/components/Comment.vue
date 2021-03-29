<template>
  <div class="comment">
    <header>
      <p :class="{ admin: author==='admin' }">{{ author }}</p>
      <p class="header-separator">&middot;</p>
      <p class="commented">{{ commented(id) }}</p>
    </header>
    <p class="content">{{ content }}</p>
    <button @click="deleteComment" v-if="userIsAdmin">Delete</button>
    <CommentRespInput
    :commentId="id"
    class="resp-input-container"
    v-if="showInput"/>
    <button
    @click="showInput = !showInput"
    class="toggle-input normal-link">
      {{ showInput ? 'Cancel' : 'Reply' }}
    </button>
    <div class="resps">
      <div class="resp" v-for="(resp, respId) in resps" :key="respId">
        <header>
          <p :class="{ admin: resp.author==='admin' }">{{ resp.author }}</p>
          <p class="header-separator">&middot;</p>
          <p class="commented">{{ commented(respId) }}</p>
        </header>
        <p class="content">{{ resp.content }}</p>
        <button
        @click="deleteResp(respId)" v-if="userIsAdmin">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  ref,
} from 'vue';
import CommentRespInput from '@/components/CommentRespInput.vue';
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';

export default defineComponent({
  components: { CommentRespInput },
  props: ['id', 'content', 'author', 'resps'],
  setup(props) {
    const store = useStore();

    const userIsAdmin = computed(() => store.state.auth.userIsAdmin);

    function deleteComment() {
      store.dispatch(`${storeTypes.Comments.Name}/${storeTypes.Comments.RemoveAction}`, {
        id: props.id,
      });
    }

    function deleteResp(respId: string) {
      store.dispatch(`${storeTypes.Comments.Name}/${storeTypes.Comments.RemoveRespAction}`, {
        commentId: props.id, id: respId,
      });
    }

    const showInput: Ref<boolean> = ref(false);

    function commented(id: string) {
      const datetime = new Date(id.substring(0, id.search('#')));
      return datetime.toDateString();
    }

    return {
      userIsAdmin,
      deleteComment,
      deleteResp,
      showInput,
      commented,
    };
  },
});
</script>

<style scoped>
.comment {
  margin: 36px 0;
  border-bottom: 1px solid var(--dark-beige);
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.resps {
  padding: 16px 0 0 16px;
}

.resp {
  margin: 8px 0;
}

header {
  display: flex;
  align-items: center;
}

.header-separator {
  margin: 0 4px;
}

.commented {
  color: var(--grey);
  font-size: 14px;
}

.toggle-input {
  color: black;
  float: right;
}

.admin {
  color: var(--blue);
}

.resp-input-container {
  padding-left: 16px;
}
</style>
