<template>
  <TheAbout/>
  <div class="articles">
    <div class="tag-list">
      <Tag v-for="tag in tags"
      :key="tag"
      :name="tag"
      :highlight="tag === filterTag"
      :isPlaceholder="!loadedTags"/>
      <Tag v-if="filterTag"
      :name="'&larr; all'"
      class="all-articles-tag"/>
    </div>
    <div class="article-list">
      <ArticleItem v-for="article in articles"
      :key="article.url"
      v-bind="article"
      :isPlaceholder="!loadedArticles"/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
} from 'vue';
import { useRoute } from 'vue-router';
// eslint-disable-next-line
import useStore from '@/composables/store'; // import cycle
import * as storeTypes from '@/store/storeTypes';
import ArticleItem from '@/components/ArticleItem.vue';
import Tag from '@/components/Tag.vue';
import TheAbout from '@/components/TheAbout.vue';

export default defineComponent({
  components: {
    ArticleItem,
    Tag,
    TheAbout,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const filterTag = computed(() => (route.params.tag ? route.params.tag as string : null));

    const loadedArticles = computed(() => {
      const loadedAll = store.state.articles.flags.loadedAllArticles;
      const loadedFiltered = filterTag.value
      && store.state.articles.flags.loadedAllArticlesWithTags.includes(filterTag.value);
      return loadedAll || loadedFiltered;
    });

    const articles = computed(() => {
      let get: Function;
      if (filterTag.value) {
        store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.LoadAllWithTagAction}`, { tag: filterTag.value });
        get = () => store.getters[`${storeTypes.Articles.Name}/${storeTypes.Articles.AllWithTagSortedDescByPublishedGetter}`](filterTag.value);
      } else {
        store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.LoadAllAction}`);
        get = () => store.getters[`${storeTypes.Articles.Name}/${storeTypes.Articles.AllSortedDescByPublishedGetter}`];
      }
      if (loadedArticles.value) {
        return get();
      }
      // placeholder
      return Array(2).fill({
        urlTitle: '',
        title: 'Lorem ipsum',
        description: 'Lorem ipsum',
        tag: 'Lorem',
        published: '2021-01-01',
      });
    });

    const loadedTags = computed(() => store.state.articles.flags.loadedAllTags);

    const tags = computed(() => {
      store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.LoadAllTagsAction}`);
      if (loadedTags.value) {
        return store.state.articles.tags;
      }
      // placeholder
      return Array(1).fill('Lorem');
    });

    return {
      loadedArticles,
      articles,
      loadedTags,
      tags,
      filterTag,
    };
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
