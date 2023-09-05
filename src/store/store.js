import { defineStore } from "pinia";
export const useToDoStore = defineStore("toDoStore", {
  state: () => ({
    tasks: {},
    isActive: false,
    currentTask: {},
  }),
  actions: {
    sortByPriority() {
      let sortedTasks = {};
      let sortedKeys = Object.keys(this.tasks).sort((a, b) =>
        this.tasks[a].priority.localeCompare(this.tasks[b].priority)
      );
      for (let key of sortedKeys) {
        sortedTasks[key] = this.tasks[key];
      }
      return (this.tasks = sortedTasks);
    },
    sortByDate() {
      let sortedTasks = {};
      let sortedKeys = Object.keys(this.tasks).sort((a, b) => {
        return this.tasks[b].id - this.tasks[a].id;
      });
      for (let key of sortedKeys) {
        sortedTasks[key] = this.tasks[key];
      }
      return (this.tasks = sortedTasks);
    },
    hideForm() {
      this.isActive = false;
    },
    addTask(task) {
      this.tasks[task.id] = task;
      this.isActive = false;
    },

    redactTask(redactedTask) {
      let task = this.tasks[redactedTask.id];
      task.title = redactedTask.title;
      task.description = redactedTask.description;
      task.priority = redactedTask.priority;
      this.isActive = false;
    },
    removeTask(currentTask) {
      delete this.tasks[currentTask.id];
    },
    showForm() {
      this.isActive = true;
    },
    showRedactForm(task) {
      this.isActive = true;
      this.currentTask.title = task.title;
      this.currentTask.description = task.description;
      this.currentTask.priority = task.priority;
      this.currentTask.id = task.id;
    },
  },
});
