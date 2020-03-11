import { removeToken } from '@/common/auth'
export function Alerts(status) {
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
