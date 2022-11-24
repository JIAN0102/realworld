<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { deleteComment } from '@/services/comment';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  emits: ['delete-comment'],
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isAuthenticated']),
    isCurrentUser() {
      return (
        this.isAuthenticated &&
        this.currentUser.username === this.comment.author.username
      );
    },
  },
  methods: {
    async handleClick() {
      await deleteComment(this.$route.params.slug, this.comment.id);
      this.$emit('delete-comment', this.comment.id);
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <router-link
        class="comment-author"
        :to="{
          name: 'profile',
          params: {
            username: comment.author.username,
          },
        }"
      >
        <img :src="comment.author.image" class="comment-author-img" alt="" />
      </router-link>
      &nbsp;
      <router-link
        class="comment-author"
        :to="{
          name: 'profile',
          params: {
            username: comment.author.username,
          },
        }"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ comment.createdAt }}</span>
      <span v-if="isCurrentUser" class="mod-options" @click="handleClick">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
