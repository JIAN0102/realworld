<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { register } from '@/services/user';

export default {
  name: 'LoginView',
  data() {
    return {
      errors: null,
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, [
      'setFromUser',
      'setCurrentUser',
      'setAuthToken',
    ]),
    async onSubmit() {
      this.errors = null;
      try {
        const res = await register({
          user: this.user,
        });
        this.setFromUser(res.data.user);
        this.$router.push({
          name: 'global-feed',
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(error, field) in errors" :key="field">
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>
          <form>
            <fieldset class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
