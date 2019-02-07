<template>
    <div class="tool-bar">
        <span class="icon" @click="addItem">{{iconAdd}}</span>
        <span class="icon" v-bind:class="{favored: isFavored}" @click="favorToggle(nowIndex)">{{iconMark}}</span>
        <span class="icon" @click="removeItem">{{iconDelete}}</span>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

export default {
    name: 'tool-bar',
    data () {
        return {
            iconAdd: 'add',
            iconMark: 'mark',
            iconDelete: 'X',
            id: 0
        }
    },
    computed: {
        ...mapState(['noteList','nowIndex','showAll','favorites']),
        isFavored() {
            var res;
            if (this.showAll) {
                res = this.noteList[this.nowIndex];
            }
            else {
                 res = this.favorites[this.nowIndex];
            }
           return res ? res.favor : '';
        }
    },
    methods: {
        ...mapMutations(['add','changeIndex', 'remove','favorToggle']),
        addItem() {
            var id = this.id++;
            this.add({id, title: 'title', content: '内容', favor: false});
            this.changeIndex({index: this.noteList.length - 1});
        },
        removeItem() {
            this.remove({index: this.nowIndex});
            this.changeIndex({index: 0});
            if (this.noteList.length === 0) {
                this.id = 0;
            }
        }
    }
}
</script>

<style>
    .tool-bar {
        display: flex;
        flex-direction: column;
        background-color: #30414D;
        padding: 25px;
    }
    .icon {
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        background-color: #767676;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 50px;
        border-radius: 10%;
        cursor: pointer;
    }
    .favored {
        color: red;
    }
</style>

