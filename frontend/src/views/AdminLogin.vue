<template>
  <form @submit.prevent="submit">
    <Input type="password" v-model="key" label="Admin key"/>
    <br/>
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminLogin',
  emits: ['loggedInAsAdmin', 'message'],
  data() {
    return {
      key: '',
    };
  },
  methods: {
    submit() {
      fetch('https://api.juliuskrahn.com/admin-login', {
        method: 'POST',
        body: JSON.stringify({ key: this.key }),
      })
        .then((resp) => {
          if (resp.ok) {
            this.$emit('message', 'Login successful');
            this.$emit('loggedInAsAdmin', this.key);
            this.$router.push({ name: 'Articles' });
          } else {
            this.$emit('message', 'Error, couldn\'t login. Wrong key?');
          }
        });
    },
  },
});
</script>
