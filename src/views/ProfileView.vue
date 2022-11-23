<script>
import ArticleList from '@/components/ArticleList.vue';

export default {
  name: 'ProfileView',
  components: {
    ArticleList,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
};
</script>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img" />
            <h4>Eric Simons</h4>
            <p>
              Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda
              looks like Peeta from the Hunger Games
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  :to="{
                    name: 'profile',
                  }"
                >
                  My Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  :to="{
                    name: 'profile-favorites',
                  }"
                >
                  Favorited Articles
                </router-link>
              </li>
            </ul>
          </div>

          <ArticleList />
        </div>
      </div>
    </div>
  </div>
</template>
