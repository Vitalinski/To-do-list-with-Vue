<template>
  <div class="overlay" v-if="isActive" @mousedown="hideForm">
    <div @mousedown.stop class="overlay__content">
      <form class="form">
        <h2>{{  currentTask.id ? $t('overlayForm.watch')  :  $t('overlayForm.create') }}</h2>
        <input
          v-model.trim="currentTask.title"
          class="form__title"
          type="text"
          :placeholder="$t('overlayForm.placeholders.title')"        />
        <textarea
          v-model.trim="currentTask.description"
          class="form__description"
          type="text"
          :placeholder="$t('overlayForm.placeholders.description')"        
          cols="30"
          rows="10"
        ></textarea>
        <div class="form__footer">
          <div class="form__img-block">
            <input type="file" @change="saveImage" class="form__image-upload" />
            <div class="form__image">
              
              <img v-if="currentTask.image" :src="currentTask.image" alt="Uploaded Image" />
              <p v-else>{{ $t('overlayForm.chooseImage') }}</p>
            </div>
          </div>
          <div >
            <div>
             <span>{{ $t('overlayForm.type') }}</span>
              <input
                v-model.trim="currentTask.type"
                @input="limitToSingleLetter"
                class="form__type"
                type="text"
                :placeholder="$t('overlayForm.placeholders.type')"        
                maxlength="15"
              />
            </div>
            <div>
            <span> {{ $t('overlayForm.priority') }}</span>
              <select class="form__priority" v-model="currentTask.priority">
                <option value="minimal">{{ $t('overlayForm.minimal') }}</option>
                <option value="medium">{{ $t('overlayForm.medium') }}</option>
                <option value="maximum">{{ $t('overlayForm.maximum') }}</option>
              </select>
            </div>
            <div>
              <button class="form__submit" @click.prevent="submit">
                {{ currentTask.id ?  $t('overlayForm.save') : $t('overlayForm.add')}}
              </button>
            </div>
          </div>
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
      this.currentTask.image = null;
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
        title: this.currentTask.title || null,
        description: this.currentTask.description || null,
        priority: this.currentTask.priority || "minimal",
        type: this.currentTask.type || "Without type",
        image: this.currentTask.image || null,
        done: false,
        fullDate: this.currentTask.fullDate || new Date(),
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
        (task.date = this.getDate()), this.store.addToFirebase(task);
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
    background: rgb(189, 199, 194);
    border-radius: 12px;
    width: 768px;
  }
}

.form {
  text-align: center;
  display: flex;
  flex-direction: column;
  &__footer {
    font-size: 18px;
    display: flex;
    text-align: left;
    margin-top: 10px;
    justify-content: space-between;

   
  }
  &__img-block{
    display: flex;
    align-items: end;
    @media screen and (max-width: 678px) {
      display: block;
      
    }
  }
  &__image {
    border: 1px solid #000;
    background-color: white;
    height: 120px;
    width: 200px;
    text-align: center;
    & p{
      line-height: 120px;
    }

    & img {
      height: 100%;
      width: 100%;
      object-fit: fill;
      margin-bottom: -5px;
    }
  }
  &__image-upload {
  
    max-width: 132px;
    margin-right: 10px;
    font-size: 16px;
  }
  &__title,
  &__description {
    width: 100%;
    border: 1px solid #000;
    padding: 0.5em;
    margin-top: 1em;
    font-size: 16px;
    
  }
  &__type,
  &__priority{
    font-size: 16px;
  }
  span{
margin-right: 10px;
font-size: 18px;

  }
  &__submit {
    white-space: nowrap;
    font-size: 16px;
    background-color: rgb(55, 99, 86);
    color: white;
    padding: 0.5em;
    border-radius: 4px;
    margin-top: 1.5em;
  margin-left: 130px;
  &:hover{
    opacity: 0.8;
  }
  }
}
</style>
