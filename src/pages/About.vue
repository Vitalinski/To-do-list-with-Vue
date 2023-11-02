<template>
    <nav-bar></nav-bar>

  <div class="about">
    <h1 class="about__title">About the Developer</h1>
    <div class="about__text">
     <h3> Hello! </h3>
      <p>
        My name is Vitalii, and I am a passionate developer with
        expertise in Vue.js. I love creating innovative solutions
        and exploring new technologies to build amazing applications.  I am
        constantly learning and staying up to date with the latest industry trends
        and best practices. In addition to my technical skills, I value
        collaboration and teamwork. I believe in effective communication and enjoy
        working with diverse teams to deliver high-quality results.  I am always seeking new opportunities to grow
        both personally and professionally. 
      </p>
      <p>
        
        Thank you for visiting my page! If you
        have any questions or would like to connect, please feel free to reach out
        to me.
      </p>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: "About",
  components:{
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