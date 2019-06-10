<template>
  <div id="app">
    <ul id="main">
      <li><router-link  to="/inv" >库存视图</router-link></li>
      <li><router-link  to="/workInfoInput">KPI考核</router-link></li>
			<li><router-link  to="/kpiWorkerGroup">KPI组别维护</router-link></li>
			<li><router-link  to="/kpiUsers">KPI用户维护</router-link></li>
			<li><router-link  to="/kpiWorkItem">KPI工作项维护</router-link></li>
			<li><router-link  to="/kpiSourceData">KPI数据维护</router-link></li>
      <li><router-link  to="/kpiLabor">打卡信息维护</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {

}
</style>
