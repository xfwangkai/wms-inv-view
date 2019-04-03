import Vue from 'vue'
import Router from 'vue-router'
import InventoryView from '@/components/InventoryView'
import WorkInfoInput from '@/components/WorkInfoInput'

Vue.use(Router)

export default new Router({
  routes: [
    /*
    {
      path: '/inv',
      name: 'InventoryView',
      component: InventoryView
    },
    */
    {
      path: '/',
      name: 'WorkInfoInput',
      component: WorkInfoInput
    }
  ]
})
