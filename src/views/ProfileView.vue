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
      isLoading: false,
      profile: null,
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isLoggedIn']),
    isCurrentUser() {
      return (
        this.isLoggedIn && this.currentUser.username === this.profile.username
      );
    },
  },
  watch: {
    '$route.params.username': {
      handler() {
        this.fetchProfile();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchProfile() {
      this.isLoading = true;
      this.profile = null;

      try {
        const res = await getProfile(this.$route.params.username);
        this.profile = res.data.profile;
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },
    async toggleFollow() {
      if (!this.isLoggedIn) {
        this.$router.push({
          name: 'login',
        });
      }

      try {
        const res = this.profile.following
          ? await unfollowProfile(this.profile.username)
          : await followProfile(this.profile.username);
        this.profile.following = res.data.profile.following;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="py-8 pb-4 bg-[#f3f3f3]">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <div class="md:w-10/12 md:mx-auto">
        <div v-if="isLoading">Loading profile...</div>
        <template v-else>
          <template v-if="profile">
            <img
              class="w-[100px] h-[100px] mx-auto rounded-full"
              :src="profile.image"
            />
            <div class="mt-4 text-center">
              <h4 class="font-bold text-2xl">{{ profile.username }}</h4>
              <p class="mt-1 font-light text-[#aaa]">{{ profile.bio }}</p>
            </div>
            <div class="mt-2 text-right">
              <router-link
                v-if="isCurrentUser"
                class="inline-block px-2 py-1 text-sm text-[#999] leading-tight border border-[#999] rounded hover:bg-[#ccc]"
                :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
              <button
                v-else
                class="inline-block px-2 py-1 text-sm text-[#999] leading-tight border border-[#999] rounded hover:bg-[#ccc] disabled:cursor-not-allowed disabled:opacity-60"
                :class="{ 'text-[#373a3c] bg-white': profile.following }"
                @click="toggleFollow"
              >
                <i class="ion-plus-round"></i>
                &nbsp; {{ profile.following ? 'Unfollow' : 'Follow' }}
                {{ profile.username }}
              </button>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>

  <div class="pt-6">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <div class="md:w-10/12 md:mx-auto">
        <div class="articles-toggle">
          <ul class="flex">
            <li>
              <router-link
                class="block px-4 py-2 border-b-2"
                :class="
                  $route.name === 'profile'
                    ? 'text-primary border-primary'
                    : 'text-[#aaa] border-transparent'
                "
                :to="{
                  name: 'profile',
                }"
              >
                My Articles
              </router-link>
            </li>
            <li>
              <router-link
                class="block px-4 py-2 border-b-2"
                :class="
                  $route.name === 'profile-favorites'
                    ? 'text-primary border-primary'
                    : 'text-[#aaa] border-transparent'
                "
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
</template>
