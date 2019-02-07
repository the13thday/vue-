<template>
  <div class="page-header" @click="$emit('showHeaderDetail')">
    <div class="seller-info">
      <div class="content">
        <div class="avatar">
          <img :src="seller.avatar" alt="avatar">
        </div>
        <div class="info">
          <div class="title">
            <span class="brand"></span><span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}} / {{seller.deliveryTime}}分钟送达
          </div>
          <div class="support" v-if="seller.supports">
            <span class="icon bg-img" :class="classMap[seller.supports[0].type]"></span>
            <span class="support-info">{{seller.supports[1].description}}</span>
          </div>
        </div>
      </div>
      <a class="detail-btn">
        <span class="count">{{seller.supports ? seller.supports.length : 0}}个</span><span class="arrow icon-cheveron-right"></span>
      </a>
    </div>

    <div class="bulletin">
      <span class="bulletin-icon bg-img"></span>
      <span class="bulletin-info">{{seller.bulletin}}</span>
      <span class="icon-cheveron-right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
  imgRatio = 2
  .page-header
    position relative
    .seller-info
      position relative
      background-color rgba(7,17,27,0.5)
      .content
        display flex
        padding 24px 24px 18px
        height 64px
        .avatar
          img
            set-img(64px)
            border-radius 4px
        .info
          flex-grow 1
          margin-left 16px
          .title
            .brand
              display inline-block
              bg-image('brand')
              width 30px
              height 18px
              background-size 30px 18px
              vertical-align middle
            .name
              font-size 16px
              font-weight bold
              line-height 18px
              color #fff
              margin-left 6px
              vertical-align middle
          .description
            margin-top 8px
            font-weight 200
            font-size 12px
            line-height 12px
            color #fff
          .support
            margin-top 8px
            .icon
              display inline-block
              width 16px
              height 16px
              background-size 16px 16px
              vertical-align middle
              &.discount
                bg-image('discount_' + imgRatio)
              &.decrease
                bg-image('decrease_' + imgRatio)
              &.guarantee
                bg-image('guarantee_' + imgRatio)
              &.invoice
                bg-image('invoice_' + imgRatio)
              &.special
                bg-image('special_' + imgRatio)
            .support-info
              margin-left 4px
              font-size 10px
              color #ffffff
              line-height 12px
              font-weight 200
              vertical-align middle
      .detail-btn
        position absolute
        right 24px
        bottom 14px
        padding 7px 8px
        background-color rgba(0,0,0,0.2)
        text-align center
        height 12px
        font-size 10px
        color #fff
        font-weight 200
        border-radius 12px
        vertical-align middle
        .count
          line-height 12px
        .arrow
          margin-left 2px
    .bulletin
      position relative
      height 28px
      padding 0 12px
      background-color rgba(7,17,27,0.2)
      line-height 28px
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-size 10px
      color #fff
      .bulletin-icon
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        vertical-align middle
      .bulletin-info
        margin 0 4px
      .icon-cheveron-right
        position absolute
        right 12px
        bottom 8px
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      img
        width 100%
        height 100%
        filter blur(10px)
</style>
