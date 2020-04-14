<template>
  <el-form  style="margin: 2px 0 5px">
    <el-form-item>
      <p class="search-box">
        <el-select
          v-model="operation"
          placeholder="请选择"
          style="width:15%"
          size="mini"
        >
          <el-option label="批量操作" value="depatch"></el-option>
          <el-option label="删除" value="delete"></el-option>
        </el-select>
        <el-button style="width:11%" size="mini">应用</el-button>
        <Pagination  class="none" style="float:right" :total="1" :size="1" :page="1" />
      </p>
    </el-form-item>
  </el-form>
</template>

<script>
import Pagination from '@/components/pagination'

export default {
  components: { Pagination },
  data() {
    return {
      operation: '批量操作'
    }
  }
}
</script>

<style scoped>
.search-box {
  margin: 0;
}
.none {
  display: none;
}
</style>
