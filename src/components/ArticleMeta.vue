<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useArticleStore } from '@/stores/article';
import ArticleActions from '@/components/ArticleActions.vue';

export default {
  components: {
    ArticleActions,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
    actions: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isAuthenticated']),
    isCurrentUser() {
      return this.currentUser?.username === this.article?.author?.username;
    },
  },
  methods: {
    ...mapActions(useArticleStore, ['addFavorite', 'removeFavorite']),
    async toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({
          name: 'login',
        });
      }
      this.article.favorited
        ? await this.removeFavorite(this.article.slug)
        : await this.addFavorite(this.article.slug);
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
      <span class="date">{{ article.createdAt }}</span>
    </div>
    <ArticleActions
      v-if="actions"
      :article="article"
      :can-modify="isCurrentUser"
    />
    <button
      v-else
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
</template>
