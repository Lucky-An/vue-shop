<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="changeShowNav(true)" @mouseleave="changeShowNav(false)">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-if="showNav" @mouseleave="currentIndex = -1" @click="toSearch()">
          <div class="all-sort-list2">
            <div
              class="item"
              :class="{item_on:index === currentIndex}"
              v-for="(c1,index) in CategoryList"
              :key="c1.categoryId"
              @mouseenter="showChildList(index)"
            >
              <!-- @mouseenter="currentIndex = index" -->
              <h3>
                <a
                  :data-category1Id="c1.categoryId"
                  :data-categoryName="c1.categoryName"
                >{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a
                        :data-category2Id="c2.categoryId"
                        :data-categoryName="c2.categoryName"
                      >{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-category3Id="c3.categoryId"
                          :data-categoryName="c3.categoryName"
                        >{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"; //! 引入所有包含工具方法的对象
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      showNav: true
    };
  },
  mounted() {
    // this.isShowNav()
  },
  props: {
    isShowFirst: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    // * 显示二级菜单
    showChildList: throttle(function(index) {
      this.currentIndex = index;
    }, 300),
    // * typeNav点击跳转到search
    toSearch() {
      if (event.target.tagName === "A") {
        let query = {};
        query.categoryname = event.target.dataset.categoryname;
        if (event.target.dataset.category1id) {
          query.category1id = event.target.dataset.category1id;
        } else if (event.target.dataset.category2id) {
          query.category2id = event.target.dataset.category2id;
        } else if (event.target.dataset.category3id) {
          query.category3id = event.target.dataset.category3id;
        }
        if (this.$route.params) {
          console.log(this.$route.params);
          this.$router.push(
            {
              name: "search",
              query: query,
              params: this.$route.params
            },
            () => {}
          );
        } else {
          console.log("params没有");
          this.$router.push({ path: "/search", query: query }, () => {});
        }
      }
      // console.log();
    },
    // 鼠标悬停事件改变三级列表的显示和隐藏
    changeShowNav(params) {
      if (!this.isShowFirst) {
        this.showNav = params;
      }
    }
  },
  watch: {
    isShowFirst: {
      handler: function(val) {
        this.showNav = val;
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      CategoryList: state => {
        return state.home.BaseCategoryList.slice(0, 15);
      }
    })
  }
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background: #cccccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
