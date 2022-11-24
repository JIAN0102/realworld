<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import { getProfile, followProfile, unfollowProfile } from '@/services/profile';
import ArticleList from '@/components/ArticleList.vue';

export default {
  name: 'ProfileView',
  components: {
    ArticleList,
  },
  data() {
    return {
      profile: {},
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isAuthenticated']),
    isCurrentUser() {
      return (
        this.isAuthenticated &&
        this.currentUser.username === this.profile.username
      );
    },
    followUserLabel() {
      return `${this.profile.following ? 'Unfollow' : 'Follow'} ${
        this.profile.username
      }`;
    },
    followButtonStyle() {
      return {
        'btn-secondary': this.profile.following,
        'btn-outline-secondary': !this.profile.following,
      };
    },
  },
  watch: {
    '$route.params.username': {
      async handler() {
        this.profile = {};
        const res = await getProfile(this.$route.params.username);
        this.profile = res.data.profile;
      },
      immediate: true,
    },
  },
  methods: {
    async toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({
          name: 'login',
        });
      }
      const request = this.profile.following
        ? unfollowProfile(this.profile.username)
        : followProfile(this.profile.username);
      const res = await request;
      this.profile.following = res.data.profile.following;
    },
  },
};
</script>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <router-link
              v-if="isCurrentUser"
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{ name: 'settings' }"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </router-link>
            <button
              v-else
              class="btn btn-sm action-btn"
              :class="followButtonStyle"
              @click="toggleFollow"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ followUserLabel }}
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
