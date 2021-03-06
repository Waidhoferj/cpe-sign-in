<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view :signedIn="signedIn" :eventId="eventId" />
    </transition>
  </div>
</template>

<script>
import { auth, analytics } from "@/modules/firebase";

export default {
  data() {
    return {
      signedIn: false,
      eventId: ""
    };
  },
  created() {
    let { eventId } = this.$route.query;
    if (eventId) this.eventId = eventId;
    auth.onAuthStateChanged(user => {
      if (user) {
        analytics.setUserId(user.uid);
        this.signedIn = true;
      } else this.signedIn = false;
    });
  }
};
</script>

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
  --card: #faebe6;
  color: white;
  background: var(--accent);
  height: 100%;
}

h1 {
  margin: 25px 0;
  font-size: 40px;
  font-weight: 500;
}

h2 {
  font-size: 35px;
  font-weight: 500;
}

h3 {
  font-size: 20px;
  font-weight: 500;
}

.page {
  display: flex;
  width: 100%;
  min-height: 100%;
  background: var(--accent);
  overflow-y: scroll;

  .content {
    padding: 20px;
    max-width: 750px;
    width: 100%;
    margin: auto;
  }
}

.card {
  background: var(--card);
  border-radius: 7px;
  width: 100%;
  header {
    text-align: center;
    padding: 20px 10px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
  .panel {
    background: white;
    padding: 15px;
    border-radius: 7px;
    padding: 20px;
  }

  .description {
    width: 90%;
    margin: auto;
  }
  .resources {
    width: 50%;
    margin: 10px auto;
    margin-top: 20px;
    .resource {
      display: block;
      margin: 10px auto;
      padding: 10px 20px;
      border-radius: 7px;
      text-align: center;
      color: white;
      background: var(--dark);
      text-decoration: none;
      cursor: pointer;
    }
  }
}

.back {
  cursor: pointer;
  position: fixed;
  width: 40px;
  top: 20px;
  left: 20px;
  transition: transform 0.3s, opacity 0.7s;
  z-index: -1;
  &:active {
    transform: scale(0.95);
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
    transition: opacity 0.4s;
    pointer-events: none;
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
