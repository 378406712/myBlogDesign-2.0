<template>
  <el-dropdown @command="changeTheme">
    <span class="">
      <svg-icon class="" icon-class="pifu" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item class="clearfix" command="default">
        渐变绿
      </el-dropdown-item>
      <el-dropdown-item class="clearfix" command="science-blue">
        深空蓝
      </el-dropdown-item>
       <el-dropdown-item class="clearfix" command="sundown-red">
        日落红
      </el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/theme/index">
        更多皮肤</router-link>
      </el-dropdown-item>
      
      
    </el-dropdown-menu>
    
  </el-dropdown>
</template>

<script>
import '@/assets/custom-theme/sundown-red.css' // the theme changed version element-ui css
import '@/assets/custom-theme/science-blue.css' 
import { addClass, removeClass } from '@/utils'
export default {
  methods: {
    // change theme - 换肤
    changeTheme(command) {
      if(command === 'default') {
        removeClass(document.body)
      
        return
      }
      if(command === 'science-blue') {
        removeClass(document.body)
        addClass(document.body, 'science-blue')
        return
      }
     if(command === 'sundown-red') {
       removeClass(document.body)
        addClass(document.body, 'sundown-red')
        return
      }
    }
  }
}
</script>