import { defineStore } from "pinia";
export const useToDoStore = defineStore("toDoStore", {
  state: () => ({
    tasks: {},
    arrTasks:[],
    isActive: false,
    currentTask: {},
    priority: {
      minimal: "green",
      medium: "yellow",
      maximum: "red",
    },
  }),
  actions: {
    sortByPriority() {
      for (let typeKey of Object.keys(this.tasks)) {
        const type = this.tasks[typeKey];
        const sortedTasks = {};

        const sortedKeys = Object.keys(type).sort((a, b) => {
          const taskA = type[a];
          const taskB = type[b];
          return taskA.priority.localeCompare(taskB.priority);
        });

        for (let key of sortedKeys) {
          sortedTasks[key] = type[key];
        }

        this.tasks[typeKey] = sortedTasks;
      }
    },

    sortByDate() {
      for (let typeKey of Object.keys(this.tasks)) {
        const type = this.tasks[typeKey];
        let sortedTasks = {};
        let sortedKeys = Object.keys(type).sort((a, b) => {
          return type[b].id - type[a].id;
        });
        for (let key of sortedKeys) {
          sortedTasks[key] = this.tasks[typeKey][key];
        }
        this.tasks[typeKey] = sortedTasks;
      }
    },

    hideForm() {
      this.isActive = false;
    },
    addTask(task) {
      this.tasks[task.type]
        ? (this.tasks[task.type][task.id] = task)
        : (this.tasks[task.type] = {});
      this.tasks[task.type][task.id] = task;
      this.isActive = false;
    },

    redactTask(redactedTask) {
      if (
        this.tasks[redactedTask.type] &&
        this.tasks[redactedTask.type][redactedTask.id]
      ) {
        let task = this.tasks[redactedTask.type][redactedTask.id];
        task.title = redactedTask.title;
        task.description = redactedTask.description;
        task.priority = redactedTask.priority;
        task.image = redactedTask.image
      } else {
        for (let type in this.tasks) {
          if (this.tasks[type][redactedTask.id]) {
            delete this.tasks[type][redactedTask.id];
          }
        }
        let task = {};
        task.title = redactedTask.title;
        task.description = redactedTask.description;
        task.image = redactedTask.image
        task.priority = redactedTask.priority;
        task.type = redactedTask.type;
        task.id = redactedTask.id;
        task.date = redactedTask.date;
        if (!this.tasks[redactedTask.type]) {
          this.tasks[redactedTask.type] = {};
          this.tasks[redactedTask.type][redactedTask.id] = task;
        } else {
          this.tasks[redactedTask.type][redactedTask.id] = task;
        }
      }
      this.isActive = false;
    },
    removeTask(currentTask) {
      delete this.tasks[currentTask.type][currentTask.id];
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
      this.currentTask.type = task.type;
      this.currentTask.date = task.date;
      this.currentTask.image = task.image;

    },
    removeType(type) {
      delete this.tasks[type];
    },
  },
});
