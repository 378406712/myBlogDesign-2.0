<template>
  <el-form style="margin: 2px 0 5px">
    
    <el-form-item>
      
      <p class="search-box">
        <el-select
          v-model="operation"
          placeholder="批量操作"
          style="width:10%"
          size="mini"
        >
          <el-option label="批量操作" value="depatch"></el-option>
          <el-option label="删除" value="delete"></el-option>
        </el-select>
        <el-button  size="mini" @click="BatchDelete"
          >应用</el-button
        >
        <el-select
          v-model="operation"
          placeholder="全部日期"
          style="width:10%"
          size="mini"
        >
          <el-option label="全部日期" value="depatch"></el-option>
        </el-select>
        <el-select
          v-model="operation"
          placeholder="所有分类目录"
          style="width:12%"
          size="mini"
        >
          <el-option label="所有分类目录" value="depatch"></el-option>
          <el-option label="删除" value="delete"></el-option>
        </el-select>
        
        <Pagination
          style="float:right"
          :total="totals"
          :size="sizes"
          :page="pages"
          v-on:sizeValue="sizeValue"
          v-on:pageValue="pageValue"
        />
          <el-button  size="mini" @click="BatchDelete"
          >筛选</el-button>
      </p>
    </el-form-item>
  </el-form>
</template>

<script>
import Pagination from '@/components/pagination'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  components: { Pagination },
  data() {
    return {
      operation: 'depatch'
    }
  },
  methods: {
    ...mapMutations(['SET_PAGES_C', 'SET_SIZES_C']),
    ...mapActions(['BatchDeleteCategory', 'AllCategoryCount']),
    /**
     * 删除多条
     * @class BatchDelete
     */
    async BatchDelete() {
      if (this.operation === 'delete' && this.selection) {
        const data = [] //id
        const payload = [] //目录名
        this.selection.map(item => {
          Object.getOwnPropertyNames(item).forEach(function(key) {
            if (key == '_id') {
              data.push(item[key])
            } else if (key == 'category') {
              payload.push(item[key])
            }
          })
        })
        const param = {
          username: this.name,
          _id: JSON.stringify(data),
          category: payload
        }
        await this.BatchDeleteCategory(param)

        this.$emit('getCategory')
      }
    },
    pageValue(pageValue) {
      this.SET_PAGES_C(pageValue)
      this.$emit('getCategory')
    },
    sizeValue(sizeValue) {
      this.SET_SIZES_C(sizeValue)
      this.$emit('getCategory')
    }
  },
  computed: {
    ...mapState({
      selection: state => state.category.selection,
      pages: state => state.edit.pages,
      sizes: state => state.edit.sizes,
      totals: state => state.edit.totals
    }),
    ...mapGetters(['name'])
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
