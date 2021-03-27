<template>
  <div class="admin-console">
    <h1 class="title">admin-console/{{article?.urlTitle}}</h1>
    <template v-if="createMode && !article">
      <button @click="initArticle" v-if="createMode && !article">New article</button>
      <div class="space"></div>
      <button @click="logout">Logout</button>
    </template>
    <template v-else-if="article">
      <BaseInput v-model="article.title" label="Title"/>
      <div class="space"></div>
      <BaseInput v-model="article.urlTitle" v-if="createMode" label="URL Title" size="small"/>
      <br/>
      <BaseInput v-model="article.tag" label="Tag" size="small"/>
      <div class="space"></div>
      <BaseInput v-model="article.description" label="Description"/>
      <TheArticle v-bind="article"/>
      <button @click="submit">Submit</button>
      <div class="space"></div>
      <input @change="uploadArticleContentFromFile"
      class="file"
      id="fileInput"
      type="file">
      <label class="button" for="fileInput">Upload article content</label>
      <div class="space"></div>
      <button @click="deleteArticle" v-if="editMode">Delete</button>
      <div class="space"></div>
      <router-link class="button" to="/admin-console">Cancel</router-link>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheArticle from '@/components/TheArticle.vue';
import { RouteLocation } from 'vue-router';
import BaseInput from '../components/BaseInput.vue';

export default defineComponent({
  components: { TheArticle, BaseInput },
  inject: ['userIsAdmin'],
  emits: ['message', 'logout'],
  data() {
    return {
      article: null as (null | {
        title: string;
        urlTitle: string;
        description: string;
        tag: string;
        content: string; }),
      originalArticleUrlTitle: null as (null | string),
    };
  },
  computed: {
    editMode(): boolean {
      const route: RouteLocation = this.$route;
      return !!route.params.article;
    },
    createMode(): boolean {
      const route: RouteLocation = this.$route;
      return !route.params.article;
    },
  },
  methods: {
    initArticle() {
      this.article = {
        title: '',
        urlTitle: '',
        description: '',
        tag: '',
        content: '',
      };
    },
    uploadArticleContentFromFile(event: {target: {files: FileList; value: string}}) {
      const reader = new FileReader();
      reader.addEventListener('load', (rEvent) => {
        if (this.article) {
          this.article.content = rEvent.target?.result as string;
        }
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
      });
      const file = event.target?.files[0];
      reader.readAsText(file);
    },
    deleteArticle() {
      if (!this.article) {
        return;
      }
      fetch(`https://api.juliuskrahn.com/article/${this.article.urlTitle}`, {
        method: 'DELETE',
        body: JSON.stringify({ key: window.localStorage.getItem('key') }),
      })
        .then((resp) => {
          if (resp.ok) {
            this.$emit('message', 'Article deleted');
            this.$router.push({ name: 'AdminConsole' });
          } else {
            this.$emit('message', 'Error, couldn\'t delete article.');
          }
        });
    },
    submit() {
      if (this.editMode) {
        this.submitArticleUpdate();
      } else {
        this.submitArticleCreation();
      }
    },
    submitArticleUpdate() {
      if (!this.article || !this.originalArticleUrlTitle) {
        return;
      }
      fetch(`https://api.juliuskrahn.com/article/${this.originalArticleUrlTitle}`, {
        method: 'PATCH',
        body: JSON.stringify({ key: window.localStorage.getItem('key'), ...this.article }),
      })
        .then((resp) => {
          if (resp.ok) {
            this.$emit('message', 'Article updated');
            this.$router.push({ name: 'AdminConsole' });
          } else {
            this.$emit('message', 'Error, couldn\'t update article.');
          }
        });
    },
    submitArticleCreation() {
      if (!this.article) {
        return;
      }
      fetch('https://api.juliuskrahn.com/article', {
        method: 'POST',
        body: JSON.stringify({ key: window.localStorage.getItem('key'), ...this.article }),
      })
        .then((resp) => {
          if (resp.ok) {
            this.$emit('message', 'Article created');
            this.$router.push({ name: 'AdminConsole' });
          } else {
            this.$emit('message', 'Error, couldn\'t create article.');
          }
        });
    },
    logout() {
      this.$emit('logout');
      this.$emit('message', 'Logged out');
      this.$router.push({ name: 'Articles' });
    },
    async getArticle() {
      const resp = await fetch(`https://api.juliuskrahn.com/article/${this.$route.params.article}`);
      const body = await resp.json();
      this.article = body?.article;
      if (this.article) {
        this.originalArticleUrlTitle = this.article.urlTitle;
      }
    },
  },
  watch: {
    $route(to: { name: string; params: { article: string } },
      from: { params: { article: string } }) {
      if (to.name === 'AdminConsole' && to.params.article && to.params.article !== from.params.article) {
        this.getArticle();
      } else if (!to.params.article) {
        this.article = null;
      }
    },
  },
  created() {
    if (!(this as unknown as {userIsAdmin: {value: boolean}}).userIsAdmin.value) {
      this.$router.push({ name: '404' });
    } else if (this.editMode) {
      this.getArticle();
    }
  },
});
</script>

<style scoped>
.title {
  color: var(--blue);
}
</style>
