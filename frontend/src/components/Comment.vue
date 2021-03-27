<template>
  <div class="comment">
    <header>
      <p :class="{ admin: author==='admin' }">{{ author }}</p>
      <p class="header-separator">&middot;</p>
      <p class="commented">{{ commented(id) }}</p>
    </header>
    <p class="content">{{ content }}</p>
    <button @click="$emit('deleteComment')" v-if="userIsAdmin">Delete</button>
    <CommentInput
    class="create-reply"
    v-if="showReplyInput"
    v-model="replyInputVal"
    @submitInput="createReply"
    label="Reply"/>
    <button
    @click="showReplyInput = !showReplyInput"
    class="reply-ctrl normal-link">
      {{ showReplyInput ? 'Cancel' : 'Reply' }}
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
        @click="$emit('deleteResp', {commentId: id, respId})"
        v-if="userIsAdmin">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommentInput from '@/components/CommentInput.vue';

export default defineComponent({
  name: 'Comment',
  components: { CommentInput },
  inject: ['userIsAdmin'],
  props: ['id', 'content', 'author', 'resps'],
  emits: ['createResp', 'deleteComment', 'deleteResp'],
  data() {
    return {
      replyInputVal: '',
      showReplyInput: false,
    };
  },
  methods: {
    createReply(author: string) {
      this.$emit('createResp', {
        author,
        content: this.replyInputVal,
        commentId: this.id,
      });
      this.showReplyInput = false;
    },
    commented(id: string) {
      const datetime = new Date(id.substring(0, id.search('#')));
      return datetime.toDateString();
    },
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

.reply-ctrl {
  color: black;
  float: right;
}

.admin {
  color: var(--blue);
}

.create-reply {
  padding-left: 16px;
}
</style>
