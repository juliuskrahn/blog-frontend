<template>
  <div class="article">
    <header>
      <p class="published" :class="{placeholder: placeholder}">{{ publishedFormatted }}</p>
      <h1 class="title" :class="{placeholder: placeholder}">{{ title }}</h1>
      <p class="details" :class="{placeholder: placeholder}">
        <Tag :name="tag"/>
        {{ description }}
      </p>
    </header>
    <div class="content markdown-body"
    :class="{placeholder: placeholder}"
    v-html="renderedText"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tag from '@/components/Tag.vue';
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import Hljs from 'highlight.js';

export default defineComponent({
  components: {
    Tag,
  },
  name: 'Article',
  props: ['placeholder', 'published', 'title', 'tag', 'description', 'content', 'urlTitle'],
  data() {
    return {
      md: MarkdownIt('default', {
        html: true,
        linkify: true,
        typographer: true,
        highlight(str, lang) {
          if (lang && Hljs.getLanguage(lang)) {
            try {
              return Hljs.highlight(lang, str, true).value;
            } catch (e) { console.error(e); }
          }
          return '';
        },
      }).use(MarkdownItAnchor, {}),
    };
  },
  computed: {
    renderedText() {
      const md = this.md as MarkdownIt;
      const content = this.content as string;
      return md.render(content);
    },
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
