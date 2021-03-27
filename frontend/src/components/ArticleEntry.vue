<template>
  <div class="article" :class="{placeholder: isPlaceholder}">
    <div class="header">
      <router-link class="title normal-link" :to="'/article/'+urlTitle">
        <h2>{{ title }}</h2>
      </router-link>
      <p class="published">{{ publishedFormatted }}</p>
    </div>
    <p><Tag :name="tag"/>{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tag from '@/components/Tag.vue';

export default defineComponent({
  name: 'ArticleEntry',
  components: {
    Tag,
  },
  props: {
    urlTitle: String,
    title: String,
    tag: String,
    description: String,
    published: String, // date
    isPlaceholder: Boolean,
  },
  computed: {
    publishedFormatted() {
      const published = this.published as string;
      const date = new Date(published);
      return date.toDateString();
    },
  },
});
</script>

<style scoped>
.article {
  margin-bottom: 16px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.title {
  margin-right: 8px;
}

.published {
  font-size: 13px;
  color: var(--grey);
}
</style>
