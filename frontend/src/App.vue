<template>
  <Header/>
  <div class="messages">
    <Message v-for="message in messages"
    :key="message"
    :text="message"
    @closeMessage="messages.splice(messages.indexOf(message), 1)"/>
  </div>
  <div id="content">
    <router-view
    :userIsAdmin="userIsAdmin"
    @message="newMessage"
    @loggedInAsAdmin="loggedInAsAdmin"
    @logout="logout"/>
  </div>
  <Footer :userIsAdmin="userIsAdmin"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Message from '@/components/Message.vue';

export default defineComponent({
  components: {
    Header,
    Footer,
    Message,
  },
  data() {
    return {
      userIsAdmin: typeof window.localStorage.getItem('key') === 'string',
      messages: [] as string[],
    };
  },
  methods: {
    newMessage(messageText: string) {
      this.messages.push(messageText);
    },
    loggedInAsAdmin(key: string) {
      window.localStorage.setItem('key', key);
      this.userIsAdmin = true;
    },
    logout() {
      window.localStorage.removeItem('key');
      this.userIsAdmin = false;
    },
  },
});
</script>

<style>
html, body {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: .2px;
  color: black;
  background: #FFFEFC;
  --background: #FFFEFC;
  --grey: rgb(100, 100, 100);
  --light-beige: #F9F5F1;
  --dark-beige: #968677;
  --blue: #0B6E99;
  --light-blue: #c1d8e2;
  --orange: rgb(235, 87, 87);
}

*, *::before, *::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

@media (max-width: 500px) {
  #app {
    width: 95%;
  }
}

#content {
  min-height: calc(100vh - 80px - 30px);  /* - header - footer */
}

.messages {
  position: absolute;
  top: 64px;
  z-index: 10;
}

h1 {
  font-size: 32px;
  line-height: 42px;
}

h2 {
  font-size: 22px;
  line-height: 28px;
}

a {
  color: black;
  text-decoration: none;
}

.link {
  transition: opacity 250ms;
}

.link:hover {
  opacity: .8;
}

.normal-link, .markdown-body a {
  color: var(--orange);
  text-decoration: underline;
}

.normal-link:hover, .markdown-body a:hover {
  text-decoration: none;
}

button.normal-link {
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
}

.space {
  display: inline-block;
  width: 16px;
  height: 36px;
}

.button, button:not(.normal-link) {
  color: #FFFFFF;
  background: #e16259;
  border: 1px solid #be5643;
  box-shadow: 0 1px 2px rgb(15 15 15 / 10%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  border-radius: 3px;
  font-size: 14px;
  padding: 1px 12px;
  outline: none;
  cursor: pointer;
  margin: 8px 0;
}

.button:hover, button:not(.normal-link):hover {
  background: #cf534a;
}

.button:active, button:not(.normal-link):active {
  background: #bf4d45;
}

input.file {
  display: none;
}

.center-items {  /* -v */
  display: flex;
  align-items: center;
}

.placeholder {
  user-select: none;
  pointer-events: none;
  background: var(--light-beige);
  color: var(--light-beige) !important;
  border-radius: 6px;
}

.placeholder * {
  opacity: 0 !important;
}
</style>
