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
    <el-table-column prop="title" label="标题" min-width="200">
      <template slot-scope="scope">
        <div @mouseleave="rowid = ''" @mouseover="rowid = scope.row._id">
          <strong
            ><router-link to="/">{{ scope.row.title }}</router-link></strong
          >
          <div
            id="essay-tabloid"
            v-if="tabloid === 'tabloid-view'"
            v-html="
              scope.row.essay.length > 50
                ? scope.row.essay.slice(0, 50) + '...'
                : scope.row.essay
            "
          ></div>
          <div
            :class="scope.row._id === rowid ? '' : 'hidden'"
            class="row-actions"
          >
            <span
              v-for="(item, index) in editSetting"
              :key="index"
              :class="(item.name === 'trash' ? 'trash' : 'x')"
              ><a @click="operate(item.name)" href="javascript:;">{{
                item.label
              }}</a
              ><em class="left" v-if="item.name != 'watch'">|</em>
            </span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      v-if="setting.includes('分类目录')"
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
      v-if="setting.includes('评论')"
      :render-header="commentIcon"
      label="评论"
    >
    </el-table-column>
    <el-table-column
      v-if="setting.includes('日期')"
      :sort-method="sortDate"
      :sortable="true"
      prop="date"
      label="日期"
    ></el-table-column>
    <el-table-column
      v-if="setting.includes('点击数')"
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
  data() {
    return {
      rowid: '',
      editSetting: [
        {
          label: '编辑',
          name: 'edit',
        },
        {
          label: '移至回收站',
          name: 'trash',
        },
        {
          label: '查看',
          name: 'watch',
        },
      ],
    }
  },
  methods: {
    ...mapMutations(['SET_SELECTION']),
    ...mapActions(['BatchTrashEssay']),
    async operate(val) {
      switch (val) {
        case 'edit':
          console.log('edit')
          break
        case 'trash':
          const param = {
            username: this.name,
            _id: JSON.stringify(this.rowid),
            tag:'single'
          }
          await this.BatchTrashEssay(param)
          this.$emit('getEssay')
          this.$emit('getEssayNum')
          break
        case 'watch':
          console.log('watch')
          break
      }
    },
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
      tabloid: (state) => state.essay.tabloid,
    }),
  },
}
</script>

<style lang="scss" scoped>
@import url(../../../../style/table.scss);
</style>
<style lang="stylus">
#essay-tabloid p {
  margin: 0 !important  ;
  color: #555;
}
.hidden{
  visibility: hidden;
}
.row-actions {
    color: #ddd;
    font-size: 13px;
    padding: 2px 0 0;
}
.row-actions a{
 font-weight:normal!important
}
.row-actions .trash a{
  color: #a00;
  &:hover{
 color:#dc3232;
  }
}
.row-actions em{
    margin :0 5px
  }
</style>
