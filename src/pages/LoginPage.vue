<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container__text">Welcome to</div>
      <h2 class="login-container__title">Kanban Board</h2>
      <form
        @submit.prevent="isSignUpActive ? getSignInData() : getLoginData()"
        class="login-form"
        method="get"
      >
        <input
          v-if="isSignUpActive"
          class="login-form__input"
          placeholder="Name"
          required
          v-model="name"
          type="text"
        />
        <input
          class="login-form__input"
          placeholder="Email"
          required
          v-model="email"
          type="email"
          @focus="loginInvalidText=false"

        />
        <div class="password-container">
          <input
            id="password"
            class="login-form__input"
            type="password"
            placeholder="Password"
            required
            @focus="loginInvalidText=false"
            v-model="password"
          />

          <img
            @click="changeInputType('password')"
            class="password-container__img"
            src="@/assets/images/eye.png"
            alt="Show"
          />
        </div>
        <div class="password-container" v-if="isSignUpActive">
          <input
          @focus="loginInvalidText=false, passwordInvalidText = false"
            id="confirm"
            class="login-form__input"
            type="password"
            placeholder="Confirm password"
            required
            v-model="passwordConfirmation"
          />
          <span v-if="passwordInvalidText" class="password-container__invalid"
            >Passwords do not match.</span
          >

          <img
            @click="changeInputType('confirm')"
            class="password-container__img"
            src="@/assets/images/eye.png"
            alt="Show"
          />
        </div>
        <button class="login-form__btn" type="subbmit">
          {{ isSignUpActive ? "Create Account" : "LOGIN" }}
        </button>
        <span v-if="loginInvalidText" class="login-form__invalid">
          {{
            isSignUpActive
              ? "Please check your email and password (min 6 characters)"
              : "Invalid email or password"
          }}</span
        >
      </form>
      <div class="login-signUp">
        <span class="login-signUp__text"
          >{{
            isSignUpActive
              ? "Already have an account?"
              : "Don`t have an account?"
          }}
          <a @click="changeForm" href="#" class="login-signUp__link">{{
            isSignUpActive ? "Log in" : "Sign Up"
          }}</a></span
        >
      </div>
    </div>
  </div>
</template>

<script >
import { useToDoStore } from "../store/store";
export default {
  data() {
    return {
      store: useToDoStore(),
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      passwordInvalidText: false,
      loginInvalidText: false,
    };
  },
  computed: {
    isSignUpActive() {
      return this.store.isSignUpActive;
    },
  },
  methods: {
    async getLoginData() {
      const formData = { email: this.email, password: this.password };
      try {
        await this.store.login(formData);
        this.$router.push("/Kanban-board-with-Vue/");
        this.loginInvalidText = false;
      } catch {
        this.loginInvalidText = true;
      }
    },

    async getSignInData() {
      if (this.passwordConfirmation === this.password) {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name,
        };
        try {
          await this.store.register(formData);
          this.$router.push("/Kanban-board-with-Vue/");
        } catch (e) {
          this.loginInvalidText = true;
        }
      } else {
        this.passwordInvalidText = true;
      }
    },
    changeInputType(id) {
      const input = document.getElementById(id);
      input.type === "password"
        ? (input.type = "text")
        : (input.type = "password");
    },
    changeForm() {
      this.store.changeIsSignUpActive();
      this.email = "";
      this.password = "";
      this.passwordConfirmation = "";
      this.name = "";
      this.passwordInvalidText = false;
      this.loginInvalidText = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  &-container {
    width: 35%;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 10px;
    padding: 33px 55px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    text-align: center;
    &__text {
      font-weight: bold;
      font-size: 30px;
    }
    &__title {
      font-family: Poppins-Bold;

      color:rgb(99, 168, 103);

      font-size: 48px;
    }
  }
  &-form {
    margin: 50px 0 130px 0;
    &__input {
      display: block;
      font-size: 16px;
      font-weight: bold;
      height: 45px;
      padding: 0 5px;
      width: 100%;
      position: relative;
      border: none;
      border-bottom: 2px solid #adadad;
      margin-bottom: 37px;
      transition: all 0.8s;
      background-image: linear-gradient(
        to right,
        white 50%,
        rgba(56, 13, 104, 0.253) 50%
      );
      background-size: 200% 100%;

      &:focus {
        background-position: -100% 0;
      }
    }

    &__btn {
      color: white;
      font-weight: bold;
      width: 80%;
      border-radius: 25px;
      background: linear-gradient(to right, #16863b, #21d4fd, #21ff2c);
      font-size: 16px;
      padding: 0 20px;
      height: 50px;
      background-size: 200% 100%;
      transition: all 0.4s;

      &:hover {
        background-position: -100% 0;
      }
    }
    &__invalid {
      display: block;
      color: red;
      font-weight: bold;
      margin: 10px 0 -35px;
    }
  }
  &-signUp__link {
    white-space: nowrap;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    color:rgb(99, 168, 103);

    &:hover {
      text-decoration: underline;
      color: green;
    }
  }
}
.password-container {
  position: relative;
  &__img {
    position: absolute;
    height: 25px;
    width: 25px;
    top: 10px;
    right: 0;
    cursor: pointer;
  }
  &__invalid {
    display: block;
    font-weight: bold;

    color: red;
    position: absolute;
    top: 110%;
  }
}
</style>