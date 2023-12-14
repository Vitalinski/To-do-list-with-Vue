<template>
  <div class="navbar">
    <div class="navbar__btns">
      <button
        class="navbar__btn"
        @click="$router.push('/Kanban-board-with-Vue/')"
        :class="{  active: route.path === '/Kanban-board-with-Vue/' }"
      >
        Application
      </button>
      <button
        class="navbar__btn"
        @click="$router.push('/Kanban-board-with-Vue/about')"
        :class="{ active: route.path === '/Kanban-board-with-Vue/about' }"
      >
        About the developer
      </button>
    </div>
    <h1 class="navbar__title">Kanban board</h1>
    <div class="navbar__login">
      <div class="navbar__name">{{ userName}}</div>

      <button
        class="navbar__btn"
        @click="goToLoginPage"
      >
      {{userName?"Log out":"Log in" }}
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
    this.$router.push('/Kanban-board-with-Vue/login')
  }
}
  
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  top: 10px;
  padding:  20px;
  background-color: #09031ba8;
  display: flex;
  justify-content: space-between;

  &__title{
    height: 34px;
    color: #ffffff;
    margin-left: -100px;
    margin-top: -5px;
    @media screen and (max-width:1024px) {
      display:none
    }
  }
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
  font-size: 20px;
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