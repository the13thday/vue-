<template>
    <div class="dialog-confirm-wrapper">
        <div class="mask">
            <transition name="modal">
                <div class="confirm-box" v-show="showBox">
                    <div class="title">{{title}}</div>
                    <div class="btn-wrapper">
                        <span @click="sentMsg(false)" class="cancel">取消</span>
                        <span @click="sentMsg(true)" class="confirm">确认</span>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Vue from "vue";

export default {
  props: {
    title: {
      type: String,
      default() {
        return "提示标题";
      }
    },
    callback: {
      type: String
    }
  },
  data() {
    return {
      showBox: false
    };
  },
  methods: {
    sentMsg(flag) {
      this.$emit(this.callback, flag);
      this.showBox = false;
    },
    boxToggle() {
      this.showBox = true;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../assets/less/mixin.less";
.modal-enter-active {
  animation: bounce 0.4s;
}
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  90% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.dialog-confirm-wrapper {
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    z-index: 100;
    .confirm-box {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 270px;
      height: 104px;
      margin-left: -135px;
      margin-top: -52px;
      background-color: #fff;
    }
    .title {
      padding: 16px 0;
      color: #666;
      height: 19px;
      font-size: 14px;
      text-align: center;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .btn-wrapper {
      display: flex;
      font-size: 0;
      .confirm,
      .cancel {
        display: inline-block;
        box-sizing: border-box;
        height: 52px;
        padding: 17px 10px;
        font-size: 16px;
        flex-grow: 1;
        text-align: center;
        cursor: pointer;
      }
      .confirm {
        color: #fc9153;
      }
      .cancel {
        color: #666;
        .border-1px-right(rgba(7,17,17,0.1));
      }
    }
  }
}
</style>


