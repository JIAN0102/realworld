<script>
import { getArticle } from '@/services/article';
import ArticleDetailMeta from '@/components/ArticleDetailMeta.vue';

export default {
  name: 'ArticleView',
  components: {
    ArticleDetailMeta,
  },
  data() {
    return {
      article: {},
    };
  },
  async created() {
    const res = await getArticle(this.$route.params.slug);
    this.article = res.data.article;
  },
  methods: {
    updateArticleFollowing() {
      this.article.author.following = !this.article.author.following;
    },
    updateArticleFavorite(newArticle) {
      this.article.favorited = newArticle.favorited;
      this.article.favoritesCount = newArticle.favoritesCount;
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
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
