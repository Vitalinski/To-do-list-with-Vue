<template >
  <div class="header">
    <span class="header__text">{{ tasks.name }}</span>
    <button
      class="task__remove-btn header__btn"
      @click="store.removeType(tasks.name)"
    >
      X
    </button>
  </div>
  <div class="board">
    <draggable
      v-model="this.tasks.tasks"
      group="tasks"
      item-key="id"
      @end="tasksDragEnd"
      ghost-class="ghost"
    >
      <template #item="{ element }">
        <div
          class="task"
          :class="{ task__done: element.done }"
          @click="toggleDoneClass(element)"
          :style="{ 'border-left-color': store.priority[element.priority] }"
        >
          <div class="task__btns">
            <button
              class="task__redact-btn"
              @click.stop="store.showRedactForm(element)"
            >
              <img
                class="task__redact-img"
                src="src/assets/images/pencil.png"
                alt="pencil"
              />
            </button>
            <button class="task__remove-btn" @click="store.removeTask(element)">
              X
            </button>
          </div>
          <div class="task__title">{{ element.title }}</div>

          <div class="task__description">{{ element.description }}</div>
          <div class="task__img" >
            <img
              v-if="element.image"
              :src="element.image"
              alt="Uploaded Image"
            />
          </div>
          <div class="task__date">Date:{{ element.date }}</div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import { useToDoStore } from "../store/store";
import draggable from "vuedraggable";
import { convertToObjectStructure } from "../functions";
export default {
  name: "TasksBoard",
  components: {
    draggable,
  },
  props: {
    tasks: {
      type: Object,
    },
  },
  data() {
    return {
      store: useToDoStore(),
    };
  },

  methods: {
    tasksDragEnd(event) {
      let taskId = event.item.__draggable_context.element.id;
      convertToObjectStructure(useToDoStore().arrTasks);
      let tasks = useToDoStore().tasks;
      for (let key of Object.keys(useToDoStore().tasks)) {
        if (useToDoStore().tasks[key][taskId]) {
          useToDoStore().tasks[key][taskId].type = key;
        }
      }
      this.store.updateFirebase()
    },
    toggleDoneClass(e) {
   this.store.toggleDone(e)
    },
  },
};
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.3;
}
.header {
  position: sticky;
  z-index: 0;
  top: -8px;
  left: 0;
  text-align: center;
  margin: -8px;
  padding: 4px;
  background-color: rgb(185, 181, 214);

  &__text {
    font-weight: bold;
  }
  &__btn {
    float: right;
  }
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
  grid-template: 0 auto 1fr auto 30px / 1fr;
  min-width: 120px;
  font-size: 1.2em;
  @media screen and (max-width: 1024px){
    font-size: 0.8em;
  }
  &__done {
    background-color: #9b9090;
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    opacity: 0.5;
  }
  &__title {
    text-align: center;
    font-weight: bold;
    margin-top: 1.5em;
    overflow: auto;
    height: 3em;
    white-space: nowrap;
  }
  &__description {
    height: 5em;
    overflow-wrap: break-word;
    overflow: auto;
    min-height: 1.6em;
  }
  &__date {
    margin-top: 5px;
    text-align: right;
    white-space: nowrap;

  }

  &__btns {
    text-align: right;
  }

  &__remove-btn {
    opacity: 1;
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
  &__img {
    height: 10vw;
  }
  &__img img {
    height: 100%;
    width: 100%;
    object-fit: fill;
    border: 2px solid #000;
    margin-left: -2px;
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
</style>

