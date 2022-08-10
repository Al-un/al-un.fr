<template>
  <al-app-base menu-drawer-position="hidden">
    <div id="nav" slot="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <pouet msg="Pouet?"></pouet>
  </al-app-base>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Pouet from "@/components/Pouet.vue";

export default defineComponent({
  components: {
    Pouet,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: lightcoral;
  width: 100%;
  height: 100%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
