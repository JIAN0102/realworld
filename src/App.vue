<script>
import { RouterView } from 'vue-router';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    RouterView,
    TheHeader,
    TheFooter,
  },
};
</script>

<template>
  <TheHeader />

  <RouterView />

  <TheFooter />
</template>
