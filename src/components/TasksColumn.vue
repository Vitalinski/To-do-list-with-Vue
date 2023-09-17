<template>
  <div >
    
    <draggable class="board" v-model="columnsOrder" group="columns" item-key="idx" @end="columnDragEnd" >
      <template #item="{ element }">
        
        <div class="board__columns" >
          <TasksBoard :tasks="tasks[element]" :typeName="element"></TasksBoard>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script>
import { useToDoStore } from '../store/store';
import TasksBoard from './TasksBoard.vue';
import draggable from 'vuedraggable';

export default {
  components: { TasksBoard, draggable },
  name: 'TasksColumn',
  data() {
    return {
      store: useToDoStore(),
      columnsOrder: Object.keys(useToDoStore().tasks),
    };
  },
  computed: {
    tasks() {
      return useToDoStore().tasks;
    },
  },
  watch: {
    'tasks': {
      handler: 'updateColumnsOrder',
      deep: true, 
    },
  },

  methods: {

    updateColumnsOrder() {
      this.columnsOrder = Object.keys(this.tasks);
    },
    columnDragEnd() {

let newTasksObject = {}
for(let type of this.columnsOrder){
  newTasksObject[type]= this.tasks[type]
}

useToDoStore().tasks = newTasksObject

},
  },
};
</script>

<style scoped>
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
