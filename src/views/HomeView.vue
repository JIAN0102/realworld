<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import ArticleList from '@/components/ArticleList.vue';

export default {
  name: 'HomeView',
  components: {
    ArticleList,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),
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
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  :name="'my-feed'"
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
                  :name="'global-feed'"
                  :to="{
                    name: 'global-feed',
                  }"
                >
                  Global Feed
                </router-link>
              </li>
            </ul>
          </div>

          <ArticleList />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
