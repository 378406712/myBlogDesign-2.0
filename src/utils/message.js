import {
  Message,
  MessageBox
} from 'element-ui'
export function Msg(message, type, duration = '1000') {
  return Message({
    message,
    type,
    duration,
  })
}

export function ComfirmMsg(msg, type, title = '提示') {
  return MessageBox.confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}
