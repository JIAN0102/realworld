<script>
import { pageToOffset } from '@/helper';
import { getArticles, getArticlesByFeed } from '@/services/article';
import ArticleListPreview from '@/components/ArticleListPreview.vue';
import BasePagination from '@/components/BasePagination.vue';

export default {
  components: {
    ArticleListPreview,
    BasePagination,
  },
  data() {
    return {
      isLoading: false,
      articles: [],
      articlesCount: 0,
      currentPage: 1,
      type: 'global-feed',
      author: '',
      tag: '',
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        this.type = newVal.name;
        if (newVal.params.username) {
          this.author = newVal.params.username;
        }
        if (newVal.params.tag) {
          this.tag = newVal.params.tag;
        }
        this.fetchArticles();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchArticles() {
      this.isLoading = true;

      let request = null;

      switch (this.type) {
        case 'global-feed':
          request = getArticles(pageToOffset(this.currentPage));
          break;
        case 'my-feed':
          request = getArticlesByFeed(pageToOffset(this.currentPage));
          break;
        case 'tag':
          request = getArticles({
            ...pageToOffset(this.currentPage),
            tag: this.tag,
          });
          break;
        case 'profile':
          request = getArticles({
            ...pageToOffset(this.currentPage),
            author: this.author,
          });
          break;
        case 'profile-favorites':
          request = getArticles({
            ...pageToOffset(this.currentPage),
            favorited: this.author,
          });
          break;
        default:
          break;
      }

      if (request !== null) {
        const res = await request;
        this.articles = res.data.articles;
        this.articlesCount = res.data.articlesCount;
      }

      this.isLoading = false;
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchArticles();
    },
    updateArticleFavorite(newArticle) {
      const index = this.articles.findIndex(
        (article) => article.slug === newArticle.slug
      );
      this.articles[index].favorited = newArticle.favorited;
      this.articles[index].favoritesCount = newArticle.favoritesCount;
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
      <ArticleListPreview
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        @update="updateArticleFavorite"
      />
    </template>
  </template>
  <BasePagination
    :count="articlesCount"
    :current-page="currentPage"
    @change-page="changePage"
  />
</template>
