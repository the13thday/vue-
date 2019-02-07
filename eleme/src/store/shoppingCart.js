import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    shoppingCart: [{name: '诚挚', count: 2, price: 20}]
  },
  mutations: {
  },
  getters: {
    isEmpty(state) {
      return state.shoppingCart.length === 0
    }
  }
})

export default store