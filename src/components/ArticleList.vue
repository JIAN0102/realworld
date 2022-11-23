<script>
import { mapState, mapActions } from 'pinia';
import { useArticleStore } from '@/stores/article';
import { pageToOffset } from '@/services';
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
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(useArticleStore, ['articles', 'articlesCount']),
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
    ...mapActions(useArticleStore, ['fetchArticles']),
    async getArticles() {
      this.isLoading = true;
      await this.fetchArticles(
        {
          ...this.options,
        },
        pageToOffset(this.currentPage)
      );
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
