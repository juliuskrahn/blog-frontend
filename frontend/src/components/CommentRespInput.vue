<template>
  <CommentBaseInput
  :label="'Reply'"
  @submitInput="submitInput"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';
import CommentBaseInput from '@/components/CommentBaseInput.vue';

export default defineComponent({
  components: { CommentBaseInput },
  props: {
    commentId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    function submitInput(event: { author: string; content: string }) {
      store.dispatch(`${storeTypes.Comments.Name}/${storeTypes.Comments.AddRespAction}`, {
        ...event, commentId: props.commentId,
      });
    }
    return {
      submitInput,
    };
  },
});
</script>
