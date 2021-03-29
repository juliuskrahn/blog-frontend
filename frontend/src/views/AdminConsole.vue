<template>
  <div class="admin-console">
    <h1 class="title">Admin Console</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/composables/store';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    if (!store.state.auth.userIsAdmin) {
      router.push({ name: '404' });
    }
  },
});
</script>

<style scoped>
.title {
  color: var(--blue);
}
</style>
