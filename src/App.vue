<template>
  <div>
    <Header></Header>
    <!-- 一级路由显示区域 -->
    <router-view></router-view>
    <Footer v-if="!$route.meta.isFooterHide"></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
// import Header from "./components/Header";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBaseCategoryList } from "@/api";
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBaseCategoryListToState");
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style lang='less' scoped>
div {
  h1 {
    color: red;
  }
}
</style>