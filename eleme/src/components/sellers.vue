<template>
    <div class="scroll-wrapper" ref="scroll-wrapper">
        <div id="seller-page">
            <div class="seller-header">
                <div class="hd">
                    <h1 class="title">{{seller.name}}</h1>
                    <div class="rating-info">
                        <stars :points="seller.foodScore"></stars>
                        <span class="rating-count count">({{seller.ratingCount}})</span>
                        <span class="sell-count count">月售{{seller.sellCount}}单</span>
                    </div>
                     <div @click="toggleFavor" class="collect">
                        <span class="icon icon-heart" :class="{favored: favor}"></span>
                        <span v-if="!favor">收藏</span>
                        <span v-else>已收藏</span>
                    </div>
                </div>
                <div class="bd">
                    <div class="delivery-info">
                        <span class="text">起送价</span>
                        <div class="data">
                            <span>{{seller.minPrice}}</span><span class="unit">元</span>
                        </div>
                    </div>
                    <div class="delivery-info">
                        <span class="text">商家配送</span>
                        <div class="data">
                            <span>{{seller.deliveryPrice}}</span><span class="unit">元</span>
                        </div>
                    </div>
                    <div class="delivery-info">
                        <span class="text">平均配送时间</span>
                        <div class="data">
                            <span>{{seller.deliveryTime}}</span><span class="unit">元</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block"></div>
            <div class="seller-activity">
                <div class="text">
                    <h1>公告与活动</h1>
                    <p>{{seller.bulletin}}</p>
                </div>
                <div class="seller-support" v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="support-text">{{item.description}}</span>
                </div>
            </div>
            <div class="block"></div>
            <div class="seller-pics">
                <h1>商家实景</h1>
                <div class="pics-wrapper" ref="pics-wrapper">
                    <ul>
                        <li v-for="(pic,index) in seller.pics" :key="index">
                            <img :src="pic">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="block"></div>
            <div class="seller-info">
                <h1>商家信息</h1>
                <p class="info-item" v-for="(info,i) in seller.infos" :key="i">{{info}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import stars from './stars.vue'
import BScroll from 'better-scroll'
import Vue from 'vue'
export default {
    props: {
        seller: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            picScroll: null,
            pageScroll: null,
            favor: false
        }
    },
    components: {
        stars
    },
    methods: {
        _initPicScroll () {
            this.picScroll = new BScroll(this.$refs['pics-wrapper'], {
                click: true,
                scrollX: true
            })
        },
        _initPageScroll () {
            this.pageScroll = new BScroll(this.$refs['scroll-wrapper'], {
                click: true,
            })
        },
        toggleFavor () {
            this.favor = !this.favor
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        Vue.nextTick(() => {
            this._initPicScroll()
            this._initPageScroll()
        })
    }
}
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/less/mixin.less';
    @imgRatio: 2;
    .block {
        .block-spliter;
    }
    #seller-page {
        position: relative;
        .seller-header {
            padding: 18px;
            .hd {
                position: relative;
                padding-bottom: 18px;
                .border-1px(rgba(7,17,27,.1));
                .title {
                    margin-bottom: 8px;
                    font-size: 14px;
                    line-height: 14px;
                    color: rgb(7,17,27);
                }
                .rating-info {
                    font-size: 0;
                    .stars {
                        margin-right: 8px;
                        line-height: 18px;
                    }
                    .count {
                        font-size: 10px;
                        line-height: 18px;
                        color: #666;
                    }
                    .rating-count {
                        margin-right: 12px;
                    }
                }
                .collect {
                    position: absolute;
                    right: 11px;
                    top: 2px;
                    font-size: 10px;
                    line-height: 10px;
                    color: #666;
                    width:38px;
                    text-align: center;
                    .icon {
                        display: block;
                        text-align: center;
                        font-size: 24px;
                        line-height: 24px;
                        padding-bottom: 4px;
                        color: #ccc;
                        &.favored {
                            color: rgb(240,20,20);
                        }
                    }
                }
            }
            .bd {
                display: flex;
                padding: 18px 0;
                .delivery-info {
                    flex: 1;
                    &:not(:last-child) {
                        .border-1px-right(rgba(7,17,27,.1));
                    }
                    .text {
                        display: block;
                        margin-bottom: 4px;
                        color: #999;
                        font-size: 10px;
                        height: 10px;
                        text-align: center;
                    }
                    .data {
                        display: block;
                        font-size: 24px;
                        line-height: 24px;
                        color: rgb(7,17,27);
                        font-weight: 200;
                        text-align: center;
                        .unit {
                            font-size: 10px;
                        }
                    }
                }
            }
        }
        .seller-activity {
            padding: 18px 18px 0;
            .text {
                .border-1px(rgba(7,17,27,.1));
                h1 {
                    font-size: 14px;
                    line-height: 14px;
                    color: #333;
                    margin-bottom: 8px;
                }
                p {
                    padding: 0 12px 16px;
                    font-size: 12px;
                    line-height: 24px;
                    color: rgb(240,20,20);
                }
            }
            .seller-support {
                padding: 16px 12px;
                &:not(:last-child) {
                    .border-1px(rgba(7,17,27,.1));
                }
                .icon {
                    .set-img(16px);
                    margin-right: 6px;
                    background-size: 16px 16px;
                    vertical-align: middle;
                    &.discount {
                        .bg-image('discount_@{imgRatio}');
                    }
                    &.decrease {
                        .bg-image('decrease_@{imgRatio}');
                    }
                       
                    &.guarantee {
                        .bg-image('guarantee_@{imgRatio}');
                    }
                       
                    &.invoice {
                        .bg-image('invoice_@{imgRatio}');
                    }
                       
                    &.special {
                    .bg-image('special_@{imgRatio}');
                    }
                }
                .support-text {
                    font-size: 12px;
                    line-height: 16px;
                    font-weight: 200;
                    color: rgb(7,17,27);
                }
            }
        }
        .seller-pics {
            padding: 18px;
            h1 {
                font-size: 14px;
                line-height: 14px;
                margin-bottom: 12px;
                color: #333;
            }
            .pics-wrapper {
                position: relative;
                height: 80px;
                overflow: hidden;
                ul {
                    position: absolute;
                    left: 0;
                    top: 0;
                    white-space: nowrap;
                    font-size: 0;
                    li {
                        margin-right: 6px;
                        display: inline-block;
                        width: 120px;
                        height: 80px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .seller-info {
            padding: 18px 18px 0;
            h1 {
                font-size: 14px;
                line-height: 14px;
                padding-bottom: 12px;
                color: #333;
                .border-1px(rgba(7,17,27,.1));
            }
            p {
                padding: 16px 12px;
                 .border-1px(rgba(7,17,27,.1));
                 font-size: 12px;
                 line-height: 16px;
                 color: #333;
                 font-weight: 200;
            }
        }
    }
</style>

