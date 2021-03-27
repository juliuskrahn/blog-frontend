<template>
  <div class="comments">
    <button
    @click="show = !show"
    class="comments-button normal-link">
      {{ comments.length }} Comment(s)
    </button>
    <template v-if="show">
      <div class="create-comment">
        <CommentInput
        v-model="commentInputVal"
        @submitInput="createComment"
        label="What are your thoughts?"/>
      </div>
      <div class="list">
        <Comment
        v-for="comment in comments"
        :key="comment.id"
        v-bind="comment"
        @createResp="createResp"
        @deleteComment="deleteComment(comment.id)"
        @deleteResp="deleteResp"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Comment from '@/components/Comment.vue';
import CommentInput from '@/components/CommentInput.vue';

export default defineComponent({
  components: {
    Comment,
    CommentInput,
  },
  inject: ['userIsAdmin'],
  props: ['articleUrlTitle'],
  data() {
    return {
      comments: [] as Array<{
        id: string;
        author: string;
        content: string;
        resps: {
          [key: string]: {
            author: string;
            content: string;
          };
        };
      }>,
      show: false,
      commentInputVal: '',
    };
  },
  methods: {
    createComment(_author: string) {
      const author = this.authorName(_author);
      const content = this.commentInputVal;
      fetch(`https://api.juliuskrahn.com/article/${this.articleUrlTitle}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          author,
          content,
          key: window.localStorage.getItem('key'),
        }),
      })
        .then(async (reqResponse) => {
          if (reqResponse.ok) {
            const body = await reqResponse.json();
            this.comments.unshift({
              author,
              content,
              resps: {},
              id: body.id,
            });
            if (this.commentInputVal === content) {
              this.commentInputVal = '';
            }
          } else {
            this.$emit('message', 'Error');
          }
        });
    },
    createResp(resp: { author: string; content: string; commentId: string}) {
      const author = this.authorName(resp.author);
      fetch(`https://api.juliuskrahn.com/article/${this.articleUrlTitle}/comments/${encodeURIComponent(resp.commentId)}/resps`, {
        method: 'POST',
        body: JSON.stringify({
          author,
          content: resp.content,
          key: window.localStorage.getItem('key'),
        }),
      })
        .then(async (reqResponse) => {
          if (reqResponse.ok) {
            const body = await reqResponse.json() as { id: string };
            const commentIndex = this.comments.findIndex(
              (comment) => comment.id === resp.commentId,
            );
            if (commentIndex !== -1) {
              this.comments[commentIndex].resps[body.id] = {
                author,
                content: resp.content,
              };
            }
          } else {
            this.$emit('message', 'Error');
          }
        });
    },
    deleteComment(id: string) {
      fetch(`https://api.juliuskrahn.com/article/${this.articleUrlTitle}/comments/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        body: JSON.stringify({ key: window.localStorage.getItem('key') }),
      })
        .then((resp) => {
          if (resp.ok) {
            const commentIndex = this.comments.findIndex(
              (comment) => comment.id === id,
            );
            this.comments.splice(commentIndex, 1);
          }
        });
    },
    deleteResp(event: { commentId: string; respId: string }) {
      fetch(`https://api.juliuskrahn.com/article/${this.articleUrlTitle}/comments/${encodeURIComponent(event.commentId)}/resps/${encodeURIComponent(event.respId)}`, {
        method: 'DELETE',
        body: JSON.stringify({ key: window.localStorage.getItem('key') }),
      })
        .then((resp) => {
          if (resp.ok) {
            const commentIndex = this.comments.findIndex(
              (comment) => comment.id === event.commentId,
            );
            delete this.comments[commentIndex].resps[event.respId];
          }
        });
    },
    authorName(name: string) {
      if (!name) {
        return 'anonymous';
      }
      if (name === 'admin' && !(this as unknown as {userIsAdmin: {value: boolean}}).userIsAdmin.value) {
        return `${name}#not-the-real-admin`;
      }
      return name;
    },
  },
  mounted() {
    // load comments
    fetch(`https://api.juliuskrahn.com/article/${this.articleUrlTitle}/comments`)
      .then(async (resp) => {
        if (resp.ok) {
          const body = await resp.json();
          this.comments = body.comments;
        }
      });
  },
});
</script>

<style scoped>
.comments {
  border-top: 3px solid var(--dark-beige);
  margin: 32px 0;
}

.comments-button {
  color: var(--dark-beige);
  float: right;
}

.create-comment {
  margin: 32px auto 36px auto;
  width: 98%;
}

.list {
  margin: 16px auto 0 auto;
  width: 98%;
}
</style>
