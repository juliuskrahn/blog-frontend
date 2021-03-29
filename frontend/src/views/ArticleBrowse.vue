<template>
  <TheAbout/>
  <div class="articles">
    <div class="tag-list">
      <Tag v-for="tag in tags"
      :key="tag"
      :name="tag"
      :highlight="$route.params.tag && tag!==$route.params.tag"
      :isPlaceholder="!loadedAllTags"/>
      <!-- 'Tag' -> show all articles -->
      <Tag v-if="$route.params.tag"
      :name="'&larr; all'"
      class="all-articles-tag"/>
    </div>
    <div class="article-list">
      <ArticleItem v-for="article in articles"
      :key="article.url"
      v-bind="article"
      :isPlaceholder="!loadedAllArticles"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
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

    store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.LoadAllAction}`);

    const loadedAllArticles = computed(() => store.state.articles.flags.loadedAllArticles);

    const articles = computed(() => {
      // placeholder if not loaded yet
      if (!loadedAllArticles.value) {
        return Array(2).fill({
          urlTitle: '',
          title: 'Lorem ipsum',
          description: 'Lorem ipsum',
          tag: 'Lorem',
          published: '2021-01-01',
        });
      }
      return store.getters[`${storeTypes.Articles.Name}/${storeTypes.Articles.AllSortedDescByPublishedGetter}`];
    });

    store.dispatch(`${storeTypes.Articles.Name}/${storeTypes.Articles.LoadAllTagsAction}`);

    const loadedAllTags = computed(() => store.state.articles.flags.loadedAllTags);

    const tags = computed(() => {
      // placeholder if not loaded yet
      if (!loadedAllTags.value) {
        return Array(1).fill('Lorem');
      }
      return store.state.articles.tags;
    });

    return {
      loadedAllArticles,
      articles,
      loadedAllTags,
      tags,
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
