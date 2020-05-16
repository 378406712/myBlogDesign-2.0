import Cookies from 'js-cookie'

const bgKey = 'bgKey'

function getBg() {
  return Cookies.get(bgKey)
}
function setBg(bg) {
  return Cookies.set(bgKey, bg)
}
function removeBg() {
  return Cookies.remove(bgKey)
}
export { getBg, setBg, removeBg }
