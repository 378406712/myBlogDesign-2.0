import { removeToken } from '@/common/auth'
export function AlterAlert(status) {
  if (status === 'success') {
    return swal({
      title: '修改密码成功!',
      text: '请重新登录',
      icon: status,
      button: 'OK'
    }).then(() => {
      removeToken()
      window.history.go(0)
    })
  } else if (status === 'error') {
    return swal({
      title: '修改密码失败!',
      text: '原密码错误',
      icon: status,
      button: 'OK'
    })
  }
}
export function DelAlert(status) {
  if (status === 'success') {
    return swal({
      title: '删除账号成功!',
      icon: status,
      button: 'OK'
    }).then(() => {
      removeToken()
      window.history.go(0)
    })
  } else {
    return swal({
      title: '删除失败,网络好像出了小差～',
      text: '请重试',
      icon: data,
      button: 'OK'
    })
  }
}
