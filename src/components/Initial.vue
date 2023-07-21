<template>
  <div class="initial">
    <div class="initial__text">Let create some tasks!</div>

    <button class="initial__btn" @click="showForm">Add new task</button>
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

<style>
.initial {
  text-align: center;
}
.initial__text {
  color: #fff;
  font-weight: bold;
  font-size: 48px;
  margin-top: 150px;
}
.initial__btn {
  font-size: 24px;
  font-weight: bold;
  border-radius: 12px;
  padding: 10px;
  border: none;
  margin-top: 50px;
}
</style>