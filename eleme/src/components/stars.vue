<template>
  <div class="stars">
    <span class="star" :class="{solid: index + 1 <= points}" v-for="(item,index) in total" :key="index"></span>
  </div>
</template>

<script>
export default {
  props: {
    points: Number,
    default() {
      return 0
    }
  },
  data() {
    return {
      total: 5
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  @import '../assets/less/mixin.less';
  @hollowStar: 'star36_off';
  @solidStar: 'star36_on';
  .stars {
    display: inline-block;
    vertical-align: top;
    span {
      vertical-align: middle;
      .set-img(15px);
      .bg-image(@hollowStar);
      background-size: 15px 15px;
      margin-right: 6px;
      &:last-child {
        margin-right: 0;
      }
      &.solid {
        .bg-image(@solidStar);
      }
    }
  }
</style>


