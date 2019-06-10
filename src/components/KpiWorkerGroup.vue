<template>
  <div>
    <div>
      <input type="button" value="保存" @click="commitDatas()"/>
    </div>

    <div class="scroll-container">
      <hot-table :settings="hotSettings" ref="hotTableComponent"></hot-table>
    </div>
  </div>
</template>

<script>
  import { HotTable } from '@handsontable/vue';
  import Handsontable from 'handsontable';
  import 'handsontable/languages/zh-CN';
  import {fetchKpiWorkerGroup, saveKpiWorkerGroup} from "@/api/kpi-api"

  export default {
    data: function() {
      return {
        initData: [],
        deleteRowsList: [],
        updateRowsList: [],
        insertRowsList: [],
        hotSettings: {
          licenseKey: 'non-commercial-and-evaluation',
          rowHeaders: true,
          colHeaders: true,
          filters: true,
          language:'zh-CN',
          dropdownMenu: true,
          manualColumnResize: true,
          //fixedColumnsLeft: 7,
          contextMenu: true,
          manualColumnFreeze: true,
          data: [],
          deleteRows: [],
          columns: [
            {
              data: 'serialkey'
            },
            {
              data: 'groupid'
            },
            {
              data: 'groupname'
            }
          ],
          nestedHeaders: [
            [
              '', '组别ID', '组别名称'
            ]
          ],
          hiddenColumns: {
            columns: [0],
          }
        }
      };
    },
    components: {
      HotTable
    },
    mounted(){
      this.fetchData()
      Handsontable.hooks.add('beforeRemoveRow', this.removeRow, this.$refs.hotTableComponent.hotInstance);
      Handsontable.hooks.add('afterChange', this.updateRow, this.$refs.hotTableComponent.hotInstance);
    },
    methods: {
      commitDatas(){
        saveKpiWorkerGroup({data: this.$refs.hotTableComponent.hotInstance.getSourceData(), delData: this.deleteRowsList}).then(res => {
          this.fetchData()
        })
      },
      fetchData(){
        fetchKpiWorkerGroup({}).then(res => {
          this.$refs.hotTableComponent.hotInstance.loadData(res.data)
          this.deleteRowsList = []
          this.updateRowsList = []
          this.insertRowsList = []
          this.initData = res.data
          var hot = this.$refs.hotTableComponent.hotInstance
          this.$refs.hotTableComponent.hotInstance.updateSettings({
            cells: function (row, col) {
              var cellProperties = {};

              return cellProperties;
            }
          })
        })
      },
      removeRow(index, amount, physicalRows){
        for(var i=0;i<physicalRows.length;i++){
          this.deleteRowsList.push(this.initData[(physicalRows[i])].serialkey);
        }
      },
      updateRow(changes, source){
        if(changes!=null){
          
        }
      }
    }
  }
</script>

<style>
  @import '../../node_modules/handsontable/dist/handsontable.full.css';
  .scroll-container {
    width: 100%;
    height: 600px;
    overflow: hidden;
  }
</style>
