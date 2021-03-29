<template>
  <input @change="load"
  class="file"
  :id="id"
  type="file">
  <label class="button" :for="id">
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { uuid4 } from '@/utils';

export default defineComponent({
  props: ['modelValue', 'update:modelValue'],
  setup(props, { emit }) {
    function load(event: { target: { files: FileList; value: string } }) {
      const reader = new FileReader();
      reader.addEventListener('load', (readFileEvent) => {
        emit('update:modelValue', readFileEvent.target?.result);
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
      });
      const file = event.target?.files[0];
      reader.readAsText(file);
    }

    return {
      id: uuid4(),
      load,
    };
  },
});
</script>
