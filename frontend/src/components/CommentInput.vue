<template>
  <div class="comment-input">
    <div class="fields">
      <div class="container">
        <textarea
        v-model="value"
        :class="{ expand: value }"
        type="text"
        placeholder="&nbsp"
        maxlength="420">
        </textarea>
        <label>{{ label }}</label>
      </div>
      <BaseInput v-model="author" label="Your name" v-show="value" size="small"/>
    </div>
    <button @click="submitInput" class="submit" v-show="value">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseInput from './BaseInput.vue';

export default defineComponent({
  components: { BaseInput },
  props: ['modelValue', 'label'],
  emits: ['update:modelValue', 'submitInput'],
  data() {
    return {
      author: window.localStorage.getItem('author') || '',
    };
  },
  methods: {
    submitInput() {
      this.$emit('submitInput', this.author);
      window.localStorage.setItem('author', this.author);
    },
  },
  computed: {
    value: {
      get(): string {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});
</script>

<style scoped>
.comment-input {
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
