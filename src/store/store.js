import { defineStore } from "pinia";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  onSnapshot,
  getDoc,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../main";

export const useToDoStore = defineStore("toDoStore", {
  state: () => ({
    isLoaderActive: false,
    userId: "",
    userTasksCollection: collection(
      db,
      "users",
      "cm8zSIV4fBIcf7XbMihz",
      "tasks"
    ),
    userName: "",
    tasks: {},
    arrTasks: [],
    isActive: false,
    currentTask: {},
    priority: {
      minimal: "rgb(48, 126, 74)",
      medium: "rgb(216, 213, 58)",
      maximum: "rgb(214, 59, 59)",
    },
    isSignUpActive: false,
  }),
  
  actions: {
    async getTasks() {
      try {
        this.startLoader();

        this.userId = await this.getUserId();

        const userDocRef = doc(db, "users", this.userId);

        getDoc(userDocRef).then((docSnapshot) => {
          const userData = docSnapshot.data();
          this.userName = userData.name;
        });

        this.userTasksCollection = collection(
          db,
          "users",
          this.userId,
          "tasks"
        );
        onSnapshot(this.userTasksCollection, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let task = {};
            task.id = doc.id;
            task.title = doc.data().title;
            task.priority = doc.data().priority;
            task.description = doc.data().description;
            task.image = doc.data().image;
            task.type = doc.data().type;
            task.date = doc.data().date;
            task.done = doc.data().done;
            task.fullDate = doc.data().fullDate;
            this.addTask(task);
          });
          this.endLoader();
        });
      } catch (error) {
        this.endLoader();

        // console.log(error);
      }
    },

    startLoader() {
      this.isLoaderActive = true;
    },
    endLoader() {
      this.isLoaderActive = false;
    },

    async login({ email, password }) {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        this.userId = this.getUserId();
      } catch (e) {
        throw e;
      }
    },
    changeIsSignUpActive() {
      this.isSignUpActive
        ? (this.isSignUpActive = false)
        : (this.isSignUpActive = true);
    },
    async logout() {
      this.userId = "";
      (this.tasks = {}), await getAuth().signOut();
    },
    async register({ email, password, name }) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        this.userId = this.getUserId();

        const userDocRef = doc(db, "users", this.userId);
        setDoc(userDocRef, {
          name: name,
        });
      } catch (e) {
        throw e;
      }
    },

    getUserId() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },

    addTask(task) {
      this.tasks[task.type]
        ? (this.tasks[task.type][task.id] = task)
        : (this.tasks[task.type] = {});
      this.tasks[task.type][task.id] = task;
      this.isActive = false;
    },
    updateFirebase() {
      for (let type in this.tasks) {
        for (let currentTask in this.tasks[type]) {
          let task = this.tasks[type][currentTask];
          updateDoc(doc(this.userTasksCollection, task.id), {
            type: task.type,
          });
        }
      }
    },
    addToFirebase(task) {
      addDoc(this.userTasksCollection, {
        title: task.title,
        priority: task.priority,
        description: task.description,
        type: task.type,
        done: task.done,
        date: task.date,
        image: task.image,
        fullDate: task.fullDate,
      });
    },

    toggleDone(e) {
      updateDoc(doc(this.userTasksCollection, e.id), {
        done: !e.done,
      });
    },

    redactTask(redactedTask) {
      updateDoc(doc(this.userTasksCollection, redactedTask.id), {
        title: redactedTask.title,
        description: redactedTask.description,
        priority: redactedTask.priority,
        type: redactedTask.type,
        image: redactedTask.image,
      });

      if (
        this.tasks[redactedTask.type] &&
        this.tasks[redactedTask.type][redactedTask.id]
      ) {
        let task = this.tasks[redactedTask.type][redactedTask.id];
        task.title = redactedTask.title;
        task.description = redactedTask.description;
        task.priority = redactedTask.priority;
        task.image = redactedTask.image;
      } else {
        for (let type in this.tasks) {
          if (this.tasks[type][redactedTask.id]) {
            delete this.tasks[type][redactedTask.id];
          }
        }
        let task = {};
        task.title = redactedTask.title;
        task.description = redactedTask.description;
        task.image = redactedTask.image;
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
      deleteDoc(doc(this.userTasksCollection, currentTask.id));
    },
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
          return type[b].fullDate - type[a].fullDate;
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
