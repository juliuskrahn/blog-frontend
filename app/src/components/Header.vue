<template>
  <header class="header">
    <router-link class="header-title" to="/">
      <img class="pic" alt="" src="../assets/me.png">
      Julius Krahn
    </router-link>
    <div class="header-navs">
      <router-link to="/">Articles</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.header-title {
  display: flex;
  align-items: center;
  font-family: 'Roboto Slab', serif;
  font-size: 18px;
}

.pic {
  border-radius: 50%;
  width: 36px;
  margin-right: 12px;
}

.header-navs a {
  margin: 0 4px;
}

.header-navs a:last-child {
  margin-right: 0;
}

.header-navs a {
  padding: 6px 8px;
  border-radius: 3px;
  transition: background 250ms;
}

.header-navs a:hover {
  background-color: var(--light-beige);
}

@media (max-width: 500px) {
  .header-navs a {
    margin: 0 1px;
    padding: 2px 4px;
  }
}
</style>
