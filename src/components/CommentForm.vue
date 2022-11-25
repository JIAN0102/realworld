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
        const res = await createComment(this.$route.params.slug, this.content);
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
  <form class="card comment-form">
    <div class="card-block">
      <textarea
        v-model.trim="content"
        class="form-control"
        placeholder="Write a comment..."
        rows="3"
        :disabled="isLoading"
      ></textarea>
    </div>
    <div class="card-footer">
      <img :src="currentUser.image" class="comment-author-img" />
      <button
        class="btn btn-sm btn-primary"
        type="button"
        :disabled="isLoading || content === ''"
        @click="onSubmit"
      >
        Post Comment
      </button>
    </div>
  </form>
</template>
