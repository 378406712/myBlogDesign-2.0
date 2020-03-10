<template>
  <div class="card card-large-icons">
    <div class="card-icon bg-primary">
      <span class="svg-container">
        <svg-icon icon-class="skull" />
      </span>
    </div>
    <div class="card-body">
      <h4>删除账号</h4>
      <p>您的所有数据都会被删除，无法找回</p>
      <a
        href="##"
        class="card-cta"
        data-toggle="modal"
        data-target="#kill-modal"
        @click="removePass"
      >
        申请删除
        <span class="svg-container">
          <svg-icon icon-class="chevron-right" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    removePass() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let removeData = {
            params: {
              username: this.username,
              e_mail: this.e_mail
            }
          }
          this.$axios.get('/api/userRemove', removeData).then(res => {
            if (res.data.status == '0') {
              swal({
                title: '删除成功!',
                icon: 'success',
                button: 'Aww yiss!'
              }).then(() => {
                delete localStorage.token
                this.$router.go(0)
              })
            } else {
              swal({
                title: '删除失败,网络好像出了小差～',
                icon: 'error',
                button: 'yiss Aww!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
/deep/ .el-form-item__label {
    font-weight: 800;
    color: #34395e;
    font-size: 12px;
    letter-spacing: 0.5px;
  }
  /deep/ .el-dialog__body {
    padding: 25px;
    padding-top: 15px;
  }
  /deep/ .el-dialog {
    border-radius: 0.3rem;
  }
  /deep/.el-dialog__title {
    font-size: 18px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 700;
    color: #6c757d;
  }
  /deep/.swal-button {
    padding: 7px 19px;
    border-radius: 5px;
    background-color: #3085d6;
    font-size: 1.1rem;
    font-family: none;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
    padding: 10px 25px;
  }
  /deep/.swal-footer {
    text-align: center;
  }
  .card.card-large-icons .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 150px;
    border-radius: 3px 0 0 3px;
  }
  .card-icon svg {
    font-size: 66px !important;
  }
  .card.card-large-icons .card-body {
    padding: 18px 30px;
  }
  .card.card-large-icons .card-body h4 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .card.card-large-icons .card-body p {
    opacity: 0.6;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .bg-primary {
    background-color: #6777ef !important;
  }
  .el-radio {
    margin: 0;
  }
  .showPic {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    text-align: center;
    outline: 0;
  }
  .card-cta {
    color: #6777ef;
    font-weight: 500;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    font-size: 14px;
  }
</style>
