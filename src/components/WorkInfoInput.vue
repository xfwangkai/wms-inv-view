<template>
  <div>
    <div>
      日期：<input type="date" v-model="workDate">
      组别：<select v-model="groupName">
        <option value="">请选择组别</option>
        <option>收货组</option>
        <option>库存组</option>
        <option>拣货组</option>
        <option>出库组</option>
        <option>退货组</option>
        <option>质检组</option>
        <option>网购组</option>
        <option>道具组</option>
      </select>
      <input type="button" value="查询" @click="fetchData()"/>
      <input type="button" value="保存" @click="commitDatas()" style="display: none"/>
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
  import {fetchData, saveData} from "@/api/kpi-api"

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
          dropdownMenu: true,
          manualColumnResize: true,
          fixedColumnsLeft: 7,
          contextMenu: true,
          manualColumnFreeze: true,
          data: [],
          deleteRows: [],
          columns: [
            {
              data: 'serialkey'
            },
            {
              data: 'WORKDATE',
              type: 'date',
              dateFormat: 'YYYY-MM-DD',
              correctFormat: true
            },
            {
              data: 'GROUPNAME'
            },
            {
              data: 'userid'
            },
            {
              data: 'TOTALHR',
              type: 'numeric'
            },
            {
              data: 'ZZHR',
              type: 'numeric'
            },
            {
              data: 'HR5S',
              type: 'numeric'
            },
            {
              data: 'SH_SHDS_EA',
              type: 'numeric'
            },
            {
              data: 'SH_WXSM_EA',
              type: 'numeric'
            },
            {
              data: 'SH_TBQ_EA',
              type: 'numeric'
            },
            {
              data: 'SH_SMPD_EA',
              type: 'numeric'
            },
            {
              data: 'SH_YH_EA',
              type: 'numeric'
            },
            {
              data: 'SH_QT',
              type: 'numeric'
            },
            {
              data: 'SH_SHDS_HR',
              type: 'numeric'
            },
            {
              data: 'SH_WXSM_HR',
              type: 'numeric'
            },
            {
              data: 'SH_TBQ_HR',
              type: 'numeric'
            },
            {
              data: 'SH_SMPD_HR',
              type: 'numeric'
            },
            {
              data: 'SH_YH_HR',
              type: 'numeric'
            },
            {
              data: 'SH_QT_HR',
              type: 'numeric'
            },
            {
              data: 'KC_LJBH_EA',
              type: 'numeric'
            },
            {
              data: 'KC_CCSJ_EA',
              type: 'numeric'
            },
            {
              data: 'KC_YH_EA',
              type: 'numeric'
            },
            {
              data: 'KC_SMPD_EA',
              type: 'numeric'
            },
            {
              data: 'KC_TPZL_CS',
              type: 'numeric'
            },
            {
              data: 'KC_SHDS_EA',
              type: 'numeric'
            },
            {
              data: 'KC_BB_EA',
              type: 'numeric'
            },
            {
              data: 'KC_DBSM_EA',
              type: 'numeric'
            },
            {
              data: 'KC_DJS_D',
              type: 'numeric'
            },
            {
              data: 'KC_DJC_D',
              type: 'numeric'
            },
            {
              data: 'KC_QT',
              type: 'numeric'
            },
            {
              data: 'KC_LJBH_HR',
              type: 'numeric'
            },
            {
              data: 'KC_CCSJ_HR',
              type: 'numeric'
            },
            {
              data: 'KC_YH_HR',
              type: 'numeric'
            },
            {
              data: 'KC_SMPD_HR',
              type: 'numeric'
            },
            {
              data: 'KC_TPZL_HR',
              type: 'numeric'
            },
            {
              data: 'KC_SHDS_HR',
              type: 'numeric'
            },
            {
              data: 'KC_BB_HR',
              type: 'numeric'
            },
            {
              data: 'KC_DBSM_HR',
              type: 'numeric'
            },
            {
              data: 'KC_DJS_HR',
              type: 'numeric'
            },
            {
              data: 'KC_DJC_HR',
              type: 'numeric'
            },
            {
              data: 'KC_QT_HR',
              type: 'numeric'
            },
            {
              data: 'JH_JH_EA',
              type: 'numeric'
            },
            {
              data: 'JH_DSFH_EA',
              type: 'numeric'
            },
            {
              data: 'JH_TBQ_EA',
              type: 'numeric'
            },
            {
              data: 'JH_QT',
              type: 'numeric'
            },
            {
              data: 'JH_JH_HR',
              type: 'numeric'
            },
            {
              data: 'JH_DSFH_HR',
              type: 'numeric'
            },
            {
              data: 'JH_TBQ_HR',
              type: 'numeric'
            },
            {
              data: 'JH_QT_HR',
              type: 'numeric'
            },
            {
              data: 'CK_CZDB_CS',
              type: 'numeric'
            },
            {
              data: 'CK_CKJJ_CS',
              type: 'numeric'
            },
            {
              data: 'CK_FH_EA',
              type: 'numeric'
            },
            {
              data: 'CK_KSCL_D',
              type: 'numeric'
            },
            {
              data: 'CK_WLGZ_D',
              type: 'numeric'
            },
            {
              data: 'CK_QT',
              type: 'numeric'
            },
            {
              data: 'CK_CZDB_HR',
              type: 'numeric'
            },
            {
              data: 'CK_CKJJ_HR',
              type: 'numeric'
            },
            {
              data: 'CK_FH_HR',
              type: 'numeric'
            },
            {
              data: 'CK_KSCL_HR',
              type: 'numeric'
            },
            {
              data: 'CK_WLGZ_HR',
              type: 'numeric'
            },
            {
              data: 'CK_QT_HR',
              type: 'numeric'
            },
            {
              data: 'TH_SBG_D',
              type: 'numeric'
            },
            {
              data: 'TH_TMTHSM_EA',
              type: 'numeric'
            },
            {
              data: 'TH_RKSM_EA',
              type: 'numeric'
            },
            {
              data: 'TH_GH_EA',
              type: 'numeric'
            },
            {
              data: 'TH_DB_EA',
              type: 'numeric'
            },
            {
              data: 'TH_RKDS_EA',
              type: 'numeric'
            },
            {
              data: 'TH_SLQD_EA',
              type: 'numeric'
            },
            {
              data: 'TH_DHDJ_D',
              type: 'numeric'
            },
            {
              data: 'TH_KWZL_EA',
              type: 'numeric'
            },
            {
              data: 'TH_DJCL_D',
              type: 'numeric'
            },
            {
              data: 'TH_BZFH_EA',
              type: 'numeric'
            },
            {
              data: 'TH_QT',
              type: 'numeric'
            },
            {
              data: 'TH_SBG_HR',
              type: 'numeric'
            },
            {
              data: 'TH_TMTHSM_HR',
              type: 'numeric'
            },
            {
              data: 'TH_RKSM_HR',
              type: 'numeric'
            },
            {
              data: 'TH_GH_HR',
              type: 'numeric'
            },
            {
              data: 'TH_DB_HR',
              type: 'numeric'
            },
            {
              data: 'TH_RKDS_HR',
              type: 'numeric'
            },
            {
              data: 'TH_SLQD_HR',
              type: 'numeric'
            },
            {
              data: 'TH_DHDJ_HR',
              type: 'numeric'
            },
            {
              data: 'TH_KWZL_HR',
              type: 'numeric'
            },
            {
              data: 'TH_DJCL_HR',
              type: 'numeric'
            },
            {
              data: 'TH_BZFH_HR',
              type: 'numeric'
            },
            {
              data: 'TH_QT_HR',
              type: 'numeric'
            },
            {
              data: 'ZJ_ZJ_EA',
              type: 'numeric'
            },
            {
              data: 'ZJ_FX_EA',
              type: 'numeric'
            },
            {
              data: 'ZJ_CJ_EA',
              type: 'numeric'
            },
            {
              data: 'ZJ_JZCCSM_EA',
              type: 'numeric'
            },
            {
              data: 'ZJ_YT_EA',
              type: 'numeric'
            },
            {
              data: 'ZJ_ZSX_EA',
              type: 'numeric'
            },
            {
              data: 'ZJ_BDP_EA',
              type: 'numeric'
            },
            {
              data: 'ZJ_QT',
              type: 'numeric'
            },
            {
              data: 'ZJ_ZJ_HR',
              type: 'numeric'
            },
            {
              data: 'ZJ_FX_HR',
              type: 'numeric'
            },
            {
              data: 'ZJ_CJ_HR',
              type: 'numeric'
            },
            {
              data: 'ZJ_JZCCSM_HR',
              type: 'numeric'
            },
            {
              data: 'ZJ_YT_HR',
              type: 'numeric'
            },
            {
              data: 'ZJ_ZSX_HR',
              type: 'numeric'
            },
            {
              data: 'ZJ_BDP_HR',
              type: 'numeric'
            },
            {
              data: 'ZJ_QT_HR',
              type: 'numeric'
            },
            {
              data: 'WG_DZH_EA',
              type: 'numeric'
            },
            {
              data: 'WG_JH_EA',
              type: 'numeric'
            },
            {
              data: 'WG_FHSM_EA',
              type: 'numeric'
            },
            {
              data: 'WG_WPHJH_EA',
              type: 'numeric'
            },
            {
              data: 'WG_DBCZ_CS',
              type: 'numeric'
            },
            {
              data: 'WG_KDBGJJSM_D',
              type: 'numeric'
            },
            {
              data: 'WG_BZ_D',
              type: 'numeric'
            },
            {
              data: 'WG_MDPD_EA',
              type: 'numeric'
            },
            {
              data: 'WG_HS',
              type: 'numeric'
            },
            {
              data: 'WG_DZH_HR',
              type: 'numeric'
            },
            {
              data: 'WG_JH_HR',
              type: 'numeric'
            },
            {
              data: 'WG_FHSM_HR',
              type: 'numeric'
            },
            {
              data: 'WG_WPHJH_HR',
              type: 'numeric'
            },
            {
              data: 'WG_DBCZ_HR',
              type: 'numeric'
            },
            {
              data: 'WG_KDBGJJSM_HR',
              type: 'numeric'
            },
            {
              data: 'WG_BZ_HR',
              type: 'numeric'
            },
            {
              data: 'WG_MDPD_HR',
              type: 'numeric'
            },
            {
              data: 'WG_HS_HR',
              type: 'numeric'
            },
            {
              data: 'AQ',
              type: 'numeric'
            },
            {
              data: 'AQ_HR',
              type: 'numeric'
            }
          ],
          nestedHeaders: [
            [
              '', {label: '', colspan: 6},
              {label: '收货组', colspan: 12},
              {label: '库存组', colspan: 22},
              {label: '拣货组', colspan: 8},
              {label: '出库组', colspan: 12},
              {label: '退货组', colspan: 24},
              {label: '质检组', colspan: 16},
              {label: '网购组', colspan: 18},
              {label: '安全组', colspan: 2}
            ],
            [
              '', {label: '', colspan: 6},
              {label: '工作量', colspan: 6}, {label: '工作时间', colspan: 6},
              {label: '工作量', colspan: 11}, {label: '工作时间', colspan: 11},
              {label: '工作量', colspan: 4}, {label: '工作时间', colspan: 4},
              {label: '工作量', colspan: 6}, {label: '工作时间', colspan: 6},
              {label: '工作量', colspan: 12}, {label: '工作时间', colspan: 12},
              {label: '工作量', colspan: 8}, {label: '工作时间', colspan: 8},
              {label: '工作量', colspan: 9}, {label: '工作时间', colspan: 9},
              {label: '', colspan: 1}, {label: '', colspan: 1}
            ],
            [
              'ID', '日期', '组别', '姓名', '总工时', '组长工时', '5S工时',
              '收货点数（件）', '外销扫描（件）', '贴标签（件）', '扫描盘点（件）', '移货（件）', '其他',
              '收货点数（时）', '外销扫描（时）', '贴标签（时）', '扫描盘点（时）', '移货（时）', '其他',
              '零拣补货（箱）', '存储上架（箱）', '移货（件）', '扫描盘点（件）', '托盘整理（箱）', '收货点数（件）', '并板（件）', '调拨扫描（件）', '道具收（单）', '道具出（单）', '其他',
              '零拣补货（时）', '存储上架（时）', '移货（时）', '扫描盘点（时）', '托盘整理（时）', '收货点数（时）', '并板（时）', '调拨扫描（时）', '道具收（时）', '道具出（时）', '其他',
              '拣货（件）', '点数复核（件）', '贴标签（件）', '其他',
              '拣货（时）', '点数复核（时）', '贴标签（时）', '其他',
              '称重打包（箱）', '出库交接（箱）', '分货（件）', '客诉处理（单）', '物流跟踪', '其他',
              '称重打包（时）', '出库交接（时）', '分货（时）', '客诉处理（时）', '物流跟踪', '其他',
              '收包裹（单）', '天猫退货扫描（件）', '入库扫描（件）', '归货（件）', '打包（件）', '入库点数（件）', '数量清点（件）', '到货登记（单）', '库位整理（个）', '单据处理（单）', '播种分货（件）', '其他',
              '收包裹（时）', '天猫退货扫描（时）', '入库扫描（时）', '归货（时）', '打包（时）', '入库点数（时）', '数量清点（时）', '到货登记（时）', '库位整理（时）', '单据处理（时）', '播种分货（时）', '其他',
              '质检（件）', '返修（件）', '抽检（件）', '季中残次扫描（件）', '熨烫（件）', '转属性（件）', '补吊牌（件）', '其他',
              '质检（时）', '返修（时）', '抽检（时）', '季中残次扫描（时）', '熨烫（时）', '转属性（时）', '补吊牌（时）', '其他',
              '叠纸盒（个）', '拣货（件）', '复核扫描（件）','唯品会拣货（件）', '打包称重（箱）', '快递包裹交接扫描（单）','包装（单）', '门店盘点（件）', '火炻',
              '叠纸盒（时）', '拣货（时）', '复核扫描（时）','唯品会拣货（时）', '打包称重（时）', '快递包裹交接扫描（时）','包装（时）', '门店盘点（时）', '火炻',
              '工作内容', '工作时间'
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
        saveData({data: this.$refs.hotTableComponent.hotInstance.getSourceData(), delData: this.deleteRowsList}).then(res => {
          this.fetchData()
        })
      },
      fetchData(){
        fetchData({workDate: this.workDate, groupName: this.groupName}).then(res => {
          this.$refs.hotTableComponent.hotInstance.loadData(res.data)
          this.deleteRowsList = []
          this.updateRowsList = []
          this.insertRowsList = []
          this.initData = res.data
          var hot = this.$refs.hotTableComponent.hotInstance
          this.$refs.hotTableComponent.hotInstance.updateSettings({
            cells: function (row, col) {
              var cellProperties = {};

              //if (hot.getData()[row][1] === '2019-04-02') {
              //  cellProperties.readOnly = true;
              //}

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
          /*
          changes.forEach(([row, prop, oldValue, newValue]) => {
            var rowData = this.$refs.hotTableComponent.hotInstance.getDataAtRow(row)
            if(rowData[0]!=null){
              this.updateRowsList.push(rowData)
            }else{
              this.insertRowsList.push(rowData)
            }
          });
          */
        }
        //console.log(this.insertRowsList)
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
