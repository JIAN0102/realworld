<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { register } from '@/services/user';

export default {
  name: 'LoginView',
  data() {
    return {
      isLoading: false,
      errors: null,
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, ['setUser']),
    async onSubmit() {
      this.isLoading = true;
      this.errors = null;

      try {
        const res = await register({
          user: this.user,
        });
        this.setUser(res.data.user);
        this.$router.push({
          name: 'global-feed',
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }

      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div class="pt-6">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <div class="md:w-1/2 md:mx-auto">
        <div class="mb-4 text-center">
          <h1 class="text-[40px]">Sign up</h1>
          <router-link class="text-primary" :to="{ name: 'login' }"
            >Have an account?</router-link
          >
        </div>

        <ul v-if="errors" class="error-messages">
          <li v-for="(error, field) in errors" :key="field">
            {{ field }} {{ error ? error[0] : '' }}
          </li>
        </ul>

        <form>
          <fieldset :disabled="isLoading" class="space-y-4">
            <fieldset>
              <input
                v-model="user.username"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset>
              <input
                v-model="user.email"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset>
              <input
                v-model="user.password"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
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
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
