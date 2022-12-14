<script>
import { pageToOffset } from '@/helper';
import { getArticles } from '@/services/article';
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
      articles: [],
      articlesCount: 0,
      currentPage: 1,
    };
  },
  watch: {
    $route: {
      handler() {
        this.fetchArticles();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchArticles() {
      this.isLoading = true;

      const config = {
        type: this.$route.name,
        params: {
          ...pageToOffset(this.currentPage),
        },
      };

      switch (this.$route.name) {
        case 'tag':
          if (this.$route.params.tag) {
            config.params.tag = this.$route.params.tag;
          }
          break;
        case 'profile':
          if (this.$route.params.username) {
            config.params.author = this.$route.params.username;
          }
          break;
        case 'profile-favorites':
          if (this.$route.params.username) {
            config.params.favorited = this.$route.params.username;
          }
          break;
        default:
          break;
      }

      try {
        const res = await getArticles(config);
        this.articles = res.data.articles;
        this.articlesCount = res.data.articlesCount;
      } catch (error) {
        console.log(error);
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
  <div v-if="isLoading" class="py-6 border-t border-black/10">
    Loading articles...
  </div>
  <template v-else>
    <div v-if="!articles.length" class="py-6 border-t border-black/10">
      No articles are here... yet.
    </div>
    <template v-else>
      <ArticlePreview
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        @update-article-favorite="updateArticleFavorite"
      />
      <BasePagination
        :count="articlesCount"
        :current-page="currentPage"
        @change-page="changePage"
      />
    </template>
  </template>
</template>
