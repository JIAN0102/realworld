<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<template>
  <TheHeader />

  <main class="min-h-[calc(100vh-3.5rem)] py-14">
    <router-view />
  </main>

  <TheFooter />
</template>
