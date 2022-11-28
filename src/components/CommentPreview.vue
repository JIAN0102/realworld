<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { deleteComment } from '@/services/comment';
import { formatDate } from '@/helper';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  emits: ['delete-comment'],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isLoggedIn']),
    isCurrentUser() {
      return (
        this.isLoggedIn &&
        this.currentUser.username === this.comment.author.username
      );
    },
    formatCreatedAt() {
      return formatDate(this.comment.createdAt);
    },
  },
  methods: {
    async handleClick() {
      this.isLoading = true;

      try {
        await deleteComment(this.$route.params.slug, this.comment.id);
        this.$emit('delete-comment', this.comment.id);
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
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
      <span class="date-posted">{{ formatCreatedAt }}</span>
      <span
        v-if="isCurrentUser"
        class="mod-options"
        :style="{ pointerEvents: isLoading ? 'none' : 'auto' }"
        @click="handleClick"
      >
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
