<template>
  <div id="goods-wrapper">
    <div class="goods-menu-wrapper" ref="menuWrapper">
      <ul class="scroll-view">
         <li class="menu-items" :class="{current: /*current === index*/currentIndex === index ? true : false}" v-for="(items, index) in goods" :key="index" @click="selected(index, $event)">
          <div class="text-wrapper">
            <span class="icon" v-if="items.type > -1" :class="classMap[items.type]"></span>
            <span class="text">{{items.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-content-wrapper" ref="contentWrapper">
      <ul class="scroll-view">
        <li class="content-items" v-for="(goodItems, index) in goods" v-bind:key="index">
          <div class="title">
            <h6>{{goodItems.name}}</h6>
          </div>
          <div class="goods-item" v-for="(foods,index) in goodItems.foods" :key="index" @click="toGoodPage(foods)">
            <div class="avatar">
              <img :src="foods.icon">
            </div>
            <div class="description">
              <h5>{{foods.name}}</h5>
              <p class="desc" v-if="foods.description">{{foods.description}}</p>
              <p class="sell-count">
                <span>月售{{foods.sellCount}}份</span><span>好评率{{foods.rating}}%</span>
              </p>
              <div class="price">
                <span class="now-price">￥{{foods.price}}</span><span class="old-price" v-show="foods.oldPrice">￥{{foods.oldPrice}}</span>
              </div>
              <div class="control-area">
                <goods-control :food="foods"></goods-control>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <shopping-cart :selectedFoods=selectedFoods :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopping-cart>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BScroll from 'better-scroll'
import shoppingCart from './shoppingCart'
import goodsControl from './goodsControl.vue'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      current: 0,
      scrollY: 0,
      heightList: []
    }
  },
  components: {
    shoppingCart,
    goodsControl
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    axios.get('good/goods')
      .then(res => {
        if (res.data.code === 0) {
          this.goods = res.data.data
          Vue.nextTick(() => {
            this._initScroll()
            this._initHeightList()
          })
        }
      })
  },
  computed: {   //方法一
    currentIndex() {
      var heightList = this.heightList
      for (let i = 0; i < heightList.length; i++) {
        var height1 = heightList[i]
        var height2 = heightList[i + 1]
        if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
          return i
        }
      }
      return 0
    },
    selectedFoods() {         // 依靠把 goods 中的数据传递给goodsControl组件，然后被goodsControl组件
      let selectedList = []   // 往项目中添加count数据，产生数据更新，通过计算属性获取更新后的数据，再通过props属性
      if (this.goods.length !== 0) {  // 把数据传入购物车实现数据绑定。
        this.goods.forEach(good => {  
          good.foods.forEach(foods => {
            if (foods.count) {
              selectedList.push(foods)
            }
          })
        })
      }
      return selectedList  
    }
  },
  // watch: {  // 方法二
  //   scrollY(value) {
  //     this.heightList.forEach((item, index) => {
  //       if (Math.abs(item + value) < 20) {
  //         this.current = index
  //       }
  //     })
  //   }
  // },
  methods: {
    selected (index, $event) {
      if (!$event._constructed) {
        return
      }
      // this.current = index
      let foodList = this.$refs.contentWrapper.getElementsByClassName('content-items')
      this.foodScroll.scrollToElement(foodList[index], 300)
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.contentWrapper, {
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y)) // 方法一
        // this.scrollY = pos.y // 方法二
      })
    },
    _initHeightList() {
      var foodList = this.$refs.contentWrapper.getElementsByClassName('content-items')
      this.heightList = ([...foodList].map(item => item.offsetTop))
    },
    toGoodPage (data) {
      this.$router.push({name: 'good', params: {data: data}})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/index.styl'
  iconIndex = 3
  #goods-wrapper
    .scroll-view
      padding-bottom 48px
    display flex
    position absolute
    left 0
    right 0
    top 174px
    bottom 0
    .goods-menu-wrapper
      flex-basis 80px
      flex-shrink 0
      width 80px
      background-color #f3f5f7
      overflow hidden
      .menu-items
        display table
        padding 0 12px
        height 54px
        &.current
          position relative
          background-color #fff
          margin-top -1px
          .text
            color rgb(240,20,20)
            font-weight 500
        .text-wrapper
          display table-cell
          vertical-align middle
          width 56px
          height 54px
          font-size 12px
          line-height 14px
          color rgb(147,153,159)
          border-1px(rgba(7,17,27,0.1))
          .icon
            vertical-align top
            set-img(14px)
            background-size 14px 14px
            &.decrease
              bg-image('decrease_' + iconIndex)
            &.discount
              bg-image('discount_' + iconIndex)
            &.guarantee
              bg-image('guarantee_' + iconIndex)
            &.invoice
              bg-image('invoice_' + iconIndex)
            &.special
              bg-image('special_' + iconIndex)
    .goods-content-wrapper
      overflow hidden
      flex-grow 1
      .content-items
        .title
          height 26px
          background-color #f3f5f7
          border-left 4px solid #d9d1e1
          font-size 12px
          line-height 26px
          padding-left 14px
          h6
            color rgb(147,153,159)
        .goods-item
          position relative
          display flex
          padding 18px
          border-1px(rgba(7,17,27,0.1))
          .avatar
            set-img(57px)
            img
              width 100%
              height 100%
          .description
            padding-top 2px
            margin-left 10px
            flex-grow 1
            h5
              font-size 14px
              line-height 14px
              color rgb(7,17,27)
            .desc,
            .sell-count
              font-size 10px
              line-height 10px
              color rgb(147,153,159)
              padding-top 8px
              span
                margin-right 12px
            .desc
              white-space nowrap
            .price
              position relative
              color rgb(147,153,159)
              line-height 24px
              font-weight 700
              width 100%
              padding-top 8px
              .now-price
                font-size 14px
                color rgb(240,20,20)
                margin-right 8px
              .old-price
                vertical-align top
                font-size 10px
                text-decoration line-through
            .control-area
              position absolute
              right 18px
              bottom 12px
</style>
