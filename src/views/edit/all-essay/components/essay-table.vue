<template>
  <el-table
    :data="essayList"
    @selection-change="handleChange"
    style="width: 100%;"
    :stripe="true"
    :default-sort="{ prop: 'selectDate', order: 'descending' }"
  >
    >
    <el-table-column type="selection" width="45"></el-table-column>
    <el-table-column prop="title" label="标题" width="400">
      <template slot-scope="scope">
        <strong
          ><router-link to="/">{{ scope.row.title }}</router-link></strong
        >
        <div id="essay-tabloid" v-html="scope.row.essay"></div>
      </template>
    </el-table-column>
    <el-table-column
      v-if="!setting.includes('分类目录')"
      sortable
      prop="checkCategory"
      label="分类目录"
    >
      <template slot-scope="{ row }">
        <router-link
          v-for="(category, index) in row.checkCategory"
          :key="index"
          :to="'/edit/category-detail/' + category"
        >
          {{ category }}

          <span v-if="!(index + 1 == row.checkCategory.length)">、</span>
        </router-link>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="comment"
      v-if="!setting.includes('评论')"
      :render-header="commentIcon"
      label="评论"
    >
    </el-table-column>
    <el-table-column
      v-if="!setting.includes('日期')"
      :sort-method="sortDate"
      :sortable="true"
      prop="date"
      label="日期"
    ></el-table-column>
    <el-table-column
      v-if="!setting.includes('点击数')"
      sortable
      prop="click_sum"
      label="点击数"
    >
      <template slot-scope="scope">
        <router-link :to="'/edit/category-detail/' + scope.row.category">
          {{ scope.row.category }}</router-link
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SET_SELECTION']),
    handleChange(val) {
      this.SET_SELECTION(val)
    },
    commentIcon(h, { column, $index }, index) {
      return h('span', {}, [
        h(
          'el-popover',
          {
            props: {
              placement: 'top-start',
              width: '50',
              trigger: 'hover',
              content: '评论数量',
            },
          },
          [
            h(
              'i',
              {
                slot: 'reference',
                class: 'el-icon-s-comment',
                style: 'fontSize:24px;position:relative;top:5px',
              },
              ''
            ),
          ]
        ),
      ])
    },
    sortDate(a, b) {
      let sortA = Date.parse(new Date(a.selectDate))
      let sortB = Date.parse(new Date(b.selectDate))
      return sortA - sortB
    },
  },
  computed: {
    ...mapState({
      essayList: (state) => state.essay.essayList,
      setting: (state) => state.essay.setting,
    }),
  },
}
</script>

<style lang="scss" scoped>
@import url(../../../../style/table.scss);
</style>
<style lang="stylus">
#essay-#essay-tabloid{


}
#essay-tabloid p {
  margin: 0 !important  ;
  color: #555;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
