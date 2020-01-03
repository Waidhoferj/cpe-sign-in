<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --dark: #325c6f;
  --accent: #df8162;
  --burnt: #d57a5c;
  color: white;
  background: var(--accent);
  height: 100%;

  h1 {
    margin: 25px 0;
    font-size: 50px;
    font-weight: 500;
  }
}

.page {
  display: flex;
  width: 100%;
  min-height: 100%;
  background: var(--accent);
  overflow-y: scroll;

  .content {
    padding: 50px;
    max-width: 750px;
    width: 100%;
    margin: auto;
    background: var(--accent);
  }
}

input {
  font-family: inherit;
  font-size: 20px;
  display: block;
  margin: 10px auto;
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--base);
  text-align: center;
}

button {
  font-size: 17px;
  display: block;
  padding: 10px 60px;
  margin: 10px auto;
  border-radius: 20px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid white;
  transition: transform 0.5s;

  &.primary {
    font-size: 20px;
    background: white;
    color: var(--accent);
  }
  &.secondary {
    background: transparent;
    border: 2px solid white;
    color: white;
  }

  &.shake {
    animation: shake 0.5s;
  }

  &:active {
    transform: scale(0.95);
  }
}

//Animations
//=======================================
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.7s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

@keyframes shake {
  25% {
    transform: translateX(20px);
  }
  75% {
    transform: translateX(-20px);
  }
}
</style>
