import {
  Message
} from 'element-ui'
export function RegisterMsg(message, type, duration) {
  return Message({
    message,
    type,
    duration,
  })
}
