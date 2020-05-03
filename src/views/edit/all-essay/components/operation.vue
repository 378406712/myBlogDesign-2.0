<template>
  <el-form style="margin: 2px 0 5px;">
    <el-form-item>
      <p class="search-box">
        <el-select
          v-model="operation"
          placeholder="批量操作"
          style="width: 10%;"
          size="mini"
        >
          <el-option label="批量操作" value="depatch"></el-option>
          <el-option label="删除" value="delete"></el-option>
        </el-select>
        <el-button size="mini" @click="BatchDelete">应用</el-button>
        <el-select
          v-model="chooseDate"
          placeholder="全部日期"
          style="width: 10%;"
          size="mini"
        >
          <el-option label="全部日期" value="all-date"></el-option>
          <el-option
            v-for="(item, index) in DateList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="chooseCategory"
          placeholder="所有分类目录"
          style="width: 12%;"
          size="mini"
        >
          <el-option label="所有分类目录" value="all-category"></el-option>
          <el-option
            v-for="(item, index) in CategoryList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>

        <Pagination
          style="float: right;"
          :total="totals"
          :size="sizes"
          :page="pages"
          v-on:sizeValue="sizeValue"
          v-on:pageValue="pageValue"
        />
        <el-button size="mini" @click="Filter">筛选</el-button>
      </p>
    </el-form-item>
  </el-form>
</template>

<script>
import Pagination from '@/components/pagination'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  components: { Pagination },
  props: {
    DateList: Array,
    CategoryList: Array,
  },
  data() {
    return {
      operation: 'depatch',
      chooseCategory: 'all-category',
      chooseDate: 'all-date',
    }
  },
  methods: {
    ...mapMutations(['ESSAY_PAGES', 'ESSAY_SIZES']),
    ...mapActions(['BatchDeleteEssay', 'GetEssay', 'FilterEssay']),
    /**
     * 删除多条
     * @class BatchDeleteEssay
     */
    async BatchDelete() {
      if (this.operation === 'delete' && this.selection) {
        const data = [] //id
        this.selection.map((item) => {
          Object.getOwnPropertyNames(item).forEach(function (key) {
            if (key == '_id') {
              data.push(item[key])
            }
          })
        })
        const param = {
          username: this.name,
          _id: JSON.stringify(data),
        }
        await this.BatchDeleteEssay(param)
        this.$emit('getEssay')
        this.$emit('getEssayNum')
        
      }
    },
    Filter() {
      console.log(this.chooseCategory, this.chooseDate)
      this.FilterEssay({
        params: {
          username: this.name,
          checkCategory: this.chooseCategory,
          date: this.chooseDate,
        },
      })
    },
    pageValue(pageValue) {
      this.ESSAY_PAGES(pageValue)
      this.$emit('getEssay')
    },
    sizeValue(sizeValue) {
      this.ESSAY_SIZES(sizeValue)
      this.$emit('getEssay')
    },
  },

  computed: {
    ...mapState({
      selection: (state) => state.essay.selection,
      pages: (state) => state.essay.pages,
      sizes: (state) => state.essay.sizes,
      totals: (state) => state.essay.totals,
    }),
    ...mapGetters(['name']),
  },
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
