<template>
  <transition name="page">
    <div class="header-detail">
      <div class="page-header">
        <div class="title">{{seller.name}}</div>
        <div class="rating">
          <span class="star" v-for="(item, index) in 5" v-bind:key="index" :class="{solid: index + 1 < seller.score}"></span>
        </div>
      </div>

      <div class="support-info-wrapper">
        <div class="support-title">
          <span class="line"></span><span class="title">优惠信息</span><span class="line"></span>
        </div>
        <div class="support-info-content">
          <div class="support-info-item" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" v-bind:class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </div>
        </div>
      </div>

      <div class="seller-bulletin-wrapper">
        <div class="seller-bulletin-title">
          <span class="line"></span>
          <span class="title">商家公告</span>
          <span class="line"></span>
        </div>
        <div class="support-bulletin-content">{{seller.bulletin}}</div>
      </div>

      <div class="close-btn icon-cross" @click="$emit('hideSelf')"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['discount', 'decrease', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  @import '../assets/less/mixin.less';
  @index: 2;
  .page-enter, .page-leave-to {
    opacity: 0;
  }
  .page-enter-to, .page-leave {
    opacity: 1;
  }
  .page-enter-active, .page-leave-active {
    transition: opacity .4s;
  }
  .header-detail {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 64px 36px 32px;
    background-color: rgba(7,17,27,0.8);
    z-index: 9999;
    .page-header {
      margin-bottom: 28px;
      .title {
        font-size: 16px;
        line-height: 16px;
        font-weight: 700;
        color: #fff;
        text-align: center;
        margin-bottom: 16px;
      }
      .rating {
        height: 24px;
        text-align: center;
        line-height: 20px;
        .star {
          vertical-align: middle;
          margin-right: 22px;
          background-size: 20px 20px;
          .set-img(20px);
          .bg-image('star24_off');
          &.solid {
            .bg-image('star24_on');
          }
        }
      }
    }
    .support-info-wrapper {
      padding: 0 12px 28px;
      .support-title {
       .inform-title
      }
      .support-info-content {
        padding: 24px 12px 0;
        .support-info-item {
          margin-bottom: 12px;
          .icon {
            .set-img(16px);
            background-size: 16px 16px;
            margin-left: 6px;
            vertical-align: middle;
            &.discount {
              .bg-image('discount_@{index}');
            }
            &.decrease {
              .bg-image('decrease_@{index}');
            }
            &.special {
              .bg-image('special_@{index}');
            }
            &.invoice {
              .bg-image('invoice_@{index}');
            }
            &.guarantee {
              .bg-image('guarantee_@{index}');
            }
          }
          .text {
            font-size: 12px;
            color: #fff;
            font-weight: 200;
            line-height: 12px;
          }
        }
      }
    }
    .seller-bulletin-wrapper {
      .seller-bulletin-title {
        .inform-title
      }
      .support-bulletin-content {
        padding: 24px 12px 0;
        font-size: 12px;
        font-weight: 200px;
        color: #fff;
        line-height: 24px;
      }
    }
    .close-btn {
      position: absolute;
      bottom: 32px;
      align-self: center;
      color: #fff;
      font-size: 30px;
    }
  }
</style>


