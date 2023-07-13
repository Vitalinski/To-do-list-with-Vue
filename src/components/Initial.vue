<template>
    <div class="starter-text">
      Let create some tasks!
      <div class="add">
        <button class="starter-add-btn" @click="showForm">Add new task</button>
      </div>
    </div>
</template>

<script>
export default {
name:'Initial',
methods:{
    showForm() {
      this.$emit("showForm");
    },
}
}

</script>

<style>

</style>