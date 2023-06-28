<template>
  <div class="create-form" v-if="isActive" @click="hideForm">
    <div @click.stop class="create-form-content">
      <form>
        <h2>Create the task</h2>
        <input v-model="title" class="input-title" type="text" placeholder="Title" />
        <textarea 
        v-model="description"
          class="input-description"
          type="text"
          placeholder="Description"
         cols="30" rows="10"></textarea>
        <div>
          Priority:
          <select class="select-priority" v-model="priority">
            <option value="minimal">Minimal</option>
            <option value="medium">Medium</option>
            <option value="maximum">Maximum</option>
          </select>

          <button class="create-form-btn" @click.prevent="createNewTask">
            Add new task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-form",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
   
  },
  data() {
      return {
        title: "",
        description: "",
        priority: "minimal",
      };
    },
  methods: {
    hideForm() {
      this.$emit("update:isActive", false);
    },
    getDate(){
  let date = new Date()
let fullDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
return fullDate
},
    createNewTask() {
      let task = {
        title:this.title,
        description: this.description,
        priority: this.priority,
        date:this.getDate(),
        id:new Date()
      };
      this.$emit('addTask', task)

      this.title = "";
      this.description = "";
      this.priority = "minimal";
    },
  },
};
</script>

<style>
.input-title,
.input-description {
  width: 100%;
  border: 1px solid #000;
  padding: 0.5em;
  margin-top: 1em;
}

.create-form {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}
.create-form-content {
  padding: 2em;
  margin: auto;
  background: white;
  border-radius: 12px;
}
form {
  text-align: center;
  display: flex;
  flex-direction: column;
}
.create-form-btn {
  margin-left: 5em;
  margin-top: 1em;
  align-self: flex-end;
}
</style>