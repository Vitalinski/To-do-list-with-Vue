<template>
  <div class="main-page">
    <h1 class="main-page__title">To do list</h1>
<OverlayForm
v-model:isRedactActive="isRedactActive"
      @redactTask="redactTask"
      :currentTask="selectedTask"
      v-model:isActive="isActive"
       @addTask="addTask"
       @hideForm="hideForm"
      ></OverlayForm>

    <div v-if="tasks.length > 0">
      <div class="buttons">
        <div class="buttons__add">
          <button class="buttons__btn btn" @click="showForm">Add new task</button>
        </div>
        <div class="buttons__sort">
          <button class="buttons__btn btn" @click="sortByDate">Sort by date</button>
          <button class="buttons__btn btn" @click="sortByPriority">Sort by priority</button>
        </div>
      </div>
      <TasksBoard
        :tasks="tasks"
        :priority="priority"
        @showRedactForm="showRedactForm"
        @removeTask="removeTask"
      ></TasksBoard>
    </div>
    <Initial v-else @showForm="showForm"> </Initial>
  </div>
</template>

<script>
import { useToDoStore } from '../store/store';
import Initial from "../UI/Initial.vue";
import OverlayForm from '../UI/OverlayForm.vue';
import TasksBoard from "../UI/TasksBoard.vue";

export default {
  name: "MainPage",
  components: {
    Initial,
    TasksBoard,
    OverlayForm,
  },
  data() {
    return {
      isActive: false,
      isRedactActive: false,
      priority: {
        minimal: "green",
        medium: "yellow",
        maximum: "red",
      },

      selectedTask: {},
    };
  },
  computed: {
    tasks() {
      return useToDoStore().tasks;
    },
  },
  methods: {
    hideForm(){
      this.isActive=false;
      this.isRedactActive= false
    },
    addTask(task) {
      this.tasks.push(task);
      this.isActive = false;
      this.isRedactActive = false;
    },
    sortByPriority() {
      this.tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    },
    sortByDate() {
      this.tasks.sort((a, b) => b.id - a.id);
    },
    redactTask(redactedTask) {
      for (let task of this.tasks) {
        if (redactedTask.id === task.id) {
          task.title = redactedTask.title;
          task.description = redactedTask.description;
          task.priority = redactedTask.priority;
        }
      }
      this.isRedactActive = false
      this.isActive= false 
    },
    removeTask(currentTask) {
     const store = useToDoStore()
      store.tasks = store.tasks.filter((task) => task.id !== currentTask.id);
    },
    showForm() {
      this.isActive = true;
    },
    showRedactForm(task) {
      this.isActive=true
      this.isRedactActive = true;
      this.selectedTask.title = task.title;
      this.selectedTask.description = task.description;
      this.selectedTask.priority = task.priority;
      this.selectedTask.id = task.id;
    },
  },
};
</script>

<style>



</style>


