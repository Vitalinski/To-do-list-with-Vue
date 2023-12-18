<template>
  <nav-bar></nav-bar>

  <div class="about">
    <h1 class="about__title">{{ $t("aboutPage.title") }}</h1>
    <div class="about__text">
      <h3>{{ $t("aboutPage.hello") }}</h3>
      <p>
        {{ $t("aboutPage.text") }}
      </p>
      <p>
        {{ $t("aboutPage.bottomText") }}
      </p>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "About",
  components: {
    NavBar,
  },
};
</script>

<style scoped lang="scss">
.about {
  color: white;
  min-width: 500px;
  width: 50vw;
  margin: 0 auto;
  margin-top: 20px;

  &__title {
    text-align: center;
    border-bottom: 2px solid #000;
  }
  &__text {
    font-size: 20px;
    border: 2px solid #000;
    padding: 20px;
    margin-top: 50px;
    max-height: 60vh;
    overflow: auto;
  }
}

p:last-child {
  margin-top: 20px;
}
</style>
