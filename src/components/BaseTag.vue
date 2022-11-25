<script>
import { getTags } from '@/services/tag';

export default {
  data() {
    return {
      isLoading: false,
      tags: [],
    };
  },
  async created() {
    this.isLoading = true;
    try {
      const res = await getTags();
      this.tags = res.data.tags;
    } catch (error) {
      console.log(error);
    }
    this.isLoading = false;
  },
};
</script>

<template>
  <div v-if="isLoading" class="article-preview">Loading tags...</div>
  <template v-else>
    <router-link
      v-for="tag in tags"
      :key="tag"
      class="tag-pill tag-default"
      :to="{
        name: 'tag',
        params: {
          tag: tag,
        },
      }"
    >
      {{ tag }}
    </router-link>
  </template>
</template>
