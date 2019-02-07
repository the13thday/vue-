<template>
  <div id="app">
    <tool-bar></tool-bar>
    <note-list></note-list>
    <note-editor></note-editor>
  </div>
</template>

<script>
import store from './store/store.js';
import {mapState, mapActions, mapMutations} from 'vuex';
import toolBar from './components/tool-bar.vue';
import noteList from './components/note-list.vue';
import noteEditor from './components/note-editor.vue';

export default {
  name: 'App',
  store,
  components: {
    toolBar,
    noteList,
    noteEditor
  }


}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  ul,li {
    padding: 0;
    list-style: none;
  }
  html,body {
    width: 100%;
    height: 100%;
  }
  #app{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
  }
</style>


