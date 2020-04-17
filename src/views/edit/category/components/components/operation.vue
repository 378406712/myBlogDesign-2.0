<template>
  <el-form style="margin: 2px 0 5px">
    <el-form-item>
      <p class="search-box">
        <el-select
          v-model="operation"
          placeholder="批量操作"
          style="width:15%"
          size="mini"
        >
          <el-option label="批量操作" value="depatch"></el-option>
          <el-option label="删除" value="delete"></el-option>
        </el-select>
        <el-button style="width:11%" size="mini" @click="BatchDelete"
          >应用</el-button
        >
        <Pagination
          class="none"
          style="float:right"
          :total="1"
          :size="1"
          :page="1"
        />
      </p>
    </el-form-item>
  </el-form>
</template>

<script>
import Pagination from '@/components/pagination'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: { Pagination },
  data() {
    return {
      operation: 'depatch'
    }
  },
  methods: {
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
    }
  },
  computed: {
    ...mapState({
      selection: state => state.category.selection
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
