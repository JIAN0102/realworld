<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { getArticle } from '@/services/article';
import { getComments } from '@/services/comment';
import ArticleMeta from '@/components/ArticleMeta.vue';
import CommentForm from '@/components/CommentForm.vue';
import CommentPreview from '@/components/CommentPreview.vue';

export default {
  name: 'ArticleView',
  components: {
    ArticleMeta,
    CommentForm,
    CommentPreview,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const [article, comments] = await Promise.all([
        getArticle(to.params.slug),
        getComments(to.params.slug),
      ]);
      next((vm) => {
        vm.article = article.data.article;
        vm.comments = comments.data.comments;
      });
      return;
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      article: {},
      comments: [],
    };
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
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
  <div class="py-8 text-white bg-[#333]">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <h1 class="mb-8 font-semibold text-[44px] leading-[1.1]">
        {{ article.title }}
      </h1>

      <ArticleMeta
        v-if="Object.keys(article).length"
        :article="article"
        @update-follow="updateArticleFollowing"
        @update-favorite="updateArticleFavorite"
      />
    </div>
  </div>

  <div class="pt-8">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <div class="row article-content">
        <div class="font-serif text-lg">
          {{ article.body }}
        </div>
        <ul class="flex gap-1 mt-8">
          <li v-for="(tag, index) of article.tagList" :key="tag + index">
            <router-link
              class="px-2 font-light text-sm text-[#aaa] border border-[#ddd] rounded-full"
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

      <div class="pt-6 mt-8 mb-12 border-t border-black/10">
        <ArticleMeta
          v-if="Object.keys(article).length"
          :article="article"
          @update-follow="updateArticleFollowing"
          @update-favorite="updateArticleFavorite"
        />
      </div>

      <div class="space-y-3 md:w-2/3 md:mx-auto">
        <CommentForm v-if="isLoggedIn" @create-comment="createComment" />
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
</template>
