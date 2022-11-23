<script>
import ArticleMeta from '@/components/ArticleMeta.vue';

export default {
  components: {
    ArticleMeta,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="article-preview">
    <ArticleMeta :article="article" />
    <router-link
      class="preview-link"
      :to="{
        name: 'article',
        params: {
          slug: article.slug,
        },
      }"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="(tag, index) of article.tagList"
          :key="index"
          class="tag-default tag-pill tag-outline"
        >
          <span>{{ tag }}</span>
        </li>
      </ul>
    </router-link>
  </div>
</template>
