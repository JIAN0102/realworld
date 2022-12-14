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
      <h1 class="font-titillium text-[56px]">conduit</h1>
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
                  :class="{
                    'text-[#aaa] border-transparent': $route.name !== 'my-feed',
                    'text-primary border-primary': $route.name === 'my-feed',
                  }"
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
                  :class="{
                    'text-[#aaa] border-transparent':
                      $route.name !== 'global-feed',
                    'text-primary border-primary':
                      $route.name === 'global-feed',
                  }"
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
                  :class="{
                    'text-[#aaa] border-transparent': $route.name !== 'tag',
                    'text-primary border-primary': $route.name === 'tag',
                  }"
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
