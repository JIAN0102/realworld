import { defineStore } from 'pinia';
import { request } from '@/services';

export const useArticleStore = defineStore('article', {
  state: () => ({
    article: {
      author: {},
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
    articles: [],
    articlesCount: 0,
  }),
  actions: {
    async fetchArticle(slug) {
      try {
        const res = await request.get(`/articles/${slug}`);
        this.article = res.data.article;
      } catch (error) {
        throw error.response.data.errors;
      }
    },
    async fetchArticles(options, offset) {
      this.aritlces = [];

      let promise = null;

      switch (options.name) {
        case 'global-feed':
          promise = request.get('/articles', {
            params: {
              ...offset,
            },
          });
          break;
        case 'my-feed':
          promise = request.get('/articles/feed', {
            params: {
              ...offset,
            },
          });
          break;
        case 'tag':
          promise = request.get('/articles', {
            params: {
              ...offset,
              tag: options.tag,
            },
          });
          break;
        case 'profile':
          promise = request.get('/articles', {
            params: {
              ...offset,
              author: options.username,
            },
          });
          break;
        case 'profile-favorites':
          promise = request.get('/articles', {
            params: {
              ...offset,
              favorited: options.username,
            },
          });
          break;
        default:
          break;
      }

      const res = await promise;

      this.articles = res.data.articles;
      this.articlesCount = res.data.articlesCount;
    },
    updateArticles(data) {
      this.articles = this.articles.map((article) => {
        if (article.slug !== data.slug) {
          return article;
        }
        article.favorited = data.favorited;
        article.favoritesCount = data.favoritesCount;
        return article;
      });
    },
    async addFavorite(slug) {
      try {
        const res = await request.post(`/articles/${slug}/favorite`);
        this.updateArticles(res.data.article);
        this.article = res.data.article;
      } catch (error) {
        throw error.response.data.errors;
      }
    },
    async removeFavorite(slug) {
      try {
        const res = await request.delete(`/articles/${slug}/favorite`);
        this.updateArticles(res.data.article);
        this.article = res.data.article;
      } catch (error) {
        throw error.response.data.errors;
      }
    },
  },
});
