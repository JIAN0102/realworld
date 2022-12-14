<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import ArticleList from '@/components/ArticleList.vue';
import BaseTag from '@/components/BaseTag.vue';

export default {
  name: 'HomeView',
  components: {
    ArticleList,
    BaseTag,
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
  },
};
</script>

<template>
  <div class="p-8 text-white text-center bg-primary">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <h1 class="mb-2 font-titillium text-[56px] leading-[1.1]">conduit</h1>
      <p class="font-light text-2xl">A place to share your knowledge.</p>
    </div>
  </div>

  <div class="pt-8">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <div class="grid grid-cols-1 gap-[30px] lg:grid-cols-4">
        <div class="lg:col-span-3">
          <div class="feed-toggle">
            <ul class="flex">
              <li v-if="isLoggedIn">
                <router-link
                  class="block px-4 py-2 border-b-2"
                  :class="
                    $route.name === 'my-feed'
                      ? 'text-primary border-primary'
                      : 'text-[#aaa] border-transparent'
                  "
                  :to="{
                    name: 'my-feed',
                  }"
                >
                  Your Feed
                </router-link>
              </li>
              <li>
                <router-link
                  class="block px-4 py-2 border-b-2"
                  :class="
                    $route.name === 'global-feed'
                      ? 'text-primary border-primary'
                      : 'text-[#aaa] border-transparent'
                  "
                  :to="{
                    name: 'global-feed',
                  }"
                >
                  Global Feed
                </router-link>
              </li>
              <li v-if="$route.params.tag">
                <router-link
                  class="block px-4 py-2 border-b-2"
                  :class="
                    $route.name === 'tag'
                      ? 'text-primary border-primary'
                      : 'text-[#aaa] border-transparent'
                  "
                  :to="{
                    name: 'tag',
                    tag: $route.params.tag,
                  }"
                >
                  <i class="ion-pound"></i> {{ $route.params.tag }}
                </router-link>
              </li>
            </ul>
          </div>

          <ArticleList />
        </div>

        <div>
          <div class="p-2.5 bg-[#f3f3f3] rounded">
            <p>Popular Tags</p>

            <BaseTag />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
