<template>
  <div id="app" >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
[v-cloak] {
  display: none;
}
@import 'normalize.css/normalize.css';
@import './style/custom.css';
</style>
