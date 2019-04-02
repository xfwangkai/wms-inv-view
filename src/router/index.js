import Vue from 'vue'
import Router from 'vue-router'
import InventoryView from '@/components/InventoryView'
import handsontable from '@/components/handsontable'

Vue.use(Router)

export default new Router({
  routes: [
    /*
    {
      path: '/',
      name: 'InventoryView',
      component: InventoryView
    },
    */
    {
      path: '/',
      name: 'handsontable',
      component: handsontable
    }
  ]
})
