<template>
  <div class="message center-items">
    {{ text }}
    <div class="space"></div>
    <button @click="close">Close</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';

export default defineComponent({
  props: {
    id: {
      type: String,
      reqiured: true,
    },
    text: {
      type: String,
      reqiured: true,
    },
  },
  setup(props) {
    const store = useStore();
    function close() {
      store.commit(storeTypes.MessagePopMutation, { id: props.id });
    }
    return {
      close,
    };
  },
});
</script>

<style scoped>
.message {
  background: var(--light-blue);
  border-radius: 3px;
  padding: 6px 12px;
  margin-bottom: 8px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14),
  0 3px 3px -2px rgba(0,0,0,0.12),
  0 1px 8px 0 rgba(0,0,0,0.20);
}
</style>
