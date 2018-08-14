<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    html {
        height: 100%;
    }
    body, #app{
        height: 99%;
    }
    #app{
        margin: 5px;
    }
</style>
