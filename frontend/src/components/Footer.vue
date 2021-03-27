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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  inject: ['userIsAdmin'],
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
