<template>
  <div class="qrcode-display">
    <img src="@/assets/back-icon.svg" alt="events" class="back" @click="$router.push('/events')" />
    <div class="card centered-content">
      <h1 class="event">{{eventName}}</h1>
      <h2 class="subject">{{subject}}</h2>
      <div class="panel">
        <canvas id="qrcode" ref="qrcode"></canvas>
      </div>
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
      eventName: "",
      subject: ""
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
    let { eventName, subject } = this.$route.query;
    if (eventName) this.eventName = eventName;
    if (subject) this.subject = subject;
  }
};
</script>

<style lang="scss">
.qrcode-display {
  position: relative;
  width: 100%;
  height: 100%;
  .centered-content {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--dark);
    max-width: 500px;

    .event {
      margin: 5px 0;
      padding-top: 15px;
    }

    .subject {
      font-size: 20px;
      margin: 8px 0;
      padding-bottom: 15px;
    }
  }
}
</style>
