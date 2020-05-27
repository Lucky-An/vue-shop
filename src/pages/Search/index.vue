<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="options.categoryname">
              {{ options.categoryname }}
              <i @click="removeOptions('categoryname')">×</i>
            </li>
            <li class="with-x" v-if="options.keyword">
              {{ options.keyword }}
              <i @click="removeOptions('keyword')">×</i>
            </li>
            <li class="with-x" v-if="options.trademark">
              {{ options.trademark }}
              <i @click="removeOptions('trademark')">×</i>
            </li>
            <!-- v-if="options.props" -->
            <li class="with-x" v-for="(item, index) in options.props" :key="index">
              {{ item }}
              <i @click="removeOptions('props',index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" :setProps="setProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:options.order.indexOf('1')===0}" @click="changeOrder('1')">
                  <a>综合</a>
                  <!-- <a v-if="jiantou1">{{jiantou1}}</a> -->
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li :class="{active:options.order.indexOf('1')!==0}" @click="changeOrder('2')">
                  <a>价格</a>
                  <!-- <a v-if="jiantou2">{{jiantou2}}</a> -->
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                    <!-- <a href="item.html" target="_blank">
                      
                    </a>-->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted">
                  <span>...</span>
                </li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div>
                <span>共10页&nbsp;</span>
              </div>
            </div>
          </div>-->
          <Pagination
            :pageConfig="{
              total: productList.total, //* 总数据个数
              showPageNow: 3, //* 连续显示页码数
              pageNo: options.pageNo, //* 当前页码
              pageSize: options.pageSize //* 每页显示条数
              }"
            @changeCurrentPage="changeCurrentPage"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      options: {
        category1id: "",
        category2id: "",
        category3id: "",
        categoryname: "",
        props: [], //* 商品筛选属性
        trademark: "", //* 品牌
        /* 
        综合1,价格2
        升序asc,降序desc
        (示例:“1:desc”)
        */
        order: "1:desc",
        pageNo: 1, //* 页码
        pageSize: 5, //* 每页数据数量
        keyword: "" //* 关键字
      },
      jiantou1: "↓",
      jiantou2: ""
    };
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      productList: state => state.search.productList
    })
  },
  watch: {
    $route: {
      handler: function(to, from) {
        this.routeChange();
      },
      immediate: true
    }
  },
  mounted() {
    this.$store.dispatch("getProductListTostate", this.options);
  },
  methods: {
    //route改变时调用
    routeChange() {
      const { query, params } = this.$route;
      const options = {
        ...this.options,
        category1id: "",
        category2id: "",
        category3id: "",
        categoryname: "",
        keyword: "",
        ...query,
        ...params
      };
      this.options = options;
      console.log(this.options);
      this.getProductListAxios();
    },
    //移除搜索条件
    removeOptions(item, index) {
      if (item === "categoryname") {
        console.log("cate");
        this.$router.push({ name: "search", params: this.$route.params });
      } else if (item === "keyword") {
        console.log("query");
        this.$router.push({ name: "search", query: this.$route.query });
      } else if (item === "trademark") {
        this.options.trademark = "";
        this.getProductListAxios();
      } else if (item === "props") {
        this.options.props.splice(index, 1);
        console.log(this.options.props);
        this.getProductListAxios();
      }
    },
    // * 品牌选择
    setTrademark(id, name) {
      const params = id + ":" + name;
      this.options.trademark = params;
      this.getProductListAxios();
    },
    // * 商品属性添加
    setProps(id, name, value) {
      const params = id + ":" + value + ":" + name;
      const isHave = this.options.props.includes(params);
      if (!isHave) {
        this.options.props.push(params);
        this.getProductListAxios();
      }
    },
    //* 修改箭头上下方向  //未完待续
    changeOrder(item) {
      console.log("排序方式", item);
      // ! 点击了综合
      if (item === "1") {
        if (this.options.order.indexOf("2")) {
          this.options.order = "1:desc";
          this.jiantou1 = "↓";
          this.jiantou2 = "";
          console.log("排序方式", item);
        } else {
          if (this.options.order === "1:desc") {
            this.options.order = "1:asc";
            this.jiantou1 = "↑";
            this.jiantou2 = "";
          } else if (this.options.order === "1:asc") {
            this.options.order = "1:desc";
            this.jiantou1 = "↓";
            this.jiantou2 = "";
          }
        }
      } else if (item === "2") {
        if (this.options.order.indexOf("1")) {
          this.options.order = "2:desc";
          this.jiantou1 = "";
          this.jiantou2 = "↓";
        } else {
          if (this.options.order === "2:desc") {
            this.options.order = "2:asc";
            this.jiantou1 = "";
            this.jiantou2 = "↑";
          } else if (this.options.order === "2:asc") {
            this.options.order = "2:desc";
            this.jiantou1 = "";
            this.jiantou2 = "↓";
          }
        }
      }
    },
    //* 页码切换
    changeCurrentPage(page) {
      this.getProductListAxios(page);
    },
    //请求数据
    getProductListAxios(currentPage = 1) {
      this.options.pageNo = currentPage;
      this.$store.dispatch("getProductListTostate", this.options);
    }
  },
  components: {
    SearchSelector
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>