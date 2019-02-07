<template>
  <div class="rating-control">
      <div class="btn-area">
          <a class="btn positive" :class="{active: condition.flag === 0}" @click.prevent="showAll">全部{{allCount}}</a>
          <a class="btn positive"  :class="{active: condition.flag === 1}" @click.prevent="showPositive">满意{{positiveCount}}</a>
          <a class="btn negative" :class="{active: condition.flag === 2}" @click.prevent="showNegative">不满意{{negativeCount}}</a>
      </div>
      <div class="comment-switch">
          <span class="icon icon-check-circle" :class="{nonblank: condition.switch}" @click="toggleContent"></span>
          <span class="text">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    ratingList: { // 接受筛选的数组数据
      type: Array,
      default () {
        return []
      }
    },
    eventCb: {  // 接受父级指定的回调事件名
      type: String
    }
  },
  data () {
      return {
          condition: {
              switch: true,  // 只查看有内容的评论
              flag: 0  // 0:查看全部, 1: 查看好评， 2: 查看差评
          }
      }
  },
  computed: {
    allCount () {
      return this.ratingList.length
    },
    positiveCount () {
      let count = 0;
      this.ratingList.forEach(item => item.rateType === 0 ? count++ : '')
      return count;
    },
    negativeCount () {
      let count = 0;
      this.ratingList.forEach(item => item.rateType === 1 ? count++ : '')
      return count;
    },
    conditionShow() {
      let temp;
      if (this.condition.switch) {
        temp = this.ratingList.filter(item => item.text)
      } else {
        temp = this.ratingList
      }
      switch (this.condition.flag) {
        case 0:
          break;
        case 1:
          temp = temp.filter(item => item.rateType === 0)
          break;
        case 2:
          temp = temp.filter(item => item.rateType !== 0)
          break;
      }
      return temp
    }
  },
  watch: {
    conditionShow (to) {
      this.$emit(this.eventCb, to)
    }
  },
  methods: {
    toggleContent () {
      var status = this.condition.switch
      this.condition.switch = !status
    },
    showAll () {
      this.condition.flag = 0
    },
    showPositive () {
      this.condition.flag = 1
    },
    showNegative () {
      this.condition.flag = 2
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  @import '../assets/less/mixin.less';
  .rating-control {
    .btn-area {
      margin: 0 18px;
      padding: 18px 0;
      font-size: 0;
      .border-1px(rgba(7,17,27,0.1));
      .btn {
        display: inline-block;
        font-size: 12px;
        line-height: 16px;
        border-radius: 1px;
        padding: 8px 12px;
        margin-right: 8px;
        color: #666;
        &.positive {
          background-color: rgba(0,160,220,.2);
        }
        &.negative {
          background-color: #ccc;
        }
        &.active {
          color: #fff;
          background-color: #00a0dc;
        }
      }
    }
    .comment-switch {
      padding: 12px 18px;
      color: #999;
      .border-1px(rgba(7,17,27,0.1));
      .text {
        font-size: 12px;
        font-weight: 400;
        line-height: 24px;
      }
      .icon-check-circle {
        vertical-align: middle;
        font-size: 24px;
        margin-right: 4px;
        &.nonblank {
          color: #00b43c;
        }
      }
    }
  }
</style>
