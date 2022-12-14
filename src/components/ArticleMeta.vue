<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import {
  favoriteArticle,
  unfavoriteArticle,
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
    ...mapState(useUserStore, ['currentUser', 'isLoggedIn']),
    isCurrentUser() {
      return (
        this.isLoggedIn &&
        this.currentUser.username === this.article.author.username
      );
    },
    formatCreatedAt() {
      return formatDate(this.article.createdAt);
    },
  },
  methods: {
    async toggleFollow() {
      if (!this.isLoggedIn) {
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
      if (!this.isLoggedIn) {
        this.$router.push({
          name: 'login',
        });
      }
      this.isFavoriting = true;
      try {
        const res = this.article.favorited
          ? await unfavoriteArticle(this.article.slug)
          : await favoriteArticle(this.article.slug);
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
  <div class="flex items-center">
    <div class="flex items-center mr-6">
      <router-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        <img
          class="w-8 h-8 rounded-full object-cover"
          :src="article.author.image"
          :alt="article.author.username"
        />
      </router-link>
      <div class="ml-2">
        <router-link
          class="block font-medium"
          :to="{
            name: 'profile',
            params: {
              username: article.author.username,
            },
          }"
        >
          {{ article.author.username }}
        </router-link>
        <span class="block text-xs text-[#bbb]">{{ formatCreatedAt }}</span>
      </div>
    </div>
    <div class="flex gap-x-2">
      <template v-if="isCurrentUser">
        <router-link
          aria-label="Edit article"
          class="inline-block px-2 py-1 text-sm text-[#ccc] leading-tight border border-[#ccc] rounded hover:text-[#373a3c] hover:bg-[#ccc]"
          :to="{
            name: 'edit-article',
            params: {
              slug: article.slug,
            },
          }"
        >
          <i class="ion-edit space"></i> Edit Article
        </router-link>
        <button
          aria-label="Delete article"
          class="inline-block px-2 py-1 text-sm text-[#b85c5c] leading-tight border border-[#b85c5c] rounded hover:text-white hover:bg-[#b85c5c]"
          type="button"
          :disabled="isDeleting"
          @click="handleClick"
        >
          <i class="ion-trash-a" /> Delete Article
        </button>
      </template>
      <template v-else>
        <button
          class="inline-block px-2 py-1 text-sm leading-tight border border-[#ccc] rounded hover:text-[#373a3c] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          :class="
            article.author.following ? 'text-[#373a3c] bg-white' : 'text-[#ccc]'
          "
          :disabled="isFollowing"
          @click="toggleFollow"
        >
          <i class="ion-plus-round"></i>
          &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }}
          {{ article.author.username }}
        </button>
        <button
          class="inline-block px-2 py-1 text-sm leading-tight border border-primary rounded hover:text-white hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
          :class="article.favorited ? 'text-white bg-primary' : 'text-primary'"
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
  </div>
</template>
