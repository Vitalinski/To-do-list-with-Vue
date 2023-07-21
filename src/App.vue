<template >
  <nav-bar></nav-bar>

<router-view></router-view>
</template>

<script>
import NavBar from './components/UI/NavBar.vue';
export default {

  name: "App",
  components: { NavBar },
};
</script>

<style>
</style>