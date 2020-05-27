<template>
  <div class="home">
    <!-- 商品分类导航 -->
    <TypeNav :isShowFirst="true"></TypeNav>
    <!--列表-->
    <ListContatiner></ListContatiner>
    <!--今日推荐-->
    <TodayRecommend></TodayRecommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!--楼层-->
    <Floor v-for="floor in floorsList" :key="floor.id" :floor="floor"></Floor>
    <!--商标-->
    <Brand></Brand>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";

import Brand from "./Brand/Brand";
import Floor from "./Floor/Floor";
import Like from "./Like/Like";
import ListContatiner from "./ListContainer/ListContainer";
import Rank from "./Rank/Rank";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      floorsList: state => {
        return state.home.floors;
      }
    })
  },
  mounted() {
    this.$store.dispatch("getFloorsList");
    this.$store.dispatch("getBannersList");
  },
  components: {
    Brand,
    Floor,
    Like,
    ListContatiner,
    Rank,
    TodayRecommend
  }
};
</script>

<style lang='less' scoped>
</style>