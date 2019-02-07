<template>
<transition name="good-page">
   <div class="good-page-wrapper" ref="wrapper">
      <div class="content-view">
          <div class="jumbo">
            <div class="jumbo-pic">
              <img :src="food.image">
            </div>
            <div class="jumbo-content">
              <h1>{{food.name}}</h1>
              <div class="sales">
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="price-buy">
                <span class="curPrice">￥{{food.price}}</span>
                <span class="prePrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                <div class="buy-btn">
                  <transition name="add">
                    <span class="btn" v-show="!food.count" @click="addFood">加入购物车</span>
                  </transition>
                  <goods-control class="add-btn" :food="food" v-show="food.count"></goods-control>
                </div>
              </div>
            </div>
          </div>
          <div class="block"></div>
          <div class="summary">
            <h1>商品介绍</h1>
            <p v-if="food.info">{{food.info}}</p>
          </div>
          <div class="block"></div>
          <div class="ratings">
            <rating-control :ratingList="food.ratings" :event-cb="'receive'" @receive="handlerList"></rating-control>
            <ul class="rating-list">
              <li class="item" v-for="(item,index) in resultList" :key="index">
                <div class="list-info">
                  <span class="time">{{item.rateTime}}</span>
                  <div class="user-info">
                    <span class="user-name">{{item.username}}</span>
                    <img class="user-avatar" :src="item.avatar" alt="">
                  </div>
                </div>
                <p class="rating-content">
                  <span class="icon" :class="{'icon-thumb_up': item.rateType === 0, 'icon-thumb_down': item.rateType === 1}"></span>
                  {{item.text}}
                </p>
              </li>
            </ul>
          </div>
      </div>
      <div class="goback icon-cheveron-left" @click="$router.go(-1)"></div>
  </div>
 
</transition>
 
</template>

<script>
import goodsControl from "./goodsControl.vue"
import ratingControl from "./ratingControl.vue"
import BScroll from 'better-scroll'
import Vue from 'vue'

export default {
  beforeRouteEnter(to, from, next) {
    to.params.data !== undefined ? next() : ""
  },
  data() {
    return {
      food: this.$route.params.data,
      resultList: []
    };
  },
  created () {
    Vue.nextTick(() => {
      this._initScroll()
    })
  },
  components: {
    goodsControl,
    ratingControl
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    },
    handlerList (res) {
      this.resultList = res
    },
    addFood () {
      Vue.set(this.food, 'count')
      this.food.count = 1
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "../assets/less/mixin.less";
.good-page-enter,
.good-page-leave-to {
  transform: translateX(100%);
}
.good-page-enter-to,
.good-page-leave {
  transform: translateX(0%);
}
.good-page-enter-active,
.good-page-leave-active {
  transition: all 0.4s;
}
.add-enter,
.add-leave-to {
  opacity: 0;
  width: 24px;
}
.add-enter-to,
.add-leave {
  opacity: 1;
  width: 84px;
}
.add-enter-active,
.add-leave-active {
  transition: all .4s
}

.good-page-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  .content-view {
    padding-bottom: 48px;
  }
  .block {
    .block-spliter;
  }
  .jumbo {
    .jumbo-pic {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
      }
    }
    .jumbo-content {
      padding: 18px;
      h1 {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-weight: 700;
      }
      .sales {
        font-size: 10px;
        line-height: 10px;
        color: #999;
        margin-bottom: 18px;
        span {
          margin-right: 12px;
        }
      }
      .price-buy {
        position: relative;
        line-height: 24px;
        font-weight: 700;
        .curPrice {
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .prePrice {
          text-decoration: line-through;
          font-size: 10px;
          color: #999;
        }
        .buy-btn {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 0;
          width: 84px;
          height: 36px;
          .btn {
            width: 84px;
            height: 24px;
            display: inline-block;
            box-sizing: border-box;
            padding: 0 12px;
            font-size: 10px;
            background-color: rgb(0, 160, 240);
            color: #fff;
            border-radius: 12px;
          }
          .add-btn {
            position: absolute;
            right: 0;
            top: -5px;
          }
        }
      }
    }
  }
  .summary {
    padding: 18px;
    h1 {
      font-size: 14px;
      color: #333;
      margin-bottom: 6px;
    }
    p {
      padding: 0 8px;
      font-size: 12px;
      line-height: 24px;
      color: rgb(77, 85, 93);
    }
  }
  .rating-list {
    padding: 0 18px;
    .item {
      padding: 16px 0;
      .list-info {
        position: relative;
        margin-bottom: 6px;
        color: #999;
        font-size: 10px;
        line-height: 12px;
        .user-info {
          position: absolute;
          right: 0;
          top: 0;
          .user-avatar {
            border-radius: 50%;
            margin-left: 6px;
            .set-img(12px);
          }
        }
      }
      .rating-content {
        font-size: 12px;
        color: rgb(7,17,27);
        line-height: 16px;
        .icon {
          line-height: 24px;
          &.icon-thumb_up {
            color: rgb(0,160,240);
          }
          &.icon-thumb_down {
            color: rgb(147,153,159);
          }
        }
      }
    }
  }
}
.goback {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 50px;
  height: 50px;
  font-size: 50px;
  color: rgba(255,255,255,0.8);
  
}
</style>
