<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';

export default {
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isLoggedIn']),
  },
};
</script>

<template>
  <nav>
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <div class="flex justify-between items-center h-14">
        <router-link
          class="navbar-brand font-titillium text-2xl text-primary"
          :to="{
            name: 'global-feed',
          }"
        >
          conduit
        </router-link>
        <ul class="flex space-x-4">
          <li>
            <router-link
              class="block hover:text-black/60"
              :class="{
                'text-black/30': $route.name !== 'global-feed',
                'text-black/80': $route.name === 'global-feed',
              }"
              :to="{
                name: 'global-feed',
              }"
            >
              Home
            </router-link>
          </li>
          <template v-if="isLoggedIn">
            <li>
              <router-link
                class="block hover:text-black/60"
                :class="{
                  'text-black/30': $route.name !== 'create-article',
                  'text-black/80': $route.name === 'create-article',
                }"
                :to="{
                  name: 'create-article',
                }"
              >
                <i class="ion-compose"></i>&nbsp;New Article
              </router-link>
            </li>
            <li>
              <router-link
                class="block hover:text-black/60"
                :class="{
                  'text-black/30': $route.name !== 'settings',
                  'text-black/80': $route.name === 'settings',
                }"
                :to="{
                  name: 'settings',
                }"
              >
                <i class="ion-gear-a"></i>&nbsp;Settings
              </router-link>
            </li>
            <li>
              <router-link
                class="flex items-center hover:text-black/60"
                :class="{
                  'text-black/30': $route.name !== 'profile',
                  'text-black/80': $route.name === 'profile',
                }"
                :to="{
                  name: 'profile',
                  params: {
                    username: currentUser.username,
                  },
                }"
              >
                <img
                  class="w-6 h-6 mr-1 rounded-full"
                  :src="currentUser.image"
                  :alt="currentUser.username"
                />
                {{ currentUser.username }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li>
              <router-link
                class="block hover:text-black/60"
                :class="{
                  'text-black/30': $route.name !== 'login',
                  'text-black/80': $route.name === 'login',
                }"
                :to="{
                  name: 'login',
                }"
              >
                Sign in
              </router-link>
            </li>
            <li>
              <router-link
                class="block hover:text-black/60"
                :class="{
                  'text-black/30': $route.name !== 'register',
                  'text-black/80': $route.name === 'register',
                }"
                :to="{
                  name: 'register',
                }"
              >
                Sign up
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
