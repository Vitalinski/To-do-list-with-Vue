<template>
<h1 >To do list </h1>



<CreateForm v-model:isActive="isActive"
@addTask="addTask" >

</CreateForm>
<RedactForm v-model:isRedactActive="isRedactActive"
@redactTask="redactTask" :currentTask="selectedTask">

</RedactForm>

<div v-if="tasks.length>0">
  <div class="buttons">
    <div class="add">
      <button class="btn" @click="showForm">Add new task</button>
    </div>
    <div class="sort "><button class="btn" @click="sortByDate">Sort by date</button>
      <button class="btn" @click="sortByPriority">Sort by priority</button>
    </div>
  </div>
  
  <div class="task-field" >
  
<transition-group name="task-list">
      <div
              class="task"
              v-for="(task) in tasks"
              :key="task.id"
     :style="{ 'border-left-color': priority[task.priority] }"
            >
            <div class="task-btns">
                <button class="redact-btn"
                @click="showRedactForm(task)"><img class="redact-img" src="./images/free-icon-pencil-4347485.png" ></button>
                <button class="remove-btn"
                @click="removeTask(task)"
                >X</button></div>
              <div class="task-title">{{ task.title }}</div>
             
              <div class="task-description">{{ task.description }}</div>
              <div class="task-date">Date:{{ task.date }}</div>
    
             
              </div>
              
</transition-group>
          </div>
          
</div>
<div class="starter-text" v-else>Let create some tasks!
  <div class="add">
    <button class="starter-add-btn" @click="showForm">Add new task</button>
  </div>
</div>


</template>

<script>
import CreateForm from './components/CreateForm.vue'
import RedactForm from './components/RedactForm.vue'
export default {
name:'App',
components :{
  CreateForm,
  RedactForm
},
data(){
  return{
    isActive:false,
    isRedactActive:false,
    priority:{
      minimal:'green',
      medium:'yellow',
      maximum:'red'
    }

    ,
    selectedTask:{},
tasks:[]
  }
},
methods:{
  addTask(task){
this.tasks.push(task)
this.isActive=false

  },
  sortByPriority(){
    this.tasks.sort((a, b) => a.priority.localeCompare(b.priority));
  },
  sortByDate(){
this.tasks.sort((a,b)=>b.id - a.id ) 

  },
  redactTask(redactedTask){
for(let task of this.tasks){
  if(redactedTask.id === task.id){
    task.title = redactedTask.title
    task.description = redactedTask.description
    task.priority = redactedTask.priority

  }
}


  },
  removeTask(currentTask){
this.tasks = this.tasks.filter(task => task.id!==currentTask.id)
  },
showForm(){
  this.isActive=true
},
showRedactForm(task){
  this.isRedactActive=true
  this.selectedTask.title=task.title
  this.selectedTask.description=task.description
  this.selectedTask.priority=task.priority
  this.selectedTask.id=task.id

}
}

}
</script>

<style>
 #app {
  min-height: 100vh;
  background-color: rgb(109, 96, 179);
}
.starter-text{
  color: #fff;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
  margin-top: 3em;
}
.starter-add-btn{
  font-size: 0.5em;
  font-weight: bold;
  border-radius: 12px;
  padding: 0.4em;
  border: none;
  margin-top: 2em;
}
.buttons{
  margin-top: 1em;
display: flex;
flex-direction: row;
justify-content: space-between;
}
.btn{
  font-weight: bold;
  border-radius: 12px;
  padding: 0.5em;
  border: none;
  font-size: 1em;
}
.sort .btn{
  margin-left: 1em;
}
.task-description{
  max-height: 3.2em;
  overflow-wrap:break-word;
  overflow: auto;

  

}
.task{
  border: 1px solid #000;
  margin-bottom: 10px;
  background-color: #ffff;
  border-radius: 4px;
  padding: 0.2em;
  border-left: 1em solid #000;
  min-height: 8em;
  display: grid;
grid-template: 0 auto 1fr auto  / 1fr  ;
}
.task-field{
  margin-top: 2em;
  display: grid;
grid-template: 1fr / repeat(3,30%);
grid-auto-flow: row;
justify-content: space-between;
   
}
.task-title{
  text-align: center ;
  font-weight: bold;
  margin-top: 1.5em;
  overflow: auto;
}
.task-date{
  font-size: 0.7em;
text-align: right;

}
h1{
  text-align: center;
  color: black;
  font-weight: bold;
}


.task-btns {
  text-align: right;


}
.task-btns button{
  width: 2em;
  height: 1.5em;
  border-color:white  ;
  background-color: #fff;
  margin-left: 0.2em;

}
button:hover{
  cursor: pointer;
}
.remove-btn{
  color: red;
  font-weight: bold;

}
.remove-btn:hover{
  background-color: red;
  color: #fff;
  border-color:red  ;

}
.redact-img{
  max-height: 100%;
  max-width: 100%;
}
.redact-btn:hover{
  border-color:rgba(0, 0, 0, 0.5)  ;
}
.task-list-enter-active,
.task-list-leave-active{
  transition: all 0.5s ease;
}
.task-list-enter-from,
.task-list-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
.task-list-move{
  transition: transform 0.8s ease;
}
</style>