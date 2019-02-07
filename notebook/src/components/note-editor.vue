<template>
    <div class="note-editor">
        <textarea class="editor-title" v-bind:value="getTitle(index)" @input="rewriteTitle"></textarea>
        <textarea class="editor-content" v-bind:value="getContent(index)" @input="rewriteContent"></textarea>
    </div>
</template>

<script>
import {mapGetters, mapState, mapMutations} from 'vuex';

export default {
    computed: {
        ...mapGetters(['getTitle', 'getContent']),
        ...mapState({
            index: state => state.nowIndex,
        })
    },
    methods: {
        ...mapMutations(['changeTitle', 'changeContent']),
        rewriteTitle(e) {
            var value = e.target.value;
            this.changeTitle({
                index: this.index,
                title: value
            })
        },
        rewriteContent (e) {
            var value = e.target.value;
            this.changeContent({
                index: this.index,
                content: value
            })
        }
    },
}
</script>

<style>
    .note-editor {
        flex-grow: 1;
    }
    .editor-title,
    .editor-content {
        resize: none;
        box-sizing: border-box;
        outline: none;
        width: 100%;
        padding: 10px;
        border: none;
        font-size: 14px;
    }
    .editor-title {
        font-size: 30px;
        height: 10%;
    }
    .editor-content {
        height: 90%;
        
    }
</style>
