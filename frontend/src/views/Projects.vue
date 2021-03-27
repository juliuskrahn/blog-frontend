<template>
  <About/>
  <p>My most noteworthy recent projects:</p>
  <ul style="padding-left: 24px;">
    <li>Currently working on thlink,
    an app for organzing and linking knowledge - inspired by Luhmann's Zettelkasten</li>
    <li><a href="https://github.com/juliuskrahn/media-analysis-climate-change-scraping"
    class="normal-link">Analyzing the media representation of climate change -> scraping</a> |
    <a href="https://github.com/juliuskrahn/media-analysis-climate-change"
    class="normal-link">-> analyzing the data</a></li>
    <li><a href="https://github.com/juliuskrahn/blog-backend" class="normal-link">This website</a></li>
    <li><a href="https://github.com/juliuskrahn/Taskstack"
    class="normal-link">Taskstack, a Kanban Project Management web-app</a></li>
    <li><a href="https://github.com/juliuskrahn/Respawn-Mode"
    class="normal-link">Respawn-Mode, an awesome and popular addon
    for the awesome game Stalker Anomaly</a></li>
    <li><a href="https://github.com/juliuskrahn/PixelPaint"
    class="normal-link">PixelPaint, a pixel level drawing program</a></li>
  </ul>
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
