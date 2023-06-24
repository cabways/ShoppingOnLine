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
        <ul class="cart-list" v-for="carts in cartInfoList" :key="carts.id">
          <li class="cart-list-con1">
            <input
                type="checkbox"
                name="chk_list"
                :checked="carts.isChecked===1"
                @change="reqCheckCart(carts)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="carts.imgUrl">
            <div class="item-msg">{{ carts.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ carts.cartPrice || 0 }}</span>
          </li>
          <li class="cart-list-con5">
            <!--            商品数量修改-->
            <!--            加1-->
            <a href="javascript:void(0)" class="mins" @click="handlerSub(carts)">-</a>
            <!--            自己输入-->
            <input
                type="text"
                :value="carts.skuNum"
                class="itxt"
                @change="handlerChange(carts,$event.target.value)"
            >
            <!--            减1-->
            <a href="javascript:void(0)" class="plus" @click="handlerAdd(carts.skuId)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ carts.skuNum * carts.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="reqDeleteCartList(carts.skuId)">删除</a>
            <br>
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
            :checked="isAllChecked&&cartInfoList.length>0 "
            @click="changeAllChecked"
        >
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deletecheckedCartList">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totlePrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import throttle from 'lodash/throttle'

export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      setTimeout(() => {
        this.$store.dispatch('getCartList')
      }, 200)
    },
    //商品数量加1,防抖，一秒只能点击一次
    handlerAdd: throttle(function (id) {
      this.$store.dispatch('reqAddOrUpdateShopCard', {skuid: id, skunum: 1})
      this.getData()
    }, 1000),
    //商品数量减1，防抖，一秒只能点击一次
    handlerSub: throttle(function (carts) {
      if (carts.skuNum > 1) {
        this.$store.dispatch('reqAddOrUpdateShopCard', {skuid: carts.skuId, skunum: -1})
        this.getData()
      }
    }, 1000),
    //自定义商品数量
    handlerChange(carts, num) {
      var rule = /^\+?[1-9][0-9]*$/
      if (rule.test(num)) {
        this.$store.dispatch('reqAddOrUpdateShopCard', {skuid: carts.skuId, skunum: num - carts.skuNum})
        this.getData()
      }
    },
    //删除商品
    reqDeleteCartList(skuID) {
      this.$store.dispatch('reqDeleteCartList', skuID)
      this.getData()
    },
    //删除选中商品
    deletecheckedCartList() {
      this.cartInfoList.forEach(item => {
        if (item.isChecked === 1) {
          this.$store.dispatch('reqDeleteCartList', item.skuId)
        }
      })
      this.getData()
    },
    //切换商品选中状态
    reqCheckCart(carts) {
      var checked = 0
      if (carts.isChecked === 0) checked = 1
      this.$store.dispatch('reqCheckCart', {skuId: carts.skuId, isChecked: checked})
      this.getData()
    },
    //切换全部商品选中状态
    changeAllChecked() {
      if (this.isAllChecked) {
        this.cartInfoList.forEach(item => {
          this.$store.dispatch('reqCheckCart', {skuId: item.skuId, isChecked: 0})
        })
      } else {
        this.cartInfoList.forEach(item => {
          this.$store.dispatch('reqCheckCart', {skuId: item.skuId, isChecked: 1})
        })
      }
      this.getData()
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    totlePrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.cartPrice
      })
      return sum
    },
    isAllChecked() {
      return this.cartInfoList.every(item => item.isChecked === 1)
    }
  }
}
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
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

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


        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

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
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

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