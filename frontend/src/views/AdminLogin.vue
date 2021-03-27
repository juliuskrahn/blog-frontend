<template>
  <form @submit.prevent="submit">
    <BaseInput type="password" v-model="key" label="Admin key"/>
    <br/>
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '../components/BaseInput.vue';

export default defineComponent({
  components: { BaseInput },
  emits: ['login', 'message'],

  setup(props, { emit }) {
    const router = useRouter();
    const key = ref('');

    async function submit() {
      const resp = await fetch('https://api.juliuskrahn.com/admin-login', {
        method: 'POST',
        body: JSON.stringify({ key: key.value }),
      });
      if (resp.ok) {
        emit('message', 'Login successful');
        emit('login', key.value);
        router.push({ name: 'Articles' });
      } else {
        emit('message', 'Error, couldn\'t login. Wrong key?');
      }
    }

    return {
      key,
      submit,
    };
  },
});
</script>
