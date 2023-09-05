<template>
  <div class="navbar">
    <div class="navbar__btns">
      <button
        class="navbar__btn-main btn"
        @click="$router.push('/')"
        :class="{ active: route.path === '/' }"
      >
        Application
      </button>
      <button
        class="navbar__btn-about btn"
        @click="$router.push('/about')"
        :class="{ active: route.path === '/about' }"
      >
        About the developer
      </button>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
};
</script>

<style lang="scss">
.navbar {
  text-align: right;
  
  &__btns {
  background-color: #240e63a8;
  display: inline-block;
  padding: 30px 20px;
  border-bottom-left-radius: 12px;
}

&__btn-main {
  margin-right: 10px;
}
}

.active {
  background-color: #796a6a;
  color: #ffffff;
}
</style>