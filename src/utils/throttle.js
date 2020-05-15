// 防抖函数
export default function throttle(fn, delay) {
  let timeout = null
  return function () {
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(this, args)
      }, delay)
    }
  }
}
