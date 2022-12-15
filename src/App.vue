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

  <main class="pt-14 pb-[100px]">
    <router-view />
  </main>

  <TheFooter />
</template>
