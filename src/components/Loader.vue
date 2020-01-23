<template functional>
  <div class="loader">
    <div class="bar"></div>
  </div>
</template>

<style lang="scss">
.loader {
  position: fixed;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 10px;
  overflow: hidden;
  .bar {
    border-radius: 7px;
    height: 100%;
    width: 40vw;
    animation: load 3s infinite linear;
    background: white;

    @keyframes load {
      0%,
      100% {
        transform: translateX(-10vw);
      }

      37% {
        transform: translateX(60vw);
      }
      50% {
        transform: translateX(70vw);
      }
      87% {
        transform: translateX(0);
      }
    }
  }
}
</style>