<template>
  
  <div class="board">
      <div class="board__columns"
        v-for="(type, idx) in tasks"
        :key="idx"
      >
        <TasksBoard :tasks =type   :typeName= idx

 
></TasksBoard>
      </div> 
      </div>
    
</template>

<script>
import { useToDoStore } from '../store/store';
import TasksBoard from './TasksBoard.vue';
export default {
  components: { TasksBoard },
name:"TasksColumn",
data(){
    return{
store:useToDoStore()
    }
  },
  computed:{ 
    tasks(){
       return useToDoStore().tasks
  },
},

}

</script>

<style scoped>
.board{
  margin-top: 12px;
  display: flex;
flex-direction: row;
flex-wrap: nowrap;
gap: 10px;

}
.board__columns{
  padding: 8px;
  height: 65vh;
  overflow: auto;
width: 20vw;
border: 2px solid rgb(80, 51, 160);
background-color: rgb(130, 121, 185);

}


</style>