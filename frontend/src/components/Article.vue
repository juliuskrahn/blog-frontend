<template>
  <div class="article">
    <header>
      <p class="published" :class="{placeholder: isPlaceholder}">{{ publishedFormatted }}</p>
      <h1 class="title" :class="{placeholder: isPlaceholder}">{{ title }}</h1>
      <p class="details" :class="{placeholder: isPlaceholder}">
        <Tag :name="tag"/>
        {{ description }}
      </p>
    </header>
    <div class="content markdown-body"
    :class="{placeholder: isPlaceholder}"
    v-html="contentFormatted"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import useArticleFormatter from '@/composables/articleFormatter';
import Tag from '@/components/Tag.vue';

export default defineComponent({
  components: {
    Tag,
  },
  name: 'Article',
  props: {
    urlTitle: String,
    title: String,
    tag: String,
    description: String,
    content: {
      required: true,
      type: String,
    },
    published: { // date
      required: true,
      type: String,
    },
    isPlaceholder: Boolean,
  },
  setup(props) {
    const { published, content } = toRefs(props);
    const { publishedFormatted, contentFormatted } = useArticleFormatter(published, content);
    return {
      publishedFormatted,
      contentFormatted,
    };
  },
});
</script>

<style scoped>
.article {
  padding: 32px 0;
}

header {
  margin-bottom: 42px;
}

.published, .title, .details {
  margin-bottom: 6px;
}

.published {
  color: var(--grey);
}

.title {
  font-size: 42px;
}

@import '../assets/hljs_atom_light.css';
@import '../assets/md.css';
</style>
