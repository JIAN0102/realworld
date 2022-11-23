<script>
import { pageToOffset } from '@/services';
import { fetchArticles, fetchArticlesByFeed } from '@/services/article';
import ArticlePreview from '@/components/ArticlePreview.vue';
import BasePagination from '@/components/BasePagination.vue';

export default {
  components: {
    ArticlePreview,
    BasePagination,
  },
  data() {
    return {
      isLoading: false,
      options: {},
      articles: [],
      articlesCount: 0,
      currentPage: 1,
    };
  },
  watch: {
    '$route.name': {
      handler(newVal) {
        if (newVal) this.options.name = newVal;
      },
      immediate: true,
    },
    '$route.params.tag': {
      handler(newVal) {
        if (newVal) this.options.tag = newVal;
      },
      immediate: true,
    },
    '$route.params.username': {
      handler(newVal) {
        if (newVal) this.options.username = newVal;
      },
      immediate: true,
    },
    options: {
      handler() {
        if (this.currentPage !== 1) this.currentPage = 1;
        this.getArticles();
      },
      deep: true,
    },
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      this.isLoading = true;

      let promise = null;

      switch (this.options.name) {
        case 'global-feed':
          promise = fetchArticles(pageToOffset(this.currentPage));
          break;
        case 'my-feed':
          promise = fetchArticlesByFeed(pageToOffset(this.currentPage));
          break;
        case 'tag':
          promise = fetchArticles({
            tag: this.options.tag,
            ...pageToOffset(this.currentPage),
          });
          break;
        case 'profile':
          promise = fetchArticles({
            author: this.options.username,
            ...pageToOffset(this.currentPage),
          });
          break;
        case 'profile-favorites':
          promise = fetchArticles({
            favorited: this.options.username,
            ...pageToOffset(this.currentPage),
          });
          break;
        default:
          break;
      }

      const res = await promise;

      this.articles = res.data.articles;
      this.articlesCount = res.data.articlesCount;

      this.isLoading = false;
    },
    changePage(page) {
      this.currentPage = page;
      this.getArticles();
    },
  },
};
</script>

<template>
  <div v-if="isLoading" class="article-preview">Loading articles...</div>
  <template v-else>
    <div v-if="!articles.length" class="article-preview">
      No articles are here... yet.
    </div>
    <template v-else>
      <ArticlePreview
        v-for="article in articles"
        :key="article.slug"
        :article="article"
      />
    </template>

    <BasePagination
      :articles-count="articlesCount"
      :current-page="currentPage"
      @change-page="changePage"
    />
  </template>
</template>
