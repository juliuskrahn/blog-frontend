<template>
  <About/>
  <p>Email: f"juliuskrahn{at}outlook.de"</p>
  <p><a class="normal-link" href="https://github.com/juliuskrahn">GitHub</a></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import About from '@/components/About.vue';

export default defineComponent({
  components: {
    About,
  },
});
</script>
