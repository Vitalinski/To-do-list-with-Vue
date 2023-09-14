<template >
 
    
  <div class="header">
    
    <span class="header__text">{{ typeName }}</span>
    <button class="task__remove-btn header__btn" @click="store.removeType(typeName)">X</button>
    
  </div>
    <div class="board">
      <transition-group name="tasks-board">
        <div
          class="task"
          v-for="task in tasks"
          :key="task.id"
          :style="{ 'border-left-color': store.priority[task.priority] }"
        >
          <div class="task__btns">
            <button class="task__redact-btn" @click="store.showRedactForm(task)">
              <img class="task__redact-img" src="src/assets/images/pencil.png" />
            </button>
            <button class="task__remove-btn" @click="store.removeTask(task)">X</button>
          </div>
          <div class="task__title">{{ task.title }}</div>
  
          <div class="task__description">{{ task.description }}</div>
          <div class="task__date">Date:{{ task.date }}</div>
        </div>
      </transition-group>
    </div>
  
</template>

<script>
import { useToDoStore } from '../store/store';
export default {
  name: "TasksBoard",
  props:{
tasks:{
  type: Object
},
typeName:{

},
priority:{
    type:Object
}
  },
  data(){
    return{
store:useToDoStore(),

    }
  },


};
</script>

<style lang="scss" scoped>

.header{
  position: sticky;
  z-index: 0;
  top: -8px;
  left: 0;
text-align: center;
margin: -8px;
padding: 4px;
background-color: rgb(185, 181, 214);
}
.header__text{
  font-weight: bold;

}
.header__btn{
float: right;
}
.board {
  margin-top: 1em;
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
  min-width: 120px;

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

