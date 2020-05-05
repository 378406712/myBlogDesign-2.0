<template>
  <div class="card card-large-icons">
    <div class="card-icon bg-primary">
      <span class="svg-container">
        <svg-icon icon-class="lock" />
      </span>
    </div>
    <div class="card-body">
      <h4>修改密码</h4>
      <p>定期修改为高强度密码以保护您的账号</p>
      <a class="card-cta" @click="dialogFormVisible = true">
        立即修改
        <span class="svg-container">
          <svg-icon icon-class="chevron-right" />
        </span>
      </a>
    </div>
    <el-dialog
      top="2%"
      width="35%"
      :close-on-click-modal="false"
      title="修改账号密码"
      custom-class="alertPwd"
      :visible.sync="dialogFormVisible"
    >
      <el-form :rules="rules" :model="alterForm" ref="alterForm">
        <el-form-item id="labels" prop="originPass" label="原密码">
          <el-input
            v-model="alterForm.originPass"
            ref="originPass"
            autocomplete="off"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item id="labels" prop="newPass" label="新密码">
          <el-input
            v-model="alterForm.newPass"
            ref="newPass"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item id="labels" prop="checkPass" label="再次输入新密码">
          <el-input
            v-model="alterForm.checkPass"
            ref="checkPass"
            show-password
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="alterPass">确 定</el-button>
        <el-button @click="cancel('alterForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { JSEncrypt } from 'jsencrypt'
import { getPublicKey } from '@/api/publicKey'
import { mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    // pwd 验证
    const validatePass = (rule, value, callback) => {
      const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
      if (!reg.test(value)) {
        callback(new Error('密码须由数字,大写字母,小写字母,至少其中两种组成'))
      } else if (value === this.alterForm.originPass) {
        callback(new Error('原密码与新密码相同'))
      } else {
        this.$refs.alterForm.validateField('checkPass')
        callback()
      }
    }
    // checkPass 验证
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.alterForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      // 修改密码表单
      alterForm: {
        originPass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        originPass: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePass },
          { required: true, trigger: 'change', validator: validatePass }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePass2 },
          { required: true, trigger: 'change', validator: validatePass2 }
        ]
      }
    }
  },
  methods: {
    alterPass() {
      const { originPass, newPass } = this.alterForm
      this.$refs.alterForm.validate((valid) => {
        if (valid) {
          getPublicKey().then((res) => {
            let encryptor = new JSEncrypt()
            encryptor.setPublicKey(res.data.resultmap) //设置公钥
            let alterData = {
              originPass: encryptor.encrypt(originPass),
              newPass: encryptor.encrypt(newPass),
              username: this.name
            }
            this.$emit('alterPass', alterData)
          })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    }
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>
<style lang="stylus" scoped>
@import url('../../../style/card.css');
</style>
