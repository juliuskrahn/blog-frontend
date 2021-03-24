<template>
  <router-link
  class="tag link"
  :class="{highlight, placeholder: isPlaceholder}"
  :to="name === '&larr; all' || !name ? '/articles' : '/tag/'+name">
    {{ name }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tag',
  props: ['name', 'highlight', 'isPlaceholder'],
});
</script>

<style scoped>
.tag {
  height: 20px;
  font-size: 13px;
  background: rgba(0, 135, 107, 0.2);
  border-radius: 4px;
  padding-left: 6px;
  padding-right: 6px;
  margin: 0 6px;
  display: inline-flex;
  align-items: center;
}

.tag.highlight {
  background: rgba(206, 205, 202, 0.5);
}

.tag.placeholder {
  color: rgba(0, 0, 0, 0) !important;
}
</style>
