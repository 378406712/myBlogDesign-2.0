import { removeToken } from '@/common/auth'
export function AlterAlert(status) {
  if (status === 'SUCCESS') {
    return swal({
      title: '修改密码成功!',
      text: '请重新登录',
      icon: 'success',
      button: 'OK'
    }).then(() => {
      removeToken()
      window.history.go(0)
    })
  } else if (status === 'PASSWORD_ERROR') {
    return swal({
      title: '修改密码失败!',
      text: '原密码错误',
      icon: 'error',
      button: 'OK'
    })
  }
}
export function DelAlert(status) {
  if (status === 'SUCCESS') {
    return swal({
      title: '删除账号成功!',
      icon: 'success',
      button: 'OK'
    }).then(() => {
      removeToken()
      window.history.go(0)
    })
  } else {
    return swal({
      title: '删除失败,网络好像出了小差～',
      text: '请重试',
      icon: 'error',
      button: 'OK'
    })
  }
}
export function SetAlert(status) {
  if (status === 'SUCCESS') {
    return swal({
      title: '设置成功!',
      icon: 'success',
      button: 'OK'
    })
  } else if (status === 'UPDATE') {
    return swal({
      title: '更新成功!',
      icon: 'success',
      button: 'OK'
    }).then(()=>{
      
    })
  } else {
    return swal({
      title: '设置失败,网络好像出了小差～',
      text: '请重试',
      icon: 'error',
      button: 'OK'
    })
  }
}
