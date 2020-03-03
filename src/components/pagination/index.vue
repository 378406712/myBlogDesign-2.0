<template>
  <div class="paginations block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6, 8, 10]"
      :page-size="size"
      :current-page="page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="Number(msg)"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "paginations",
  props: ["msg", "size", "page"],
  data() {
    return {}
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("sizeValue", size)
    },
    handleCurrentChange(page) {
      if (page != this.page) {
        this.$emit("pageValue", page - 1)
      }
      this.$emit("pageValue", page)
    }
  },
  mounted() {
  }
}
</script>
