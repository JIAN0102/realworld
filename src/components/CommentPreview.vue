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
  <div class="border border-[#e5e5e5] rounded">
    <div class="p-5">
      <p>
        {{ comment.body }}
      </p>
    </div>
    <div
      class="flex justify-between items-center px-5 py-3 text-sm border-t bg-[#f5f5f5] border-[#e5e5e5]"
    >
      <div class="flex items-center">
        <router-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img
            class="w-5 h-5 rounded-full"
            :src="comment.author.image"
            alt=""
          />
        </router-link>
        <router-link
          class="ml-2 text-primary"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </router-link>
        <span class="ml-1 text-[#bbb]">{{ formatCreatedAt }}</span>
      </div>
      <span
        v-if="isCurrentUser"
        class="text-[#333] text-base cursor-pointer opacity-60 hover:opacity-100"
        :style="{ pointerEvents: isLoading ? 'none' : 'auto' }"
        @click="handleClick"
      >
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
