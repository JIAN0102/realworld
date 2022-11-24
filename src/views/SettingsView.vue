<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { updateUser } from '@/services/user';

export default {
  name: 'SettingsView',
  data() {
    return {
      cacheUser: {},
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),
  },
  created() {
    this.cacheUser = {
      email: this.currentUser.email,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      image: this.currentUser.image,
    };
  },
  methods: {
    ...mapActions(useUserStore, ['setCurrentUser', 'setAuthToken']),
    async onSubmit() {
      Object.keys(this.cacheUser).forEach((key) => {
        if (!this.cacheUser[key]) delete this.cacheUser[key];
      });
      const res = await updateUser(this.cacheUser);
      this.setCurrentUser(res.data.user);
      this.setAuthToken(res.data.user.token);
      this.$router.push({
        name: 'profile',
        params: {
          username: res.data.user.username,
        },
      });
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

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="cacheUser.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="cacheUser.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="cacheUser.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="cacheUser.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="cacheUser.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
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
