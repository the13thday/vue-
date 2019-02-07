<template>
   <div class="goods-control-wrapper">
     <transition name="minus">
        <div class="cart-minus icon-minus-outline" v-show="food.count > 0" @click.stop="minus"></div>
     </transition>
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
      <div class="cart-add icon-add-solid" @click.stop="add"></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    add() {
      if (!this.food.count) {
        Vue.set(this.food, 'count')
        this.food.count = 1
      } else {
        this.food.count++
      }
    },
    minus() {
      if (!this.food.count) {
        return
      } else {
        this.food.count--
      }
    }
  }
  
}
</script>

<style lang="stylus" rel="stylesheet/stylu">
  .goods-control-wrapper
    font-size 0
    .cart-count
      width 12px
      font-size 10px
      text-align center
      line-height 24px
      padding 6px 0 0
      color rgb(147,153,159)
      vertical-align top
    div
      display inline-block
      padding 6px
      width 24px
      height 24px
      font-size 24px
      color rgb(0,160,220)
      vertical-align middle
    .minus-enter, .minus-leave-to
      transform translateX(24px) rotate(360deg)
      opacity 0
    .minus-enter-to, .minus-leave
      transform translateX(0px) rotate(0deg)
      opacity 1
    .minus-enter-active, .minus-leave-active
      transition all .4s linear
</style>

