<template>
  <el-table
    :data="essayList"
    ref="essayTable"
    :expand-row-keys="expands"
    row-key="_id"
    @selection-change="handleChange"
    @expand-change="handleExpand"
    style="width: 100%;"
    :stripe="true"
    :default-sort="{ prop: 'selectDate', order: 'descending' }"
  >
    >
    <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column type="expand">
      <template slot-scope="scope">
        <div class="bottom_content">
          <!-- <a @click="update(scope.row)"></a> -->
      <UpdateTable/>
        </div>
      </template>
    </el-table-column>
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
              :class="(item.name === 'trash' ? 'trash' : '')"
              ><a @click="operate(item.name, scope.row)" href="javascript:;">{{
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
import UpdateTable  from './updateTable'
export default {
  components:{UpdateTable},
  data() {
    return {
      expands: [],
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
    //更新表格数据(关闭)
    update(row) {
      console.log(row)
      this.expands = []
    },
    async operate(val, row) {
      switch (val) {
        case 'edit':
          this.handleExpand(row, [row])
          break
        case 'trash':
          const param = {
            username: this.name,
            _id: JSON.stringify(this.rowid),
            tag: 'single',
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
    //只能展开1行
    handleExpand(row, expandedRows) {
      let _this = this
      if (expandedRows.length) {
        _this.expands = []
        if (row) {
          _this.expands.push(row._id)
        }
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
                style: 'fontSize:24px;',
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
