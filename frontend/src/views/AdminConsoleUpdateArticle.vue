<template>
  <template v-if="article.content">
    <BaseInput v-model="article.title" label="Title"/>
    <br/>
    <BaseInput v-model="article.tag" label="Tag" size="small"/>
    <div class="space"></div>
    <BaseInput v-model="article.description" label="Description"/>
    <TheArticle v-bind="article"/>
    <button @click="submitUpdate">Submit</button>
    <div class="space"></div>
    <BaseFileInput v-model="content">Load content from file</BaseFileInput>
    <div class="space"></div>
    <button @click="deleteArticle">Delete</button>
    <div class="space"></div>
  </template>
  <router-link class="button" to="/admin-console">Cancel</router-link>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  toRef,
  reactive,
} from 'vue';
import TheArticle from '@/components/TheArticle.vue';
import BaseInput from '@/components/BaseInput.vue';
import { useRoute } from 'vue-router';
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';
import BaseFileInput from '@/components/BaseFileInput.vue';

export default defineComponent({
  components: { TheArticle, BaseInput, BaseFileInput },
  setup() {
    const store = useStore();
    const route = useRoute();

    const urlTitle = computed(() => route.params.article as string);

    const originalArticle = computed(() => {
      store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.LoadFullAction}`, { urlTitle: urlTitle.value });
      return store.state.articles.articles[urlTitle.value];
    });

    const article = reactive({
      title: null,
      description: null,
      tag: null,
      published: null,
      content: null,
    });

    watch(originalArticle, (originalArticleValue) => {
      Object.assign(article, originalArticleValue);
    });

    function submitUpdate() {
      if (article.content) {
        store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.UpdateAction}`, {
          ...article,
          urlTitle: urlTitle.value,
        });
      }
    }

    function deleteArticle() {
      store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.DeleteAction}`, {
        urlTitle: urlTitle.value,
      });
    }

    const content = toRef(article, 'content');

    return {
      article,
      content,
      submitUpdate,
      deleteArticle,
    };
  },
});
</script>
