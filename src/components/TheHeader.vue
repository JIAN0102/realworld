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
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link
        class="navbar-brand"
        :to="{
          name: 'global-feed',
        }"
      >
        conduit
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{
              name: 'global-feed',
            }"
          >
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{
                name: 'create-article',
              }"
            >
              <i class="ion-compose" />&nbsp;New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{
                name: 'settings',
              }"
            >
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li v-if="currentUser" class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{
                name: 'profile',
                params: {
                  username: currentUser.username,
                },
              }"
            >
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{
                name: 'login',
              }"
            >
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
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
  </nav>
</template>
