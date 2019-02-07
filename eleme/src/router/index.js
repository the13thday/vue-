import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../components/goods.vue'
import ratings from '../components/ratings.vue'
import sellers from '../components/sellers.vue'
import good from '../components/good.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/goods'
    },
    {
      name: 'goods',
      path: '/goods',
      component: goods,
      meta: {
        index: 0
      },
      children: [{
        path: 'good/:data',
        component: good,
        name: 'good'
      }]
    },
    {
      name: 'ratings',
      path: '/ratings',
      component: ratings,
      meta: {
        index: 1
      }
    },
    {
      name: 'sellers',
      path: '/sellers',
      component: sellers,
      meta: {
        index: 2
      }
    }
  ]
})
