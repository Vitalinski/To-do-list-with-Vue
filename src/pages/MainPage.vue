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
import Initial from "../components/Initial.vue";
import OverlayForm from '../components/OverlayForm.vue';
import TasksBoard from "../components/TasksBoard.vue";
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
      tasks: [],
    };
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
      this.tasks = this.tasks.filter((task) => task.id !== currentTask.id);
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
* {
  margin: 0;
}
#app {
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  min-height: 100vh;
  min-width: 100vw;
  background-color: rgb(109, 96, 179);
}
.main-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  
}
.main-page__title {
  text-align: center;
}

.buttons {
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.btn {
  font-weight: bold;
  border-radius: 12px;
  padding: 0.5em;
  border: none;
  font-size: 1em;
}
.buttons__sort .btn {
  margin-left: 1em;
}

</style>


