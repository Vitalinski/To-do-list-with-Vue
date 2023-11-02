<template>
  <div class="navbar">
    <div class="navbar__btns">
      <button
        class="navbar__btn"
        @click="$router.push('/')"
        :class="{  active: route.path === '/' }"
      >
        Application
      </button>
      <button
        class="navbar__btn"
        @click="$router.push('/about')"
        :class="{ active: route.path === '/about' }"
      >
        About the developer
      </button>
    </div>
    <div class="navbar__login">
      <div class="navbar__name">{{ userName }}</div>

      <button
        class="navbar__btn"
        @click="goToLoginPage"
      >
      Log out
      </button>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useToDoStore } from "../store/store";
export default {
  data(){
    return{
      store:useToDoStore(),
route:useRoute(),
  }
},
computed:{

userName(){
  return this.store.userName
}
  },
methods:{
  async goToLoginPage(){
    await this.store.logout()
    this.store.changeIsSignUpActive()
    this.$router.push('/login')
  }
}
  
};
</script>

<style lang="scss" scoped>
.navbar {
  padding:  20px;
  background-color: #09031ba8;
  display: flex;
  justify-content: space-between;

  &__name{
    display: inline-block;
    margin-right: 16px;
    font-weight: bold;
    font-size: 18px;
    color: rgb(148, 154, 212);
  }
  &__btns {
    
& button:first-child{
  margin-right: 10px;

}
  
}
&__btn{
  font-weight: bold;
  border-radius: 12px;
  padding: 0.5em;
  border: none;
  font-size: 16px;
  background-image: linear-gradient(to right, white 50%, black 50%);
  background-size: 200% 100%;
  transition: background-position 0.5s;
  color: black;
  &:hover{
  background-position: -100% 0;
  color: white;
}
}

}

.active {
  background: rgb(109, 96, 179);
  color: #ffffff;
}
</style>