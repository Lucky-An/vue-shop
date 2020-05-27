<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="handleMove"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="img" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  name: "Zoom",
  props: ["imgUrl", "bigImgUrl"],
  // data() {
  //   return {
  //     clientWidth: 0
  //   };
  // },
  mounted() {
    this.clientWidth = this.$refs.mask.clientWidth;
  },
  methods: {
    handleMove: throttle(function(event) {
      let { offsetX, offsetY } = event;
      const clientWidth = this.clientWidth;
      let top = offsetY - clientWidth / 2;
      let left = offsetX - clientWidth / 2;
      if (top < 0) {
        top = 0;
      } else if (top > clientWidth) {
        top = clientWidth;
      }
      if (left < 0) {
        left = 0;
      } else if (left > clientWidth) {
        left = clientWidth;
      }
      const maskDiv = this.$refs.mask;
      maskDiv.style.top = top + "px";
      maskDiv.style.left = left + "px";
      let imgNode = this.$refs.img;
      imgNode.style.top = -2 * top + "px";
      imgNode.style.left = -2 * left + "px";
    }, 100)
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    visibility: hidden;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    z-index: 998;
    display: none;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    visibility: inherit;
    display: block;
  }
}
</style>