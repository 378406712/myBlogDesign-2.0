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
            <span class="edit"
              ><a
                href="https://www.qdmmz.cn/wp-admin/post.php?post=1173&amp;action=edit"
                aria-label="编辑“router-link与a标签区别”"
                >编辑</a
              >
              | </span
            ><span class="inline hide-if-no-js"
              ><a
                class="button-link editinline"
                aria-label="快速编辑“router-link与a标签区别”"
                aria-expanded="false"
              >
                快速编辑
              </a>
              | </span
            ><span class="trash"
              ><a
                href="https://www.qdmmz.cn/wp-admin/post.php?post=1173&amp;action=trash&amp;_wpnonce=81ec5212c4"
                class="submitdelete"
                aria-label="移动“router-link与a标签区别”到垃圾箱"
                >移至回收站</a
              >
              | </span
            ><span class="view"
              ><a
                href="https://www.qdmmz.cn/378406712qq-com/1173/router-link%e4%b8%8ea%e6%a0%87%e7%ad%be%e5%8c%ba%e5%88%ab/"
                rel="bookmark"
                aria-label="查看“router-link与a标签区别”"
                >查看</a
              ></span
            >
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
    }
  },
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
      tabloid: (state) => state.essay.tabloid,
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
  // text-overflow: -o-ellipsis-lastline;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // display: -webkit-box;
  // -webkit-line-clamp: 2;
  // line-clamp: 2;
  // -webkit-box-orient: vertical;
}
.hidden{
  visibility: hidden;
}
.row-actions {
    color: #ddd;
    font-size: 13px;
    padding: 2px 0 0;
}
.button-link {
    margin: 0;
    padding: 0;
    box-shadow: none;
    border: 0;
    border-radius: 0;
    background: 0 0;
    cursor: pointer;
    text-align: left;
    color: #0073aa;
    transition-property: border,background,color;
    transition-duration: .05s;
    transition-timing-function: ease-in-out;
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
</style>
