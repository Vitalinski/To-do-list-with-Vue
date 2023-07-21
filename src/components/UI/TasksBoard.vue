<template>


  <div class="board">
    <transition-group name="tasks-board">
      <div
        class="task"
        v-for="task in tasks"
        :key="task.id"
        :style="{ 'border-left-color': priority[task.priority] }"
      >
        <div class="task__btns">
          <button class="task__redact-btn" @click="showRedactForm(task)">
            <img class="task__redact-img" src="src/assets/images/pencil.png" />
          </button>
          <button class="task__remove-btn" @click="removeTask(task)">X</button>
        </div>
        <div class="task__title">{{ task.title }}</div>

        <div class="task__description">{{ task.description }}</div>
        <div class="task__date">Date:{{ task.date }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "TasksBoard",
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

<style lang="scss">
.board {
  margin-top: 2em;
  display: grid;
  grid-template: 1fr / repeat(3, 30%);
  grid-auto-flow: row;
  justify-content: space-between;
}

.task {
  border: 1px solid #000;
  margin-bottom: 10px;
  background-color: #ffff;
  border-radius: 4px;
  padding: 0.2em;
  border-left: 1em solid #000;
  min-height: 8em;
  display: grid;
  grid-template: 0 auto 1fr auto / 1fr;


&__title {
  text-align: center;
  font-weight: bold;
  margin-top: 1.5em;
  overflow: auto;
}
&__description {
  max-height: 3.2em;
  overflow-wrap: break-word;
  overflow: auto;
}
&__date {
  font-size: 0.7em;
  text-align: right;
}


&__btns {
  text-align: right;
}

&__remove-btn {
  color: red;
  font-weight: bold;
  &:hover {
  background-color: red;
  color: #fff;
  border-color: red;
}
}

&__redact-img {
  max-height: 100%;
  max-width: 100%;
}
}

.task__btns button {
  width: 2em;
  height: 1.5em;
  border-color: white;
  background-color: #fff;
  margin-left: 0.2em;
}
button:hover {
  cursor: pointer;
}
.task__redact-btn:hover {
  border-color: rgba(0, 0, 0, 0.5);
}
.tasks-board-enter-active,
.tasks-board-leave-active {
  transition: all 0.5s ease;
}
.tasks-board-enter-from,
.tasks-board-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.tasks-board-move {
  transition: transform 0.8s ease;
}
</style>