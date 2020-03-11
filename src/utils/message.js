import { Message, MessageBox } from 'element-ui'
export function Msg(message, type, duration = '1000') {
  return Message({
    message,
    type,
    duration
  })
}

export function ComfirmMsg(
  msg = '此操作将永久删除该文件, 是否继续?',
  type = 'warning',
  title = '提示'
) {
  return MessageBox.confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}