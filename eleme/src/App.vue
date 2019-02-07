<template>
  <div id="app">
    <div class="header">
      <page-header :seller = "seller" @showHeaderDetail="showDetail"></page-header>
    </div>
    <div class="tab" ref="tab">
      <div class="tab-item" v-for="(link, index) in linkList" :key="index">
        <router-link :to="{name: link.link}">{{link.title}}</router-link>
      </div>
      <div class="slider-bar" :style="{left: sliderLeft}"></div>
    </div>
    <div class="content">
      <transition :name="direction">
        <router-view :seller="seller"></router-view>
      </transition>
    </div>
    <header-detail :seller="seller" v-show="showPage" @hideSelf="hideDetail"></header-detail>
  </div>
</template>

<script>
import axios from 'axios'
import pageHeader from './components/pageHeader.vue'
import headerDetail from './components/headerDetail.vue'

export default {
  name: 'App',
  data () {
    return {
      seller: {},
      linkList: [
        {
          link: 'goods',
          title: '商品'
        }, {
          link: 'ratings',
          title: '评价'
        }, {
          link: 'sellers',
          title: '商家'
        }
      ],
      routeList: ['goods', 'ratings', 'sellers'],
      showPage: false,
      direction: 'left'
    }
  },
  created () {
    axios.get('good/seller')
      .then(res => {
        if (res.status === 200) {
          this.seller = res.data.data
        }
      })
  },
  methods: {
    showDetail() {
      this.showPage = true
    },
    hideDetail() {
      this.showPage = false
    },
  },
  computed: {
    sliderLeft () {
      let index = this.routeList.indexOf(this.$route.name)
      if (index !== -1 && this.$refs.tab) {
           let width = this.$refs.tab.offsetWidth / 3
           return index * width + 'px'
      } else {
        return '0px'
      }
    }
  },
  watch: {
    $route (to, from) {
      this.direction = to.meta.index > from.meta.index ? 'right' : 'left'
    }
  },
  components: {
    pageHeader,
    headerDetail,
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'assets/stylus/index.styl'
  #app
    .left-enter,
    .right-leave-to
      transform translateX(-100%)
    .left-enter-to,
    .right-enter-to,
    .left-leave,
    .right-leave
      transform translateX(0%)
    .right-enter,
    .left-leave-to
      transform translateX(100%)
    .left-enter-active,
    .left-leave-active,
    .right-enter-active,
    .right-leave-active
      transition all .4s
    .router-link-active
      color #f01414
    .tab
      position relative
      display flex
      height 40px
      line-height 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex 1
        text-align center
        font-size 14px
        color rgb(77,85,93)
        a
          display block
          height 100%
          cursor default
      .slider-bar
        position absolute
        bottom 1px
        width 33.3%
        height 2px
        background-color #f01414
        transition left .4s
        a
          display block
          width 100%
          height 100%
          &.active
            color rgb(240,20,20)
</style>
