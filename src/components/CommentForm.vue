<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { createComment } from '@/services/comment';

export default {
  emits: ['create-comment'],
  data() {
    return {
      content: '',
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),
  },
  methods: {
    async onSubmit() {
      const res = await createComment(this.$route.params.slug, this.content);
      this.$emit('create-comment', res.data.comment);
      this.content = '';
    },
  },
};
</script>

<template>
  <form class="card comment-form" @submit.prevent="onSubmit">
    <div class="card-block">
      <textarea
        v-model="content"
        class="form-control"
        placeholder="Write a comment..."
        rows="3"
      ></textarea>
    </div>
    <div class="card-footer">
      <img :src="currentUser.image" class="comment-author-img" />
      <button class="btn btn-sm btn-primary">Post Comment</button>
    </div>
  </form>
</template>
