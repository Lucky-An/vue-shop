<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="changeItemChecked(item.skuId,item.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>-->
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeItemNumOne(item,'-')">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              class="itxt"
              @change="changeItemNum(item,$event.target.value)"
            />
            <a href="javascript:void(0)" @click="changeItemNumOne(item,'+')" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum * item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:void(0)" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="allCheckedCartList"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:" @click="deleteCheckedCartItem">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ShopCart",
  computed: {
    ...mapState({
      cartList: state => state.shopCart.cartList
    }),
    ...mapGetters([
      "isAllChecked",
      "totalPrice",
      "totalCount",
      "checkedCartItems"
    ])
  },
  mounted() {
    this.$store.dispatch("getCartList");
  },
  methods: {
    // 利用加减按钮修改商品数量
    changeItemNumOne(item, flag) {
      const { skuId, skuNum } = item;
      let number = flag === "+" ? 1 : -1;
      let obj = {
        skuId: skuId,
        skuNum: number
      };
      if (skuNum === 1 && flag === "-") {
        alert("将会删除此商品");
      } else {
        this.$store.dispatch("addToCartVuex", obj).then(
          value => {
            this.$store.dispatch("getCartList");
          },
          error => {
            alert(error.message);
          }
        );
      }
    },
    // 修改商品数量
    changeItemNum(item, newNum) {
      // console.log(item, newNum);
      const { skuId, skuNum } = item;
      newNum = newNum * 1;
      // console.log(skuId, skuNum, newNum);
      if (newNum <= 0) {
        alert("请确保输入了正确的商品数量");
        return;
      } else {
        let obj = {
          skuId: skuId,
          skuNum: newNum - skuNum
        };

        this.$store.dispatch("addToCartVuex", obj).then(
          value => {
            this.$store.dispatch("getCartList");
          },
          error => {
            alert(error.message);
          }
        );
      }
    },
    // 全选状态切换
    allCheckedCartList() {
      console.log("切换了");
      let isAllChecked = this.isAllChecked ? 0 : 1;
      // console.log(isAllChecked);
      // if (isAllChecked) {
      let allpromise = [];
      this.cartList.forEach(value => {
        let skuId = value.skuId;
        console.log(skuId);
        let checked = isAllChecked;
        let obj = {
          skuId,
          checked
        };
        let result = this.$store.dispatch("checkCartItem", obj);
        allpromise.push(result);
      });
      Promise.all(allpromise).then(
        value => {
          this.$store.dispatch("getCartList");
        },
        error => {
          alert(error.message);
        }
      );
      // }
    },
    // 切换商品选中状态
    changeItemChecked(skuId, checked) {
      checked = checked ? 0 : 1;
      console.log(skuId, checked);

      this.$store.dispatch("checkCartItem", { skuId, checked }).then(
        valeu => {
          this.$store.dispatch("getCartList");
        },
        error => {
          alert(error.message);
        }
      );
    },
    // 删除购物项
    deleteCartItem(skuid) {
      if (window.confirm("是否确定删除此购物项")) {
        const result = this.$store.dispatch("deleteCartItem", skuid);
        result.then(
          value => {
            this.$store.dispatch("getCartList");
          },
          err => {
            alert(err.message);
          }
        );
      }
    },
    // 删除选中的购物项
    deleteCheckedCartItem() {
      if (this.checkedCartItems.length === 0) return;

      if (window.confirm("是否确认删除所有选中商品")) {
        let promises = [];
        this.checkedCartItems.forEach(item => {
          let result = this.$store.dispatch("deleteCartItem", item.skuId);
          promises.push(result);
        });
        Promise.all(promises).then(
          value => {
            this.$store.dispatch("getCartList");
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>