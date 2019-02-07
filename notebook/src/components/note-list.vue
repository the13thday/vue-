<template>
    <div class="note-list">
        <div class="note-head">
            <h2 class="title">{{ title }}</h2>
            <div class="btn-group">
                <a class="btn" href="#" :class="{active: showAll}" @click="allShow">{{ btnAll }}</a>
                <a class="btn" href="#" :class="{active: !showAll}" @click="favorShow">{{ btnFavor }}</a>
            </div>
        </div>
        <ul class="list-content">
            <template v-for="(item,index) in noteListChoose">
                <li class="list-item" v-bind:class="{'active': index === nowIndex}" @click="changeIndex({index})" v-bind:key="item.id">{{ item.title }}</li>
            </template>
        </ul>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
    data() {
        return {
            title: '记事本',
            btnAll: 'All Notes',
            btnFavor: 'Favorites',
            // showAll: true
        }
    },
    computed: {
        ...mapState(['noteList', 'nowIndex','showAll', 'favorites']),
        noteListChoose() {
            this.updateFavorites(this.noteList.filter(item => item.favor));
            return this.showAll ? this.noteList : this.favorites;
        }
    },
    methods: {
        ...mapMutations(['changeIndex','allShow', 'favorShow','updateFavorites'])
    }
}
</script>

<style>
    .note-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #EEE;
    }
    .note-head {
        padding: 25px;
    }
    .title {
        margin-bottom: 30px;
        text-align: center;
        letter-spacing: 0.5em;
    }
    .btn {
        padding: 6px 12px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-decoration: none;
        color: #333;
        font-weight: 400;
        font-size: 14px;
    }
    .btn.active {
        background-color: #f40;
        color: #fff;
    }
    .list-content {
        width: 100%;
        overflow-y: scroll;
    }
    .list-item {
        padding: 6px 20px;
        background-color: #fff;
        cursor: pointer;
    }
    .list-item.active {
        background-color: #337ab7;
        color: #fff;
    }
</style>

