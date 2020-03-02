import * as Api from '@/api/register'
// const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
// const exp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

export function isRegisterValid(str) {
  Api.register().then((res) => {
    console.log(res)
    if (res.data === '0') {
      return {}
    } else if (res.data === '1') {
      console.log(1)
    } else {
      console.log(1)
    }
  })
}
// confirm() {
//   if (!exp.test(this.e_mail)) {
//     this.w_mail = '邮箱格式不正确。'
//     this.flag = false
//     this.lab = false
//   }
//   if (
//     this.username.length < 10 &&
//     this.username != '' &&
//     this.pass1 === this.pass2 &&
//     reg.test(this.pass1) &&
//     exp.test(this.e_mail)
//   ) {
//     this.$axios.get('api/getPublicKey').then(res => {
//       if (res.data.status === 0) {
//        /** 实例化 */
//         let encryptor = new JSEncrypt()
//         encryptor.setPublicKey(res.data.resultmap) //设置公钥
//         let registerData = {
//           username: this.username,
//           password: encryptor.encrypt(this.pass2),
//           e_mail: this.e_mail
//         }
//         this.$axios
//           .post('api/userRegister', registerData)
//           .then(res => {
//             if (res.data === '-1') {
//               //用户名已经存在
//               this.$message({
//                 showClose: true,
//                 message: '用户名已存在',
//                 type: 'error'
//               })
//             }
//             if (res.data === '0') {
//               //邮箱已经被注册
//               this.$message({
//                 showClose: true,
//                 message: '邮箱已经被注册',
//                 type: 'error'
//               })
//             }
//             if (res.data === '1') {
//               this.$message({
//                 message: `注册成功,${this.num}秒后跳转~`,
//                 type: 'success'
//               })
//               setTimeout(() => {
//                 this.$router.push('/login')
//               }, 3000)
//             }
//             if (res.data == '2') {
//               //注册失败
//               this.$message({
//                 showClose: true,
//                 message: '好像发生了点问题，再试一次吧~',
//                 type: 'error'
//               })
//             }
//           })
//           .catch(() => {
//             this.$message({
//               showClose: true,
//               message: '网络好像有点问题~。',
//               type: 'error'
//             })
//           })
//       }
//     })
//   }
// }
