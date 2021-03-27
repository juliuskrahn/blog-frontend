<template>
  <TheAbout/>
  <div class="articles">
    <div class="tag-list">
      <Tag v-for="tag in tags"
      :key="tag" :name="tag"
      :highlight="$route.params.tag && tag!==$route.params.tag"
      :isPlaceholder="loadingTags"/>
      <Tag v-if="$route.params.tag"
      :name="'&larr; all'"
      class="all-articles-tag"/>
    </div>
    <div class="article-list">
      <ArticleItem v-for="article in articles"
      :key="article.url"
      v-bind="article"
      :isPlaceholder="loadingArticles"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticleItem from '@/components/ArticleItem.vue';
import Tag from '@/components/Tag.vue';
import TheAbout from '@/components/TheAbout.vue';

export default defineComponent({
  components: {
    ArticleItem,
    Tag,
    TheAbout,
  },
  data() {
    return {
      loadingTags: true,
      loadingArticles: true,
      // dummy data for loading placeholder...
      articles: Array(2).fill({
        urlTitle: '',
        title: 'Lorem ipsum',
        description: 'Lorem ipsum',
        tag: 'Lorem',
        published: '2021-01-01',
      }),
      tags: Array(1).fill('Lorem'),
    };
  },
  methods: {
    async getArticles() {
      let url: string;
      if (this.$route.params.tag) {
        url = `https://api.juliuskrahn.com/tag/${this.$route.params.tag}`;
      } else {
        url = 'https://api.juliuskrahn.com/article';
      }
      const resp = await fetch(url);
      const body = await resp.json();
      this.articles = body?.articles;
      this.loadingArticles = false;
    },
    async getTags() {
      const resp = await fetch('https://api.juliuskrahn.com/tag');
      const body = await resp.json();
      this.tags = body?.tags;
      this.loadingTags = false;
    },
  },
  watch: {
    $route(to: { name: string }) {
      if (to.name === 'Articles' || to.name === 'ArticlesWithTag') {
        this.loadingArticles = true;
        this.loadingTags = true;
        this.getArticles();
        this.getTags();
      }
    },
  },
  created() {
    this.getArticles();
    this.getTags();
  },
});
</script>

<style scoped>
.articles {
  display: grid;
  grid-template-columns: 80px auto;
  column-gap: 64px;
}

@media (max-width: 500px) {
  .articles {
    column-gap: 16px;
  }
}

.tag-list {
  border-right: 2px solid var(--light-beige);
}

.all-articles-tag {
  background: rgba(0, 120, 223, 0.2);
}
</style>
