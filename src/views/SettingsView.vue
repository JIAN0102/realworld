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
    ...mapActions(useUserStore, ['setUser', 'removeUser']),
    async onSubmit() {
      this.isLoading = true;
      this.errors = null;

      try {
        const res = await updateUser({
          user: this.user,
        });
        this.setUser(res.data.user);
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
      this.removeUser();
      this.$router.push({
        name: 'global-feed',
      });
    },
  },
};
</script>

<template>
  <div class="pt-6">
    <div class="max-w-[1140px] px-[15px] mx-auto">
      <div class="md:w-1/2 md:mx-auto">
        <h1 class="text-[40px] text-center">Your Settings</h1>

        <ul v-if="errors" class="error-messages">
          <li v-for="(error, field) in errors" :key="field">
            {{ field }} {{ error ? error[0] : '' }}
          </li>
        </ul>

        <form>
          <fieldset :disabled="isLoading" class="space-y-4">
            <fieldset class="form-group">
              <input
                v-model="user.image"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                type="text"
                placeholder="URL of profile picture"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.username"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="user.bio"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                rows="8"
                placeholder="Short bio about you"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="block w-full px-6 py-3 text-xl text-[#55595c] leading-tight bg-white border border-black/15 rounded outline-none placeholder:text-[#999]"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <div class="text-right">
              <button
                class="inline-block px-6 py-3 text-xl text-white leading-tight bg-primary rounded hover:bg-primary-dark"
                type="button"
                @click="onSubmit"
              >
                Update Settings
              </button>
            </div>
          </fieldset>
        </form>
        <div class="pt-4 mt-4 border-t border-black/10">
          <button
            class="inline-block px-4 py-2 text-danger leading-tight border border-danger rounded hover:text-white hover:bg-danger"
            @click.prevent="logout"
          >
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
