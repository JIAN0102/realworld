<script>
import { getArticle, createArticle, updateArticle } from '@/services/article';

export default {
  name: 'ArticleEditView',
  async beforeRouteEnter(to, from, next) {
    if (to.params.slug) {
      const res = await getArticle(to.params.slug);
      next((vm) => {
        vm.article = res.data.article;
      });
      return;
    }
    next();
  },
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
        this.isLoading = false;
      }
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
  <div class="pt-6">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <div class="md:w-10/12 md:mx-auto">
        <ul class="error-messages">
          <li v-for="(error, field) in errors" :key="field">
            {{ field }} {{ error ? error[0] : '' }}
          </li>
        </ul>

        <form>
          <fieldset :disabled="isLoading" class="space-y-4">
            <fieldset>
              <input
                v-model="article.title"
                type="text"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                placeholder="Article Title"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="article.description"
                type="text"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                placeholder="What's this article about?"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="article.body"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                rows="8"
                placeholder="Write your article (in markdown)"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="tagInput"
                type="text"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
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
            <div class="text-right">
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
