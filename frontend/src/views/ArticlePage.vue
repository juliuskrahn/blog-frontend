<template>
  <Article v-bind="article" :placeholder="loading"/>
  <router-link
  :to="{ name: 'AdminConsole', params: { article: article.urlTitle } }"
  v-if="userIsAdmin"
  class="button">
    Open in Admin console
  </router-link>
  <Comments
  v-if="!loading"
  :articleUrlTitle="article.urlTitle"
  :userIsAdmin="userIsAdmin"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Article from '@/components/Article.vue';
import Comments from '@/components/Comments.vue';

export default defineComponent({
  components: {
    Article,
    Comments,
  },
  props: ['userIsAdmin'],
  name: 'ArticlePage',
  data() {
    return {
      // dummy data for loading placeholder...
      article: {
        published: '2021-01-01',
        title: 'Lorem ipsum dolor sit amet',
        tag: 'Lorem',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat`,
        urlTitle: '',
      },
      loading: true,
    };
  },
  methods: {
    async getArticle() {
      const resp = await fetch(`https://api.juliuskrahn.com/article/${this.$route.params.article}`);
      const body = await resp.json();
      this.article = body?.article;
      if (!this.article) {
        this.$router.push({ name: '404' });
      }
      this.loading = false;
    },
  },
  watch: {
    $route(to: { name: string; params: { article: string } },
      from: { params: { article: string } }) {
      if (to.name === 'ArticlePage' && to.params.article !== from.params.article) {
        this.loading = true;
        this.getArticle();
      }
    },
  },
  created() {
    this.getArticle();
  },
});
</script>
