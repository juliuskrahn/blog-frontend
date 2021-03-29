<template>
  <form @submit.prevent="submit">
    <BaseInput type="password" v-model="key" label="Admin key"/>
    <br/>
    <button type="submit" @click="login">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useStore from '@/composables/store';
import { Auth } from '@/store/storeTypes';
import BaseInput from '../components/BaseInput.vue';

export default defineComponent({
  components: { BaseInput },
  setup() {
    const store = useStore();
    const key = ref('');
    function login() {
      store.dispatch(`${Auth.Name}/${Auth.LoginAction}`, { key: key.value });
    }
    return {
      key,
      login,
    };
  },
});
</script>
