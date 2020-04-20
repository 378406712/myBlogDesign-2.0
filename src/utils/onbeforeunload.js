function onbeforeunload(target, path) {
  window.onbeforeunload = function(e) {
    if (target.$route.fullPath === path) {
      // 兼容IE8和Firefox 4之前的版本
      var e = e || window.event

      if (e) {
        e.returnValue = '关闭提示'
      } // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示'
    } else {
      window.onbeforeunload = null
    }
  }
}
export default onbeforeunload
