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
  <div v-if="isLoading">Loading tags...</div>
  <template v-else>
    <div class="flex flex-wrap gap-1 mt-1">
      <router-link
        v-for="tag in tags"
        :key="tag"
        class="px-2 py-0.5 text-sm text-white bg-[#818a91] rounded-full hover:bg-[#687077]"
        :to="{
          name: 'tag',
          params: {
            tag: tag,
          },
        }"
      >
        {{ tag }}
      </router-link>
    </div>
  </template>
</template>
