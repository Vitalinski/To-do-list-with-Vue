<template>
  <div class="spinner__container">
    <div class="spinner">
      <div class="spinner__text">Loading...</div>
    </div>
  </div>
</template>

<style scoped >
.spinner__container {
    min-height: 100vh;
    display: flex;
    align-items: center;
}
.spinner {
  margin: 0 auto;
  width: 300px;
  height: 300px;

  transform: translatey(-50%);

  text-align: center;
}
.spinner__text {
  font-family: serif;
  font-weight: 600;
  font-size: 34px;
  text-transform: uppercase;
  line-height: 300px;
  animation: text 3s ease-in-out infinite;
}
@keyframes text {
  50% {
    opacity: 0.2;
  }
}
.spinner:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  animation: ring 1.5s linear infinite;
}
@keyframes ring {
  0% {
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px red;
  }
  50% {
    transform: rotate(180deg);
    box-shadow: 1px 5px 2px green;
  }
  100% {
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px blue;
  }
}
</style>