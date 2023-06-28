<template>
  <div class="redact-form" v-if="isRedactActive" @click="hideRedactForm">
    <div @click.stop class="redact-form-content">
      <form>
        <h2>Redact the task</h2>
        <input
          :value="this.currentTask.title"
          @input="changeTitle"
          class="input-title"
          type="text"
          placeholder="Title"
        />
        <textarea
          :value="this.currentTask.description"
          @input="changeDescription"
          class="input-description"
          type="text"
          placeholder="Description"
          cols="30"
          rows="10"
        ></textarea>
        <div>
          Priority:
          <select
            class="select-priority"
            :value="this.currentTask.priority"
            @change="changePriority"
          >
            <option value="minimal">Minimal</option>
            <option value="medium">Medium</option>
            <option value="maximum">Maximum</option>
          </select>

          <button class="redact-form-btn" @click.prevent="redactNewTask">
            Save changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "redact-form",
  props: {
    isRedactActive: {
      type: Boolean,
      default: false,
    },
    currentTask: {
      type: Object,
    },
  },
  data() {
    return {
      title: "",
      description: "",
      priority: "",
    };
  },

  methods: {
    changeTitle(e) {
      this.title = e.target.value;
    },
    changeDescription(e) {
      this.description = e.target.value;
    },
    changePriority(e) {
      this.priority = e.target.value;
    },
    hideRedactForm() {
      this.$emit("update:isRedactActive", false);
    },

    redactNewTask() {
        
      let task = {
        title: this.title,
        description: this.description,
        priority: this.priority,
        id: this.currentTask.id,
      };
      task.priority = task.priority !== "" ? task.priority : this.currentTask.priority;
        task.title = task.title !== "" ? task.title : this.currentTask.title;
        task.description = task.description !== "" ? task.description : this.currentTask.description;

      this.$emit("redactTask", task);
      this.hideRedactForm();
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

.redact-form {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}
.redact-form-content {
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
.redact-form-btn {
  margin-left: 5em;
  margin-top: 1em;
  align-self: flex-end;
}
</style>