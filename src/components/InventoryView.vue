<template>
  <div class="parentDiv">
    <div class="radio-box" >
      <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
        <input v-model="zone" :value="item.value" :checked='item.isChecked' @click="check(index)" type="radio">{{item.label}}
      </div>
    </div>

    <br/>
    <table class="gridtable">
      <tr v-for ="row in dataList">
        <td v-for="col in row" v-bind:class="col===null?'nullStyle':col.per>=1.3?'red':col.per>=0.3&&col.per<1.3?'yellow':col.per<0.3&&col.per>0?'green':'white'" v-bind:title="col===null?'':(col.loc+'数量'+col.qty)">
          <div style="width: 14px; height: 7px;text-align: center">
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {fetchInvData, invData} from "@/api/inventory-view-api"
  import {wsBaseUrl} from '@/apiconfig/index'
  export default {
        name: "InventoryView",
        data(){
          return{
            ws: null,
            col: 0,
            row: 0,
            dataList: [this.col][this.row],
            zone: 'C1%',
            radios:[
              {
                label: 'C1区',
                value:'C1%',
                isChecked: true,
              },
              {
                label: 'C2区',
                value:'C2%',
                isChecked: false,
              },
              {
                label: 'C3区',
                value:'C3%',
                isChecked: false,
              }
            ]
          }
        },
        watch: {
          dataList(val) {

          },
          zone(val){
            this.fetchData()
            this.ws.send(val)
          }
        },
        created(){
          this.websocket()
        },
        mounted(){
          this.fetchData()
        },
        methods:{
          fetchData(){
            var _this = this

            fetchInvData({zone:this.zone}).then(res => {
              this.row = res.data.rowLength
              this.col = res.data.colLength
              var tmp = res.data.dataList
              //_this.$set(_this.showData, 'dataList', res.data.dataList)

              _this.dataList = new Array()
              for(var i=0;i<tmp.length;i++){
                _this.dataList[i] = new Array()
                for(var j=0;j<tmp[i].length;j++){
                  _this.$set(_this.dataList[i], j, tmp[i][j])
                }
              }
            })
          },
          websocket () {
            this.ws = new WebSocket(wsBaseUrl)
            this.ws.onopen = () => {
              // Web Socket 已连接上，使用 send() 方法发送数据
              this.ws.send(this.zone)
              //console.log('数据发送中...')
            }
            this.ws.onmessage = evt => {
              var tmpData = JSON.parse(evt.data)
              for(var i=0;i<tmpData.length;i++){
                if(this.dataList[tmpData[i].xcoord][tmpData[i].ycoord])
                  this.$set(this.dataList[tmpData[i].xcoord], tmpData[i].ycoord, tmpData[i])
              }
            }
            this.ws.onclose = function () {
              // 关闭 websocket
              console.log('连接已关闭...')
            }
            // 路由跳转时结束websocket链接
            this.$router.afterEach(function () {
              this.ws.close()
            })
          },
          check(index) {
            // 先取消所有选中项
            this.radios.forEach((item) => {
              item.isChecked = false;
            });
            //再设置当前点击项选中
            this.zone = this.radios[index].value;
            // 设置值，以供传递
            this.radios[index].isChecked = true;
            console.log(this.zone);
          }
        }
    }
</script>

<style lang="less" scoped>
  tr{display:inline-block;}
  .red{
    background:red;
  }
  .green{
    background:green;
  }
  .yellow{
    background:yellow;
  }
  .white{
    background:white;
  }
  .nullStyle{
    visibility: hidden;
  /*background:white;*/
}
table.gridtable {
  font-family: verdana,arial,sans-serif;
  font-size:7px;
  color:#333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
  border:1px solid black;
}
table.gridtable tr{
  margin:0px;
  display: block;
}
table.gridtable td {
  border-width: 1px;
  padding: 0px;
  border-style: solid;
  border-color: #666666;
}
  .radio-box{
    display: inline-block;
    position: relative;
    height: 25px;
    line-height: 25px;
    margin-right: 5px;
    text-align:center;
  }
  .parentDiv {
    text-align:center;
  }

</style>
