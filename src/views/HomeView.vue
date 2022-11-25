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
    ...mapState(useUserStore, ['isAuthenticated']),
  },
};
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  :to="{
                    name: 'my-feed',
                  }"
                >
                  Your Feed
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  :to="{
                    name: 'global-feed',
                  }"
                >
                  Global Feed
                </router-link>
              </li>
              <li v-if="$route.params.tag" class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
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

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <BaseTag />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
