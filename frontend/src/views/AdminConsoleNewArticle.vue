<template>
  <BaseInput v-model="article.title" label="Title"/>
  <div class="space"></div>
  <BaseInput v-model="article.urlTitle" label="URL title" size="small"/>
  <br/>
  <BaseInput v-model="article.tag" label="Tag" size="small"/>
  <div class="space"></div>
  <BaseInput v-model="article.description" label="Description"/>
  <TheArticle v-bind="article"/>
  <button @click="submitNewArticle">Submit</button>
  <div class="space"></div>
  <BaseFileInput v-model="content">Load content from file</BaseFileInput>
  <div class="space"></div>
  <router-link class="button" to="/admin-console">Cancel</router-link>
</template>

<script lang="ts">
import {
  defineComponent,
  toRef,
  reactive,
} from 'vue';
import TheArticle from '@/components/TheArticle.vue';
import BaseInput from '@/components/BaseInput.vue';
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';
import BaseFileInput from '@/components/BaseFileInput.vue';

export default defineComponent({
  components: { TheArticle, BaseInput, BaseFileInput },
  setup() {
    const store = useStore();

    const article = reactive({
      urlTitle: '',
      title: '',
      description: '',
      tag: '',
      published: '',
      content: '',
    });

    function submitNewArticle() {
      if (article.content) {
        store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.CreateAction}`, {
          ...article,
        });
      }
    }

    const content = toRef(article, 'content');

    return {
      article,
      content,
      submitNewArticle,
    };
  },
});
</script>
