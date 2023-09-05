<template>
  <div class="main-page">
    <h1 class="main-page__title">To do list</h1>
    <OverlayForm
      v-model:isActive="isActive"
    ></OverlayForm>

    <div v-if="Object.keys(this.tasks).length > 0">
      <div class="buttons">
        <div class="buttons__add">
          <button class="buttons__btn btn" @click="store.showForm()">
            Add new task
          </button>
        </div>
        <div class="buttons__sort">
          <button class="buttons__btn btn" @click="store.sortByDate()">
            Sort by date
          </button>
          <button class="buttons__btn btn" @click="store.sortByPriority()">
            Sort by priority
          </button>
        </div>
      </div>
      <TasksBoard
    
        :priority="priority"
    
      ></TasksBoard>
    </div>
    <Initial v-else> </Initial>
  </div>
</template>

<script>
import { useToDoStore } from "../store/store";
import Initial from "../components/Initial.vue";
import OverlayForm from "../components/OverlayForm.vue";
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
      priority: {
        minimal: "green",
        medium: "yellow",
        maximum: "red",
      },
      store:useToDoStore(),
      tasks: useToDoStore().tasks,
    };
  },
  computed:{
isActive(){
  return useToDoStore().isActive
},

  },
};
</script>

<style>
</style>


