<template>
  <div>
    <draggable
      class="board"
      v-model="arrTasks"
      group="columns"
      item-key="idx"
      @end="columnDragEnd"
      ghost-class="ghost"
    >
      <template #item="{ element }">
        <div class="board__columns">
          <TasksBoard :tasks="element"></TasksBoard>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script>
import { useToDoStore } from "../store/store";
import TasksBoard from "./TasksBoard.vue";
import draggable from "vuedraggable";
import {
  convertToArrayStructure,
  convertToObjectStructure,
} from "../functions";

export default {
  components: { TasksBoard, draggable },
  name: "TasksColumn",
  mounted() {
    this.updateArrayTasks();
  },
  data() {
    return {
      store: useToDoStore(),
      arrTasks: useToDoStore().arrTasks,
    };
  },
  computed: {
    tasks() {
      return useToDoStore().tasks;
    },
  },
  watch: {
    tasks: {
      handler: "updateArrayTasks",
      deep: true,
    },
  },

  methods: {
    updateArrayTasks() {
      convertToArrayStructure(this.tasks);
      this.arrTasks = useToDoStore().arrTasks;
    },

    columnDragEnd() {
      useToDoStore().arrTasks = this.arrTasks;
      convertToObjectStructure(this.arrTasks);
    },
  },
};
</script>

<style scoped>
.ghost{
  opacity: 0.3;
}
.board {

  margin-top: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
}

.board__columns {

  padding: 8px;
  height: 65vh;
  overflow: auto;
  width: 20vw;
  border: 2px solid rgb(80, 51, 160);
  background-color: rgb(130, 121, 185);
}
</style>
