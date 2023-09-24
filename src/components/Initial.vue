<template>
  <div class="initial">
    <div class="initial__text">Let create some tasks!</div>

    <button class="initial__btn " @click="store.showForm()">Add new task</button>
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