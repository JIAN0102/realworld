<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/user';
import { login } from '@/services/user';

export default {
  name: 'LoginView',
  data() {
    return {
      isLoading: false,
      errors: null,
      user: {
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
        const res = await login({
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
          <h1 class="text-[40px]">Sign in</h1>
          <router-link class="text-primary" :to="{ name: 'register' }"
            >Need an account?</router-link
          >
        </div>

        <ul v-if="errors" class="pl-10 mb-4 list-disc font-bold text-[#b85c5c]">
          <li v-for="(error, field) in errors" :key="field">
            {{ field }} {{ error ? error[0] : '' }}
          </li>
        </ul>

        <form>
          <fieldset :disabled="isLoading" class="space-y-4">
            <fieldset>
              <input
                v-model="user.email"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999] disabled:bg-[#eceeef] disabled:cursor-not-allowed"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset>
              <input
                v-model="user.password"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999] disabled:bg-[#eceeef] disabled:cursor-not-allowed"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <div class="text-right">
              <button
                class="inline-block px-6 py-3 text-xl text-white leading-tight bg-primary rounded"
                type="button"
                @click="onSubmit"
              >
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
