<template>
  <div class="overlay" v-if="isActive" @mousedown="hideForm">
    <div @mousedown.stop class="overlay__content">
      <form class="form">
        <h2>{{ formTitle }}</h2>
        <input
          v-model.trim="currentTask.title"
          class="form__title"
          type="text"
          placeholder="Title"
        />
        <textarea
          v-model.trim="currentTask.description"
          class="form__description"
          type="text"
          placeholder="Description"
          cols="30"
          rows="10"
        ></textarea>
        <div>
          <input
            v-model.trim="currentTask.type"
            @input="limitToSingleLetter"
            class="form__type"
            type="text"
            placeholder="Type"
            maxlength="10"
            
          />
          <input
  type="file"
  @change="saveImage"
  class="form__image-upload"
/>
          Priority:
          <select class="form__priority" v-model="currentTask.priority">
            <option value="minimal">Minimal</option>
            <option value="medium">Medium</option>
            <option value="maximum">Maximum</option>
          </select>

          <button class="form__submit" @click.prevent="submit">
            {{ submitText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
    
    <script>
import { useToDoStore } from "../store/store";
export default {
  name: "OverlayForm",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      store: useToDoStore(),
    };
  },
  computed: {
    currentTask() {
      return this.store.currentTask;
    },
    formTitle() {
      return this.currentTask.id ? "Redact the task" : "Create the task";
    },
    submitText() {
      return this.currentTask.id ? "Save changes" : "Add new task";
    },
  },

  methods: {
    limitToSingleLetter(event) {
      const inputValue = event.target.value;
      if (!/^\d/.test(inputValue)) {
        this.currentTask.type = inputValue;
      } else {
        this.currentTask.type = "";
      }
    },

    hideForm() {
      this.currentTask.title = "";
      this.currentTask.description = "";
      this.currentTask.id = "";
      this.currentTask.priority = "minimal";
      this.currentTask.type = "";
      this.currentTask.image= null
      this.store.hideForm();
    },
    getDate() {
      let date = new Date();
      let fullDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
      return fullDate;
    },
  saveImage(event) {
      const selectedFile = event.target.files[0];
      
      if (selectedFile) {
        const blob = new Blob([selectedFile], { type: selectedFile.type });
        
        const reader = new FileReader();
        reader.onload = (e) => {
          this.currentTask.image = e.target.result;
        };
        reader.readAsDataURL(blob);
      }
},
    submit() {
      
      let task = {
        title: this.currentTask.title,
        description: this.currentTask.description,
        priority: this.currentTask.priority || "minimal",
        type: this.currentTask.type || "Without type",
        image:this.currentTask.image|| null,
        done:false
      };

      if (this.currentTask.id) {
        (task.id = this.currentTask.id),
          (task.priority =
            task.priority !== "" ? task.priority : this.currentTask.priority);
        task.title = task.title !== "" ? task.title : this.currentTask.title;
        task.description =
          task.description !== ""
            ? task.description
            : this.currentTask.description;
        task.type = task.type !== "" ? task.type : this.currentTask.type;
        task.date = this.currentTask.date;
        this.store.redactTask(task);
      } else {
        (task.date = this.getDate()),
          (task.id = new Date()),
          this.store.addTask(task);
      }
      this.hideForm();
    },
  },
};
</script>
    
    <style lang="scss">
.overlay {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 1;

  &__content {
    padding: 2em;
    margin: auto;
    background: white;
    border-radius: 12px;
  }
}

.form {
  text-align: center;
  display: flex;
  flex-direction: column;

  &__title,
  &__description {
    width: 100%;
    border: 1px solid #000;
    padding: 0.5em;
    margin-top: 1em;
  }
  &__submit {
    margin-left: 5em;
    margin-top: 1em;
    align-self: flex-end;
  }
}
</style>