<template>
  <el-backtop @mouseenter="change" :right="6" :bottom="10">
    <div class="ball">
      <i class="el-icon-arrow-up"></i>
    </div>
  </el-backtop>
</template>
<script></script>
<style lang="stylus">
.ball{
    height: 100%;
        width: 100%;
        font-size: 24px;
        background: #FF8500!important;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #fff;
        border-radius: 5px;
   -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
}
</style>
