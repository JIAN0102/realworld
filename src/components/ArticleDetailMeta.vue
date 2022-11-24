<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import {
  createArticleFavorite,
  deleteArticleFavorite,
  deleteArticle,
} from '@/services/article';
import { followProfile, unfollowProfile } from '@/services/profile';
import { formatDate } from '@/helper/format-date';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-follow', 'update-favorite'],
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isAuthenticated']),
    isCurrentUser() {
      return (
        this.isAuthenticated &&
        this.currentUser.username === this.article.author.username
      );
    },
    followUserLabel() {
      return `${this.article.author.following ? 'Unfollow' : 'Follow'} ${
        this.article.author.username
      }`;
    },
    followButtonStyle() {
      return {
        'btn-secondary': this.article.author.following,
        'btn-outline-secondary': !this.article.author.following,
      };
    },
    favoriteArticleLabel() {
      return `${
        this.article.favorited ? 'Unfavorite Article' : 'Favorite Article'
      }`;
    },
    favoriteButtonStyle() {
      return {
        'btn-primary': this.article.favorited,
        'btn-outline-primary': !this.article.favorited,
      };
    },
    formatCreatedAt() {
      return formatDate(this.article.createdAt);
    },
  },
  methods: {
    async toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({
          name: 'login',
        });
      }
      const request = this.article.author.following
        ? unfollowProfile(this.article.author.username)
        : followProfile(this.article.author.username);
      await request;
      this.$emit('update-follow');
    },
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
      this.$emit('update-favorite', res.data.article);
    },
    async handleClick() {
      await deleteArticle(this.article.slug);
      this.$router.push({
        name: 'global-feed',
      });
    },
  },
};
</script>

<template>
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
      <span class="date">{{ formatCreatedAt }}</span>
    </div>

    <template v-if="isCurrentUser">
      <router-link
        aria-label="Edit article"
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'edit-article',
          params: {
            slug: article.slug,
          },
        }"
      >
        <i class="ion-edit space"></i> Edit Article
      </router-link>
      &nbsp;&nbsp;
      <button
        aria-label="Delete article"
        class="btn btn-outline-danger btn-sm"
        @click="handleClick"
      >
        <i class="ion-trash-a" /> Delete Article
      </button>
    </template>

    <template v-else>
      <button
        class="btn btn-sm"
        :class="followButtonStyle"
        @click="toggleFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ followUserLabel }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm"
        :class="favoriteButtonStyle"
        @click="toggleFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ favoriteArticleLabel }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>
