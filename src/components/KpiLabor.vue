<template>
  <div>
    <div>
      日期：<input type="date" v-model="workDate">
      组别：<select v-model="groupName">
        <option value="">请选择组别</option>
        <option>收货组</option>
        <option>库存组</option>
        <option>拣货组</option>
        <option>发货组</option>
        <option>退货组</option>
        <option>质检组</option>
        <option>网购组</option>
      </select>
      <input type="button" value="查询" @click="fetchData()"/>
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
  import {fetchKpiLabor} from "@/api/kpi-api"

  export default {
    data: function() {
      return {
        workDate: '',
        groupName: '',
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
          width: '100%',
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
              data: 'userId',
            },
            {
              data: 'userName',
            },
            {
              data: 'workItem'
            },
            {
              data: 'workItemDescr',
            },
            {
              data: 'startTime',
              type: 'date',
              dateFormat: 'YYYY-MM-DD',
              correctFormat: true
            },
            {
              data: 'endTime',
              type: 'date',
              dateFormat: 'YYYY-MM-DD',
              correctFormat: true
            },
            {
              data: 'addDate',
              readonly: true
            },
            {
              data: 'addWho',
              readonly: true
            }
          ],
          nestedHeaders: [
            [
              '', '登录ID', '姓名', '工作项', '工作项名称', '开始时间', '结束时间', '日期', '操作人'
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
        saveKpiSourceData({data: this.$refs.hotTableComponent.hotInstance.getSourceData(), delData: this.deleteRowsList}).then(res => {
          console.log(this.$refs.hotTableComponent.hotInstance.getSourceData())
          this.fetchData()
        })
      },
      fetchData(){
        fetchKpiLabor({workDate: this.workDate, groupName: this.groupName}).then(res => {
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
