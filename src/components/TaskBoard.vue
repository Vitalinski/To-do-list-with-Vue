<template>


  <div class="task-field">
    <transition-group name="task-list">
      <div
        class="task"
        v-for="task in tasks"
        :key="task.id"
        :style="{ 'border-left-color': priority[task.priority] }"
      >
        <div class="task-btns">
          <button class="redact-btn" @click="showRedactForm(task)">
            <img class="redact-img" src="../assets/images/pencil.png" />
          </button>
          <button class="remove-btn" @click="removeTask(task)">X</button>
        </div>
        <div class="task-title">{{ task.title }}</div>

        <div class="task-description">{{ task.description }}</div>
        <div class="task-date">Date:{{ task.date }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "TaskBoard",
  props:{
tasks:{
    type:Array
},
priority:{
    type:Object
}
  },
  methods: {
    showRedactForm(task){
        this.$emit('showRedactForm',task)
    },
    removeTask(current){
        this.$emit('removeTask',current)
    }
  },
};
</script>

<style>
</style>