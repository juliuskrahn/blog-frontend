import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, injectionKey } from './store';

createApp(App)
  .use(store, injectionKey)
  .use(router)
  .mount('#app');
