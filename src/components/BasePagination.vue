<script>
export default {
  props: {
    articlesCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ['change-page'],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / 10);
    },
  },
  methods: {
    handleChange(page) {
      this.$emit('change-page', page);
    },
  },
};
</script>

<template>
  <ul class="pagination">
    <li
      v-for="page in totalPage"
      :key="page"
      class="page-item"
      :class="{ active: currentPage === page }"
    >
      <a
        :aria-label="`Go to page ${page}`"
        class="page-link"
        href="javascript:"
        @click="handleChange(page)"
        >{{ page }}</a
      >
    </li>
  </ul>
</template>
