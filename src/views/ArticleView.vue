<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { getArticle } from '@/services/article';
import { getComments } from '@/services/comment';
import ArticleDetailMeta from '@/components/ArticleDetailMeta.vue';
import CommentForm from '@/components/CommentForm.vue';
import CommentPreview from '@/components/CommentPreview.vue';

export default {
  name: 'ArticleView',
  components: {
    ArticleDetailMeta,
    CommentForm,
    CommentPreview,
  },
  async beforeRouteEnter(to, from, next) {
    const res = await Promise.all([
      getArticle(to.params.slug),
      getComments(to.params.slug),
    ]);
    next((vm) => {
      vm.article = res[0].data.article;
      vm.comments = res[1].data.comments;
    });
  },
  data() {
    return {
      article: {},
      comments: [],
    };
  },
  computed: {
    ...mapState(useUserStore, ['isAuthenticated']),
    sortedComments() {
      return this.comments
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    updateArticleFollowing() {
      this.article.author.following = !this.article.author.following;
    },
    updateArticleFavorite(newArticle) {
      this.article.favorited = newArticle.favorited;
      this.article.favoritesCount = newArticle.favoritesCount;
    },
    createComment(newComment) {
      this.comments.push(newComment);
    },
    deleteComment(id) {
      const index = this.comments.findIndex((comment) => comment.id === id);
      this.comments.splice(index, 1);
    },
  },
};
</script>

<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <ArticleDetailMeta
          v-if="Object.keys(article).length"
          :article="article"
          @update-follow="updateArticleFollowing"
          @update-favorite="updateArticleFavorite"
        />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ article.body }}
          </p>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <router-link
                class="tag-default tag-pill tag-outline"
                :to="{
                  name: 'tag',
                  params: {
                    tag: tag,
                  },
                }"
              >
                {{ tag }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleDetailMeta
          v-if="Object.keys(article).length"
          :article="article"
          @update-follow="updateArticleFollowing"
          @update-favorite="updateArticleFavorite"
        />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <CommentForm v-if="isAuthenticated" @create-comment="createComment" />
          <p v-else>
            <router-link :to="{ name: 'login' }"> Sign in </router-link>
            or
            <router-link :to="{ name: 'register' }"> sign up </router-link>
            to add comments on this article.
          </p>

          <CommentPreview
            v-for="comment in sortedComments"
            :key="comment.id"
            :comment="comment"
            @delete-comment="deleteComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>
