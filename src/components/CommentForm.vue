<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { createComment } from '@/services/comment';

export default {
  emits: ['create-comment'],
  data() {
    return {
      isLoading: false,
      content: '',
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),
  },
  methods: {
    async onSubmit() {
      if (this.content === '') return;

      this.isLoading = true;

      try {
        const res = await createComment(this.$route.params.slug, {
          comment: {
            body: this.content,
          },
        });
        this.$emit('create-comment', res.data.comment);
        this.content = '';
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },
  },
};
</script>

<template>
  <form class="border border-[#e5e5e5] rounded">
    <textarea
      v-model.trim="content"
      class="block w-full p-5 text-[#55595c] leading-tight bg-white rounded outline-none"
      placeholder="Write a comment..."
      rows="3"
      :disabled="isLoading"
    ></textarea>
    <div
      class="flex justify-between px-5 py-3 bg-[#f5f5f5] border-t border-[#e5e5e5]"
    >
      <img class="w-[30px] h-[30px] rounded-full" :src="currentUser.image" />
      <button
        class="inline-block px-2 py-1 text-sm text-white bg-primary rounded"
        type="button"
        :disabled="isLoading || content === ''"
        @click="onSubmit"
      >
        Post Comment
      </button>
    </div>
  </form>
</template>
