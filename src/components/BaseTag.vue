<script>
import { getTags } from '@/services/tag';

export default {
  data() {
    return {
      tags: [],
    };
  },
  async created() {
    const res = await getTags();
    this.tags = res.data.tags;
  },
};
</script>

<template>
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
