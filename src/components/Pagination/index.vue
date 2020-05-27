<template>
  <!--分页组件-->
  <div class="pagination">
    <!--上一页-->
    <button :disabled="currentPage === 1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start > 1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 -->
    <button disabled v-if="startEnd.start > 2">···</button>
    <!-- 连续页码 -->
    <button
      :class="{active:item === currentPage}"
      v-for="(item, index) in startEndArray"
      :key="index"
      @click="changeCurrentPage(item)"
    >{{item}}</button>

    <!-- 省略号 -->
    <button disabled v-if="startEnd.end < totalPage-1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end < totalPage" @click="changeCurrentPage(totalPage)">{{ totalPage }}</button>
    <!--下一页-->
    <button :disabled="currentPage === totalPage" @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{ pageConfig.total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageConfig: {
      type: Object,
      default: {
        total: 0, //* 总数据个数
        showPageNow: 3, //* 连续显示页码数
        pageNo: 1, //* 当前页码
        pageSize: 10 //* 每页显示条数
      }
    }
  },
  //   ! 在data中可以直接读取 props上的数据   也可以直接读取Vue原型上的数据  如 this.$bus
  data() {
    return {
      currentPage: this.pageConfig.pageNo //* 当前页码
    };
  },
  computed: {
    //   * 计算总页码数
    totalPage() {
      const { total, pageSize } = this.pageConfig;
      console.log(total, pageSize, "123");
      return Math.ceil(total / pageSize);
    },
    //* 计算起始结束页码
    startEnd() {
      //* 根据已有数据计算出连续页码的start和end
      // 当前页码
      const currentPage = this.currentPage;
      //连续页码
      const showPageNow = this.pageConfig.showPageNow;
      //* 总页码数
      const totalPage = this.totalPage;
      console.log(currentPage, showPageNow, this.totalPage);
      let start = 1;
      let end = 1;

      start = currentPage - Math.floor(showPageNow / 2);
      console.log(start, "start");
      if (start < 1) {
        start = 1;
      }
      end = start + showPageNow - 1;

      if (end > totalPage) {
        end = totalPage;
        start = end - showPageNow + 1;
      }
      console.log(start, end);
      return { start, end };
    },
    startEndArray() {
      let pageArray = [];
      let { start, end } = this.startEnd;
      for (let i = start; i <= end; i++) {
        pageArray.push(i);
      }
      return pageArray;
    }
  },
  methods: {
    //   页码发生变化时调用
    changeCurrentPage(page) {
      this.currentPage = page;
      this.$emit("changeCurrentPage", this.currentPage);
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>