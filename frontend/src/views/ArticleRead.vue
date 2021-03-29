<template>
  <TheArticle v-bind="article" :isPlaceholder="!loaded"/>
  <router-link
  :to="{ name: 'AdminConsole', params: { article: article.urlTitle } }"
  v-if="userIsAdmin"
  class="button">
    Open in Admin console
  </router-link>
  <Comments
  v-if="false"
  :articleUrlTitle="article.urlTitle"/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';
import TheArticle from '@/components/TheArticle.vue';
import Comments from '@/components/TheCommentSection.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    TheArticle,
    Comments,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const urlTitle = computed(() => route.params.article as string);

    const loaded = computed(() => !!store.state.articles.articles[urlTitle.value]);

    const article = computed(() => {
      store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.LoadFullAction}`, { urlTitle: urlTitle.value });
      if (loaded.value) {
        return { ...store.state.articles.articles[urlTitle.value], urlTitle: urlTitle.value };
      }
      // placeholder
      return {
        published: '2021-01-01',
        title: 'Lorem ipsum dolor sit amet',
        tag: 'Lorem',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat`,
        urlTitle: '',
      };
    });

    const userIsAdmin = computed(() => store.state.auth.userIsAdmin);

    return {
      loaded,
      article,
      userIsAdmin,
    };
  },
});
</script>
