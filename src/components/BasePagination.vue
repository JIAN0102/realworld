<script>
export default {
  props: {
    count: {
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
      return Math.ceil(this.count / 10);
    },
    calculatePage() {
      const getRange = (start, end) => {
        return Array(end - start + 1)
          .fill()
          .map((v, i) => i + start);
      };

      const pagination = () => {
        let delta;
        if (this.totalPage <= 7) {
          delta = 7;
        } else {
          delta =
            this.currentPage > 4 && this.currentPage < this.totalPage - 3
              ? 2
              : 4;
        }

        const range = {
          start: Math.round(this.currentPage - delta / 2),
          end: Math.round(this.currentPage + delta / 2),
        };

        if (range.start - 1 === 1 || range.end + 1 === this.totalPage) {
          range.start += 1;
          range.end += 1;
        }

        let pages =
          this.currentPage > delta
            ? getRange(
                Math.min(range.start, this.totalPage - delta),
                Math.min(range.end, this.totalPage)
              )
            : getRange(1, Math.min(this.totalPage, delta + 1));

        const withDots = (value, pair) =>
          pages.length + 1 !== this.totalPage ? pair : [value];

        if (pages[0] !== 1) {
          pages = withDots(1, [1, '...']).concat(pages);
        }

        if (pages[pages.length - 1] < this.totalPage) {
          pages = pages.concat(
            withDots(this.totalPage, ['...', this.totalPage])
          );
        }

        return pages;
      };

      return pagination();
    },
  },
  methods: {
    handleChange(page) {
      if (page === '...') return;
      this.$emit('change-page', page);
    },
  },
};
</script>

<template>
  <ul class="pagination">
    <li
      v-for="page in calculatePage"
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
