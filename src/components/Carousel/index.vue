<!-- 
  使用轮播组件必须传入一个数组 bannerList
  [
    {id:123,imgUrl:'dsfdsfs'},
    {id:456,imgUrl:'dsdfdsfwe'}
  ]
 -->
<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from "swiper";
export default {
  name: "Carousel",
  data() {
    return {};
  },
  props: {
    bannerList: {
      type: Array
    }
  },
  // mounted() {
  //   console.log("mounted", this.bannerList.length);
  // },
  methods: {
    swiperInit() {
      console.log("1");
      new Swiper(".swiper-container", {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true, //等同于以下设置
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },

        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar"
        }
      });
    }
  },
  watch: {
    bannerList: {
      immediate: true,
      handler: function(val) {
        if (val.length > 0) {
          this.$nextTick(this.swiperInit);
        }
      }
    }
  }
};
</script>

<style lang='less' scoped>
</style>