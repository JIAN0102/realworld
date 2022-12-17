<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';

export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser', 'isLoggedIn']),
  },
  watch: {
    $route: {
      handler() {
        this.isMenuOpen = false;
      },
    },
  },
};
</script>

<template>
  <nav class="fixed top-0 left-0 z-[999] w-full bg-white">
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
        <ul
          class="fixed top-14 left-0 w-full bg-white md:static md:flex md:gap-x-4 md:w-auto"
          :class="isMenuOpen ? 'block' : 'hidden'"
        >
          <li class="border-t border-black/10 md:border-0">
            <router-link
              class="block px-[15px] py-2.5 md:p-0 hover:text-black/60"
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
            <li class="border-t border-black/10 md:border-0">
              <router-link
                class="block px-[15px] py-2.5 md:p-0 hover:text-black/60"
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
            <li class="border-t border-black/10 md:border-0">
              <router-link
                class="block px-[15px] py-2.5 md:p-0 hover:text-black/60"
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
            <li class="border-t border-black/10 md:border-0">
              <router-link
                class="flex items-center px-[15px] py-2.5 md:p-0 hover:text-black/60"
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
            <li class="border-t border-black/10 md:border-0">
              <router-link
                class="block px-[15px] py-2.5 md:p-0 hover:text-black/60"
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
            <li class="border-t border-black/10 md:border-0">
              <router-link
                class="block px-[15px] py-2.5 md:p-0 hover:text-black/60"
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
        <button
          class="relative w-10 h-10 md:hidden"
          type="button"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span
            class="absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#333]"
            :class="
              isMenuOpen ? 'top-1/2  -translate-y-1/2 rotate-45' : 'top-3'
            "
          ></span>
          <span
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-[#333]"
            :class="{ 'opacity-0': isMenuOpen }"
          ></span>
          <span
            class="absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#333]"
            :class="
              isMenuOpen ? 'bottom-1/2  translate-y-1/2 -rotate-45' : 'bottom-3'
            "
          ></span>
        </button>
      </div>
    </div>
  </nav>
</template>
