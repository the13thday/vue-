<template>
    <div class="scroll-wrapper" ref="scroll-wrapper">
        <div class="rating-page-wrapper">
            <div class="rating-board">
                <div class="left-part">
                    <h1>{{seller.score}}</h1>
                    <p class="text">综合评分</p>
                    <p class="compare">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="right-part">
                    <div class="right-part-wrapper">
                        <div class="service-grade">
                            <span class="des">服务态度</span><stars :points="seller.serviceScore"></stars><span class="points">{{seller.serviceScore}}</span>
                        </div>
                        <div class="service-grade">
                            <span class="des">商品评分</span><stars :points="seller.score"></stars><span class="points">{{seller.score}}</span>
                        </div> 
                        <div class="service-grade">
                            <span class="des">送达时间</span><span class="aver-delivery-time">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block"></div>
            <rating-control :ratingList="ratingList" :eventCb="'getlist'" @getlist="handleList"></rating-control>
            <div class="rating-detail">
                <div class="buyer" v-for="(item,index) in resultList" :key="index">
                    <div class="buyer-avatar">
                        <img :src="item.avatar">
                    </div>
                    <div class="buyer-content">
                        <div class="buyer-title">
                            <span class="name">{{item.username}}</span>
                            <span class="time">{{item.rateTime}}</span>
                        </div>
                        <div class="buyer-rating">
                            <stars :points="item.score"></stars>
                            <span class="delivery-time">{{item.deliveryTime}}分钟到达</span>
                        </div>
                        <p class="buyer-text">{{item.text}}</p>
                        <div class="buyer-recommend" v-if="item.recommend.length">
                            <span class="icon" :class="{'positive icon-thumb_up': item.rateType === 0, 'negative icon-thumb_down': item.rateType === 1}"></span>
                            <span class="recommend" v-for="(recommend,index) in item.recommend" :key="index">{{recommend}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import stars from './stars.vue'
import ratingControl from './ratingControl.vue'
import BScroll from 'better-scroll'
import Vue from 'vue'

export default {
    props: {
        seller: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data () {
        return {
            ratingList: [],
            resultList: []
        }
    },
    methods: {
        _initScroll () {
            this.viewScroll = new BScroll(this.$refs['scroll-wrapper'], {
                click: true
            })
        },
        handleList (res) {
            this.resultList = res
        }
    },
    components: {
        stars,
        ratingControl
    },
    created () {
        axios.get('good/ratings').then(res => {
            if (res.data.code === 0) {
                this.ratingList = res.data.data
                Vue.nextTick(() => {
                    this._initScroll()
                })
            }
        })
    }
}
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/less/mixin.less';
    .scroll-wrapper {
        position: absolute;
        left: 0;
        top: 174px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }
    .rating-page-wrapper {
        overflow: auto;
        .rating-board {
            display:flex;
            padding: 18px 0;
            .left-part {
                width: 137.5px;
                .border-1px-right(#d9dde1);
                h1 {
                    font-size: 24px;
                    color: rgb(255,153,0);
                    line-height: 28px;
                    text-align: center;
                    margin-bottom: 6px;
                }
                .text {
                    font-size: 12px;
                    color: rgb(7,17,27);
                    line-height: 12px;
                    text-align: center;
                    margin-bottom: 8px;
                }
                .compare {
                    font-size: 10px;
                    line-height: 10px;
                    color: #999;
                    text-align: center;
                }
            }
            .right-part {
                flex-grow: 1;
                .right-part-wrapper {
                    padding: 6px 0 6px 24px;
                    .service-grade {
                        margin-bottom: 8px;
                        .des {
                            font-size: 12px;
                            color: rgb(7,17,27);
                            line-height: 18px;
                            margin-right: 12px;
                        }
                        .stars {
                            margin-right: 12px;
                        }
                        .points {
                            font-size: 12px;
                            color: rgb(255,153,0);
                            line-height: 18px;
                        }
                        .aver-delivery-time {
                            font-size: 12px;
                            color: rgb(147,153,159);
                            line-height: 18px;
                        }
                    }
                }
            }
        }
        .block {
          .block-spliter;
        }
        .rating-detail {
            padding: 0 18px;
            .buyer {
                display: flex;
                padding: 18px 0;
                .border-1px(rgba(7,17,27,.1));
                .buyer-avatar {
                    flex: 0 0 28px;
                    margin-right: 12px;
                    img {
                        .set-img(28px);
                        border-radius: 50%;
                    }
                }
                .buyer-content {
                    flex: 1;   // flex: flex-grow: 1;flex-shrink: 1; flex-basis: 0
                    
                    .buyer-title {
                        position: relative;
                        margin-bottom: 4px;
                        line-height: 24px;
                        .name {
                            font-size: 10px;
                            color: rgb(7,17,27);
                        }
                        .time {
                            position: absolute;
                            right: 0;
                            top: 0;
                            font-size: 12px;
                            color: #999;
                        }
                    }
                    .buyer-rating {
                        font-size: 0;
                        margin-bottom: 6px;
                        .stars {
                            margin-right: 6px;
                            .star {
                                .set-img(10px);
                                background-size: 10px 10px;
                                margin-right: 3px;
                                &:last-child {
                                    margin-right: 0;
                                }
                            }
                        }
                        .delivery-time {
                            font-size: 10px;
                            font-weight: 200;
                            line-height: 12px;
                            color: #999;
                        }
                    }
                    .buyer-text {
                        margin-bottom: 8px;
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(7,17,27);
                    }
                    .buyer-recommend {
                        font-size: 0;
                        .icon {
                            font-size: 12px;
                            margin-right: 8px;
                            line-height: 16px;
                            &.positive {
                                color: rgb(0,160,220);
                            }
                            &.negative {
                                color: rgb(183,187,191);
                            }
                        }
                        .recommend {
                            display: inline-block;
                            padding: 0 6px;
                            margin-right: 8px;
                            margin-bottom: 4px;
                            border: 1px solid rgba(7,17,27,.1);
                            border-radius: 1px;
                            background-color: #fff;
                            font-size: 10px;
                            line-height: 16px;
                            color: #999;
                        }
                    }
                }
            }
        }
    }
</style>

