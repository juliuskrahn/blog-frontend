import { createApp } from 'vue';
import Input from '@/components/Input.vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router)
  .component('Input', Input)
  .mount('#app');
