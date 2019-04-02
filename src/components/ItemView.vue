<template>
  <div class="grid-cell" :style="getClass()">
    {{ invItem.qty }}
  </div>
</template>

<script>
    export default {
        name: "ItemView",
        props: ['invItem'],
        data() {
          return{
            lessThanMinQty: {
              'background-color': 'green'
            },
            moreThanMaxQty: {
              'background-color': 'red'
            },
            normal: {
              'background-color': 'white'
            }
          }
        },
        methods: {
          getClass(){
            if(this.invItem.qty < this.invItem.minQty){
              return this.lessThanMinQty
            }else if(this.invItem.qty >= this.invItem.maxQty){
              return this.moreThanMaxQty
            }else{
              return this.normal
            }
          }
        }
    }
</script>

<style scoped>
  .grid-cell {
    border-radius: 4px;
    height: 30px;
  }
</style>
