<template>
  <div class="initial">
    <div  class="initial__text">{{userId?'Let create some tasks!':'First, you need to create an account or log in. Click the button in the upper right corner to open the login form."'}}</div>

    <button v-if="userId" class="initial__btn " @click="store.showForm()">Add new task</button>
  </div>
</template>

<script>
import { useToDoStore } from '../store/store';
export default {
  name: "Initial",
  data(){
    return{
      store:useToDoStore(),

    }
  },
  computed: {
    userId() {
      return this.store.userId;
    },
  },
  methods: {
    showForm() {
      this.$emit("showForm");
    },
  },
};
</script>

<style lang="scss">
.initial {
  text-align: center;

  &__text {
  color: #fff;
  font-weight: bold;
  font-size: 48px;
  margin-top: 150px;
}
&__btn {
  font-size: 24px;
  font-weight: bold;
  border-radius: 12px;
  padding: 10px;
  border: none;
  margin-top: 50px;

  &:hover{
  background-color: rgb(134, 119, 119);
  color: white;
  box-shadow: 0 5px 20px 5px #443636;
}
}
}


</style>