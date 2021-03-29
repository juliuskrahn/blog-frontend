<template>
  <div class="input">
    <div class="fields">
      <div class="container">
        <textarea
        v-model="content"
        :class="{ expand: !!content }"
        type="text"
        placeholder="&nbsp"
        maxlength="420">
        </textarea>
        <label>{{ label }}</label>
      </div>
      <BaseInput
      :modelValue="author"
      @update:modelValue="updateAuthor"
      label="Your name"
      v-show="!!content"
      size="small"/>
    </div>
    <button class="submit" v-show="!!content" @click="submitInput">Submit</button>
  </div>
</template>

<script lang="ts">
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';
import { computed, defineComponent, ref } from 'vue';
import BaseInput from './BaseInput.vue';

export default defineComponent({
  components: { BaseInput },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['submitInput'],
  setup(props, { emit }) {
    const store = useStore();

    const author = computed(() => store.state.comments.authorName);

    function updateAuthor(newAuthorName: string) {
      store.commit(`${storeTypes.Comments.Name}/${storeTypes.Comments.SetAuthorName}`, { authorName: newAuthorName });
    }

    const content = ref('');

    function submitInput() {
      if (content.value === 'admin' && !store.state.auth.userIsAdmin) {
        content.value = 'admin#not-the-real-admin';
      }
      emit('submitInput', { author: author.value, content: content.value });
      content.value = '';
    }

    return {
      author,
      updateAuthor,
      content,
      submitInput,
    };
  },
});
</script>

<style scoped>
.input {
  display: flex;
  align-items: flex-start;
}

.submit {
  margin-top: 15px;
  margin-left: 24px;
}

.fields {
  width: 100%;
}

/* Textarea */

.container {
  position: relative;
  padding: 15px 2px 2px 0;
  width: 100%;
}

textarea {
  height: 42px;
  width: 100%;
  font-size: 14px;
  line-height: inherit;
  color: inherit;
  outline: none;
  border: none;
  border-radius: 3px;
  padding: 10px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px inset;
  resize: none;
  font-family: 'Roboto', sans-serif;
}

textarea.expand {
  height: 128px;
}

textarea:focus {
  box-shadow: rgb(46 170 220 / 70%) 0px 0px 0px 1px inset, rgb(46 170 220 / 40%) 0px 0px 0px 2px;
}

label {
  position: absolute;
  pointer-events: none;
  color: var(--grey);
  transition: left .1s ease-in-out;
  font-size: 14px;
  background: var(--background);
  padding: 0 3px;
  top: 4px;
  left: 8px;
}

textarea:placeholder-shown + label {
  top: 27px;
  left: 0;
  padding: 0 0 0 6px;
  background: transparent;
}

textarea:focus + label {
  padding: 0 3px;
  top: 4px;
  left: 8px;
  color: var(--orange);
  background: var(--background);
}
</style>
