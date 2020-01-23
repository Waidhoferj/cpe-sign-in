<template>
  <div class="qrcode-display">
    <img src="@/assets/back-icon.svg" alt="events" class="back" @click="$router.push('/events')" />
    <div class="centered-content">
      <h1 class="event">{{eventName}}</h1>
      <h2 class="sign-in-title">Sign In</h2>
      <canvas id="qrcode" ref="qrcode"></canvas>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  props: {
    qrcodeId: String
  },
  data() {
    return {
      eventName: ""
    };
  },
  methods: {
    generateQRCode() {
      if (!this.qrcodeId) return;
      let url =
        `${window.location.protocol}//${window.location.host}/login?eventId=` +
        this.qrcodeId;

      QRCode.toCanvas(
        this.$refs.qrcode,
        url,
        { width: window.innerWidth / 4 },
        function(err) {
          if (err) console.warn(err);
        }
      );
    }
  },
  mounted() {
    this.generateQRCode();
    if (this.$route.query.eventName)
      this.eventName = this.$route.query.eventName;
  }
};
</script>

<style lang="scss">
.qrcode-display {
  position: relative;
  width: 100%;
  height: 100%;
  .centered-content {
    padding: 30px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 7px;
    background: white;
    color: var(--dark);

    .event {
      margin: 5px 0;
    }

    .sign-in-title {
      font-weight: 300;
    }
  }
}
</style>
