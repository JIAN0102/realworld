<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import {
  createArticleFavorite,
  deleteArticleFavorite,
  deleteArticle,
} from '@/services/article';
import { followProfile, unfollowProfile } from '@/services/profile';
import { formatDate } from '@/helper';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-follow', 'update-favorite'],
  data() {
    return {
      isFollowing: false,
      isFavoriting: false,
      isDeleting: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isAuthenticated']),
    isCurrentUser() {
      return (
        this.isAuthenticated &&
        this.currentUser.username === this.article.author.username
      );
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
      this.isFollowing = true;
      try {
        this.article.author.following
          ? await unfollowProfile(this.article.author.username)
          : await followProfile(this.article.author.username);
        this.$emit('update-follow');
      } catch (error) {
        console.log(error);
      }
      this.isFollowing = false;
    },
    async toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({
          name: 'login',
        });
      }
      this.isFavoriting = true;
      try {
        const res = this.article.favorited
          ? await deleteArticleFavorite(this.article.slug)
          : await createArticleFavorite(this.article.slug);
        this.$emit('update-favorite', res.data.article);
      } catch (error) {
        console.log(error);
      }
      this.isFavoriting = false;
    },
    async handleClick() {
      this.isDeleting = true;
      try {
        await deleteArticle(this.article.slug);
        this.$router.push({
          name: 'global-feed',
        });
      } catch (error) {
        console.log(error);
      }
      this.isDeleting = false;
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
        type="button"
        :disabled="isDeleting"
        @click="handleClick"
      >
        <i class="ion-trash-a" /> Delete Article
      </button>
    </template>

    <template v-else>
      <button
        class="btn btn-sm"
        :class="
          article.author.following ? 'btn-secondary' : 'btn-outline-secondary'
        "
        :disabled="isFollowing"
        @click="toggleFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }}
        {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm"
        :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
        :disabled="isFavoriting"
        @click="toggleFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp;
        {{ article.favorited ? 'Unfavorite Article' : 'Favorite Article' }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>
