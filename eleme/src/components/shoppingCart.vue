<template>
    <div class="shopping-cart-wrapper">
      <div class="shopping-cart" @click="toggleCart">
        <div class="content">
          <div class="shopping-icon-wrapper">
            <div class="icon icon-shopping-cart" :class="{'has-goods': totalCount}"></div>
            <div class="cart-goods-count" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price-info">
            <div class="total-price" :class="{'not-empty': totalCount}">￥{{totalPrice}}</div>
            <div class="delivery-price">另需配送费¥{{deliveryPrice}}元</div>
          </div>
          <div class="delivery-base" :class="{ok: totalPrice >= minPrice}" @click.stop="totalPrice >= minPrice ? waitAccount() : toggleCart()">{{checkedPrice}}</div>
        </div>
        <div class="cart-detail" :class="{open: unfold}">
          <div class="mask" v-show="unfold"></div>
          <div class="cart-detail-header" @click.stop>
            <span>购物车</span>
            <span class="cart-empty" @click="waitConfirm">清空</span>
          </div>
          <ul class="cart-detail-content" @click.stop>
            <li class="goods-info" v-for="(food,index) in selectedFoods" :key="index" >
              <span class="goods-name">{{food.name}}</span>
                <div class="goods-price">
                  <span>￥</span><span>{{food.price}}</span>
                </div>
              <goods-control :food="food"></goods-control>
            </li>
          </ul>
        </div>
      </div>
        <dialog-confirm ref="dialogClear" :callback="'getResult'" :title="'清空购物车？'" @getResult="execClear" v-show="showConfirm"></dialog-confirm>
        <dialog-confirm ref="dialogAccount" :title="'您需要支付' + totalPrice + '元'" :callback="'getAccount'" @getAccount="execAccount" v-show="showAccount"></dialog-confirm>
    </div>
</template>

<script>
import goodsControl from './goodsControl.vue'
import dialogConfirm from './dialogConfirm.vue'

export default {
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    },
    selectedFoods: {
      type: Array,
      default() {}
    }
  },
  components: {
    goodsControl,
    dialogConfirm
  },
  data() {
    return {
      unfold: false,
      showConfirm: false,
      showAccount: false
    }
  },
  methods: {
    toggleCart() {
      if (!this.isEmpty) {
         this.unfold = !this.unfold
      }
    },
    waitConfirm () {
      this.showConfirm = true
      this.$refs.dialogClear.boxToggle()
    },
    waitAccount () {
      this.showAccount = true
      this.$refs.dialogAccount.boxToggle()
    },
    execClear (flag) {
      if (flag) {
        this.selectedFoods.forEach(food => {
          food.count = 0
        })
      }
      this.showConfirm = false
    },
    execAccount (flag) {
      if (flag) {
        this.execClear(flag)
      }
      this.showAccount = false
    }
  },
  computed: {
     totalCount() {
      var total = 0
      this.selectedFoods.forEach(food => {
        total += food.count
      })
      return total
    },
    totalPrice() {
      var totalPrice = 0
      this.selectedFoods.forEach(food => {
        totalPrice += food.price * food.count
      })
      return totalPrice
    },
    checkedPrice() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      }
      var leftover = this.minPrice - this.totalPrice
      if (leftover > 0) {
        return `还差￥${leftover}元起送`
      } else {
        return '去结算'
      }
    },
    isEmpty() {
      return this.selectedFoods.length === 0
    },
  },
  watch: {
    selectedFoods(cur) {
      if (cur.length === 0) {
        this.unfold = false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
  .shopping-cart
    position fixed
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 10
    .content
      display flex
      background-color #141427
      width 100%
      .shopping-icon-wrapper
        position relative
        flex 0 0 80px
        .icon-shopping-cart
          position relative
          left 18px
          bottom 8px
          width 44px
          height 44px
          border-radius 50%
          background-color #2b333b
          font-size 24px
          line-height 44px
          color rgba(255,255,255,0.4)
          border: 6px solid #141427
          text-align center
          &.has-goods
            background-color #00a0dc
            color #fff
        .cart-goods-count
          position absolute
          right 0
          top -10px
          padding 0 6px
          height 16px
          background-color rgb(240,20,20)
          border-radius 16px
          font-size 10px
          line-height 16px
          font-weight 700
          color #fff
          text-align center
          box-shadow 0 4px 8px 0px rgba(0,0,0,0.4)
      .price-info
        flex-grow 1
        padding 12px 12px 12px 0
        height 24px
        .total-price
          display inline-block
          font-size 16px
          color rgba(255,255,255,0.4)
          font-weight 700
          line-height 24px
          padding-right 12px
          border-1px-right(rgba(255,255,255,0.1))
          &.not-empty
            color #ffffff
        .delivery-price
          display inline-block
          margin-left 12px
          font-size 12px
          color rgba(255,255,255,0.4)
          font-weight 200
          line-height 20px
      .delivery-base
        box-sizing border-box
        flex 0 0 105px
        padding 0 8px
        font-size 12px
        font-weight 700
        color rgba(255,255,255,0.4)
        line-height 48px
        text-align center
        &.ok
          background-color #00b43c
          color #ffffff
    .cart-detail
      position absolute
      bottom 48px
      left 0
      right 0
      display flex
      flex-direction column
      transform translateY(100%)
      transition all .3s
      opacity 0
      z-index -1
      &.open
        transform translateY(0%)
        opacity 1
      .mask
        position absolute 
        top -100vh
        left 0
        width 100%
        height 100vh
        background-color rgba(7,17,27,0.6)
        filter blur(10px)
      .cart-detail-header
        position relative
        display flex
        justify-content space-between
        height 40px
        padding 0 18px
        font-size 14px
        font-weight 200
        color rgb(7,17,27)
        line-height 40px
        background-color #f3f5f7
        border-1px(rgba(7,17,27,0.1))
        .cart-empty
          font-size 12px
          color rgb(0,160,220)
      .cart-detail-content
        padding 0 18px
        background-color #fff
        max-height 217px
        overflow auto
        .goods-info
          display flex
          align-items center
          box-sizing border-box
          padding 12px 0
          height 48px
          line-height 24px
          border-1px(rgba(7,17,27,0.1))
          font-size 14px
          color rgb(7,17,27)
          div
            display inline-block
          .goods-name
            flex 1
          .goods-price
            align-self right
            margin-right 12px
            font-size 14px
            line-height 24px
            color rgb(240,20,20)
            font-weight 700
            span:first-child
              font-size 10px
          .goods-control-wrapper
            align-self right
</style>


