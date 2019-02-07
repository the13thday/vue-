import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        showAll: true,
        noteList: [],
        favorites: [],
        nowIndex: null,
    },
    mutations: {
        add(state, payload) {   // 添加 note 列表
            state.noteList.push(payload);
        },
        remove(state, payload) {   // 删除当前列表
            if (state.showAll) {
                state.noteList.splice(payload.index, 1);
            } else {
                var note = state.favorites.splice(payload.index, 1)[0];
                for (let i = 0; i < state.noteList.length; i++) {
                    if (state.noteList[i].id === note.id) {
                        state.noteList.splice(i, 1);
                    }
                }
            }
        },
        changeIndex(state, payload) {  // 改变当前活跃列表索引
            state.nowIndex = payload.index;
        },
        changeTitle(state, payload) {   // 改变过当前列表中某文章的 title 属性值
            if (state.showAll) {
                state.noteList[payload.index].title = payload.title;
            } else {
                state.favorites[payload.index].title = payload.title;
            }
        },
        changeContent(state, payload) {  // 改变过当前列表中某文章的 content 属性值
            if (state.showAll) {
                state.noteList[payload.index].content = payload.content;
            } else {
                state.favorites[payload.index].content = payload.content;
            }
        },
        favorToggle(state, index) {  // 切换收藏
            var isFavor;
            if (state.showAll) {
                isFavor = state.noteList[index].favor;
                state.noteList[index].favor = !isFavor;
            } else {
                isFavor = state.favorites[index].favor;
                state.favorites[index].favor = !isFavor;
            }
        },
        allShow(state) {     
            state.showAll = true;
        },
        favorShow(state) {
            state.showAll = false;
        },
        updateFavorites(state, payload) {
            state.favorites = payload;
        }
    },
    getters: {
        getTitle(state, getters) {  // 获取当前列表某文章的 title 属性值
            return function (index) {
                var res;
                if (state.showAll) {
                    res = state.noteList[state.nowIndex];
                } else {
                    res = state.favorites[state.nowIndex];
                }
                res = res ? res.title : '';
                return res;
            }
        },
        getContent(state, getters) {  // 获取当前列表某文章的 content 属性值
            return function (index) {
                var res;
                if (state.showAll) {
                    res = state.noteList[state.nowIndex];
                } else {
                    res = state.favorites[state.nowIndex];
                }
                res = res ? res.content : '';
                return res;
            }
        }
    }
})

