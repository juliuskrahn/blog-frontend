import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, injectionKey } from './store';
import { appErrorHandler, globalErrorHandler, globalPromiseRejectionHandler } from './error';

const app = createApp(App);

app.use(store, injectionKey);

window.addEventListener('error', globalErrorHandler);
window.addEventListener('unhandledrejection', globalPromiseRejectionHandler);
app.config.errorHandler = appErrorHandler;

app.use(router);

app.mount('#app');
