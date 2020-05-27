<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImage,index) in skuImageList" :key="skuImage.id">
        <img
          :src="skuImage.imgUrl"
          :class="{active:index === currentIndex}"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: ["setCurrentImgIndex"],
  // mounted() {
  //   this.setCurrentImgIndex(2);
  // },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index;
      this.setCurrentImgIndex(index);
    }
  },
  computed: {
    ...mapGetters(["skuImageList"])
  },
  watch: {
    skuImageList: {
      handler(value) {
        if (value.length == 0) return;
        // 延迟到界面更新后才创建swiper对象
        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {
            slidesPerView: 5, // 一次显示5页
            slidesPerGroup: 2, // 以2页为单位翻页
            navigation: {
              //指定翻页按钮
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>