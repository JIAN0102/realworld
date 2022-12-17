<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { favoriteArticle, unfavoriteArticle } from '@/services/article';
import { formatDate } from '@/helper';

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  emits: ['update-article-favorite'],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
    formatCreatedAt() {
      return formatDate(this.article.createdAt);
    },
  },
  methods: {
    async toggleFavorite() {
      if (!this.isLoggedIn) {
        this.$router.push({
          name: 'login',
        });
      }

      this.isLoading = true;

      try {
        const res = this.article.favorited
          ? await unfavoriteArticle(this.article.slug)
          : await favoriteArticle(this.article.slug);
        this.$emit('update-article-favorite', res.data.article);
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div class="py-6 border-t border-black/10">
    <div class="flex justify-between items-center gap-x-4">
      <div class="flex items-center gap-x-2">
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
        <div>
          <router-link
            class="block font-medium text-primary"
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
      <button
        class="inline-block px-2 py-1 text-sm leading-tight border border-primary rounded hover:text-white hover:bg-primary disabled:pointer-events-none disabled:opacity-60"
        :class="{
          'text-white bg-primary': article.favorited,
          'text-primary': !article.favorited,
        }"
        :disabled="isLoading"
        @click="toggleFavorite"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <router-link
      class="block mt-4"
      :to="{
        name: 'article',
        params: {
          slug: article.slug,
        },
      }"
    >
      <h2 class="font-semibold text-2xl leading-[1.1]">
        {{ article.title }}
      </h2>
      <p class="mt-1 font-light text-[#999]">{{ article.description }}</p>
      <div class="flex justify-between gap-x-4 mt-4">
        <span class="shrink-0 font-light text-sm text-[#bbb]"
          >Read more...</span
        >
        <ul class="flex flex-wrap gap-1">
          <li
            v-for="(tag, index) of article.tagList"
            :key="index"
            class="px-2 font-light text-sm text-[#aaa] border border-[#ddd] rounded-full"
          >
            <span>{{ tag }}</span>
          </li>
        </ul>
      </div>
    </router-link>
  </div>
</template>
