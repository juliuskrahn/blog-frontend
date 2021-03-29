<template>
  <footer class="footer">
    <p class="content">
       © 2021 by Julius Krahn. All rights reserved.
      GitHub repo: <a class="normal-link" href="https://github.com/juliuskrahn/blog-frontend">frontend</a> <a class="normal-link" href="https://github.com/juliuskrahn/blog-backend">backend</a>
    </p>
    <router-link v-if="userIsAdmin"
    to="/admin-console"
    class="admin-ctrl normal-link">
      Admin console
    </router-link>
    <router-link v-else
    to="/admin-login"
    class="admin-ctrl normal-link">
      Admin login
    </router-link>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import useStore from '@/composables/store';

export default defineComponent({
  setup() {
    const store = useStore();
    const userIsAdmin = computed(() => store.state.auth.userIsAdmin);
    return {
      userIsAdmin,
    };
  },
});
</script>

<style scoped>
footer {
  height: 30px;
  color: var(--grey);
}

.content {
  float: left;
}

.admin-ctrl {
  float: right;
}
</style>
