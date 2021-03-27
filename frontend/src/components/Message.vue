<template>
  <div class="message center-items">
    {{ text }}
    <div class="space"></div>
    <button @click="$emit('closeMessage')">Close</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['text'],
  emits: ['closeMessage'],
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
