<script>
import { getArticle, createArticle, updateArticle } from '@/services/article';

export default {
  name: 'ArticleEditView',
  data() {
    return {
      isLoading: false,
      errors: null,
      article: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      tagInput: '',
    };
  },
  watch: {
    '$route.params.slug': {
      handler(newVal) {
        if (newVal) {
          this.fetchArticle();
        } else {
          this.article = this.$options.data().article;
        }
      },
    },
  },
  created() {
    if (this.$route.params.slug) {
      this.fetchArticle();
    }
  },
  methods: {
    async fetchArticle() {
      const res = await getArticle(this.$route.params.slug);
      this.article = res.data.article;
    },
    async onSubmit() {
      this.isLoading = true;

      try {
        const res = this.$route.params.slug
          ? await updateArticle(this.$route.params.slug, {
              article: this.article,
            })
          : await createArticle({
              article: this.article,
            });
        this.$router.push({
          name: 'article',
          params: {
            slug: res.data.article.slug,
          },
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }

      this.isLoading = false;
    },
    createArticleTag(tag) {
      if (this.tagInput === '') return;
      this.article.tagList.push(tag);
      this.tagInput = '';
    },
    deleteArticleTag(index) {
      this.article.tagList.splice(index, 1);
    },
  },
};
</script>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <li v-for="(error, field) in errors" :key="field">
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>

          <form>
            <fieldset :disabled="isLoading">
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tagInput"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keypress.enter.prevent="createArticleTag(tagInput)"
                />
                <div class="tag-list">
                  <span
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index"
                    class="tag-default tag-pill"
                  >
                    <i
                      class="ion-close-round"
                      @click="deleteArticleTag(index)"
                    ></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
