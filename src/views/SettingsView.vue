<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { updateUser } from '@/services/user';

export default {
  name: 'SettingsView',
  data() {
    return {
      isLoading: false,
      errors: null,
      user: {},
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),
  },
  created() {
    this.user = {
      email: this.currentUser.email,
      password: '',
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      image: this.currentUser.image,
    };
  },
  methods: {
    ...mapActions(useUserStore, ['setCurrentUser', 'setAuthToken']),
    async onSubmit() {
      this.isLoading = true;
      this.errors = null;
      try {
        const res = await updateUser({
          user: this.user,
        });
        this.setCurrentUser(res.data.user);
        this.setAuthToken(res.data.user.token);
        this.$router.push({
          name: 'profile',
          params: {
            username: res.data.user.username,
          },
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
      this.isLoading = false;
    },
    logout() {
      this.setCurrentUser(null);
      this.setAuthToken(null);
      this.$router.push({
        name: 'global-feed',
      });
    },
  },
};
</script>

<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul v-if="errors" class="error-messages">
            <li v-for="(error, field) in errors" :key="field">
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>
          <form>
            <fieldset :disabled="isLoading">
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="button"
                @click="onSubmit"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click.prevent="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
