<template>
  <div class="navbar">
    <div class="navbar__btns">
      <button
        class="navbar__btn"
        @click="$router.push('/Kanban-board-with-Vue/')"
        :class="{  active: route.path === '/Kanban-board-with-Vue/' }"
      >
       {{ $t("navBar.application") }} 
      </button>
      <button
        class="navbar__btn"
        @click="$router.push('/Kanban-board-with-Vue/about')"
        :class="{ active: route.path === '/Kanban-board-with-Vue/about' }"
      >
      {{ $t("navBar.about") }} 
      </button>
    </div>
    <h1 class="navbar__title">{{ $t("appName") }} </h1>
    <div class="navbar__login">
      <div class="navbar__name">{{ userName}}</div>

      <button
        class="navbar__btn"
        @click="goToLoginPage"
      >
      {{userName?$t("navBar.logOut") :$t("navBar.logIn") }}
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
    @media screen and (max-width: 1024px){
    font-size: 1.2em;
    margin-left: 10px;
    margin-top: 1px;
  }
    @media screen and (max-width:768px) {
      display:none
    }
  }
  &__name{
    display: inline-block;
    margin-right: 16px;
    font-weight: bold;
    font-size: 18px;
    color:rgb(112, 146, 130);
    @media screen and (max-width: 1024px){
    font-size: 1em;
  }
  @media screen and (max-width: 568px){
    font-size: 0.5em;
    margin-right: 6px;

  }
  }
  &__btns {
  
& button:first-child{
  margin-right: 10px;

}
  
}
&__btn{
  font-weight: bold;
  border-radius: 4px;
  padding: 0.5em;
  border: none;
  font-size: 20px;
  background-image: linear-gradient(to right, white 50%, black 50%);
  background-size: 200% 100%;
  transition: background-position 0.5s;
  color: black;
  @media screen and (max-width: 1024px){
    font-size: 1em;
  }
  @media screen and (max-width: 568px){
    font-size: 0.7em;
  }
  &:hover{
  background-position: -100% 0;
  color: white;
}
}

}

.active {
  background: rgb(55, 99, 86);

  color: #ffffff;
}
</style>