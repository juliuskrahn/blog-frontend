<template>
  <div class="comments">
    <button
    @click="show = !show"
    class="open-comments-button normal-link">
      Comments
    </button>
    <template v-if="show">
      <div class="comment-input-container">
        <CommentInput/>
      </div>
      <div class="comments-list">
        <Comment
        v-for="comment in comments"
        :key="comment.id"
        v-bind="comment"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  ref,
} from 'vue';
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';
import Comment from '@/components/Comment.vue';
import CommentInput from '@/components/CommentInput.vue';

export default defineComponent({
  components: {
    Comment,
    CommentInput,
  },
  props: {
    articleUrlTitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    store.commit(`${storeTypes.Comments.Name}/${storeTypes.Comments.SetArticleUrlTitle}`, {
      articleUrlTitle: props.articleUrlTitle,
    });

    const show: Ref<boolean> = ref(false);

    const comments = computed(() => {
      if (show.value) {
        store.dispatch(`${storeTypes.Comments.Name}/${storeTypes.Comments.LoadAllAction}`);
      }
      return store.state.comments.comments;
    });

    return {
      comments,
      show,
    };
  },
});
</script>

<style scoped>
.comments {
  border-top: 3px solid var(--dark-beige);
  margin: 32px 0;
}

.open-comments-button {
  color: var(--dark-beige);
  float: right;
}

.comment-input-container {
  margin: 32px auto 36px auto;
  width: 98%;
}

.comments-list {
  margin: 16px auto 0 auto;
  width: 98%;
}
</style>
