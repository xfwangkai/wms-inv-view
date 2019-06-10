import Vue from 'vue'
import Router from 'vue-router'
import InventoryView from '@/components/InventoryView'
import WorkInfoInput from '@/components/WorkInfoInput'
import KpiWorkerGroup from '@/components/KpiWorkerGroup'
import KpiUsers from '@/components/KpiUsers'
import KpiWorkItem from '@/components/KpiWorkItem'
import KpiSourceData from '@/components/KpiSourceData'
import KpiLabor from '@/components/KpiLabor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/inv',
      name: 'InventoryView',
      component: InventoryView
    },
    {
      path: '/workInfoInput',
      name: 'WorkInfoInput',
      component: WorkInfoInput
    },
    {
      path: '/kpiWorkerGroup',
      name: 'KpiWorkerGroup',
      component: KpiWorkerGroup
    },
    {
      path: '/kpiUsers',
      name: 'KpiUsers',
      component: KpiUsers
    },
    {
      path: '/kpiWorkItem',
      name: 'KpiWorkItem',
      component: KpiWorkItem
    },
    {
      path: '/kpiSourceData',
      name: 'KpiSourceData',
      component: KpiSourceData
    },
    {
      path: '/kpiLabor',
      name: 'KpiLabor',
      component: KpiLabor
    }
  ]
})
