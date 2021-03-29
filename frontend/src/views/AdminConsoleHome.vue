<template>
  <router-link class="button" to="/admin-console/new-article">New article</router-link>
  <div class="space"></div>
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useStore from '@/composables/store';
import * as storeTypes from '@/store/storeTypes';

export default defineComponent({
  setup() {
    const store = useStore();
    function logout() {
      store.dispatch(`${storeTypes.Auth.Name}/${storeTypes.Auth.LogoutAction}`);
    }
    return {
      logout,
    };
  },
});
</script>
