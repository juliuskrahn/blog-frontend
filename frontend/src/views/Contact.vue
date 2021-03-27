<template>
  <TheAbout/>
  <p>Email: f"juliuskrahn{at}outlook.de"</p>
  <p><a class="normal-link" href="https://github.com/juliuskrahn">GitHub</a></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheAbout from '@/components/TheAbout.vue';

export default defineComponent({
  components: { TheAbout },
});
</script>
