<template>
  <div class="initial">
    <div class="initial__text">Let create some tasks!</div>

    <button class="initial__btn " @click="showForm">Add new task</button>
  </div>
</template>

<script>
export default {
  name: "Initial",
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
  background-color: black;
  color: white;
}
}
}


</style>