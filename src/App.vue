<template>
  <div id='app'>
    <h1>App</h1>
    <router-view />
  </div>
</template>
<script lang='ts'>
import Vue from "vue";
import request from "@/utils/request";
request({
  method: "GET",
  url: "/v2/api-docs?group=edu-front-boot",
}).then((res) => {
  console.log(res);
});

export default Vue.extend({
  name: "app",
});
</script>
<style lang='scss'></style>
