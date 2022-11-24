<script>
import {
  createArticleFavorite,
  deleteArticleFavorite,
} from '@/services/article';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  emits: ['update'],
  methods: {
    async toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({
          name: 'login',
        });
      }
      const request = this.article.favorited
        ? deleteArticleFavorite(this.article.slug)
        : createArticleFavorite(this.article.slug);
      const res = await request;
      this.$emit('update', res.data.article);
    },
  },
};
</script>

<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        <img :src="article.author.image" :alt="article.author.username" />
      </router-link>
      <div class="info">
        <router-link
          class="author"
          :to="{
            name: 'profile',
            params: {
              username: article.author.username,
            },
          }"
        >
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ article.createdAt }}</span>
      </div>
      <button
        class="btn btn-sm pull-xs-right"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited,
        }"
        @click="toggleFavorite"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <router-link
      class="preview-link"
      :to="{
        name: 'article',
        params: {
          slug: article.slug,
        },
      }"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="(tag, index) of article.tagList"
          :key="index"
          class="tag-default tag-pill tag-outline"
        >
          <span>{{ tag }}</span>
        </li>
      </ul>
    </router-link>
  </div>
</template>
