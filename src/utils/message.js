import { Message, MessageBox } from 'element-ui'
export function Msg(message, type, offset=20,duration = '1000') {
  return Message({
    message,
    type,
    offset,
    duration
  })
}

export function ComfirmMsg(
  msg = '此操作将永久删除该账号, 是否继续?',
  type = 'warning',
  title = '提示'
) {

  return MessageBox.confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}