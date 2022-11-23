<script>
export default {
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
    <div class="article-meta">
      <a href="profile.html"><img src="" /></a>
      <div class="info">
        <a href="" class="author">Albert Pai</a>
        <span class="date">January 20th</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> 32
      </button>
    </div>
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
