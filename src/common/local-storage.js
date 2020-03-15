function saveToLocal(key, value) {
  let vuelzw = window.localStorage.__vuelzw__
  if (!vuelzw) {
    vuelzw = {}
  } else {
    vuelzw = JSON.parse(vuelzw)
  }
  vuelzw[key] = value
  window.localStorage.__vuelzw__ = JSON.stringify(vuelzw)
}

function loadFromLocal(key, def) {
  let vuelzw = window.localStorage.__vuelzw__
  if (!vuelzw) {
    return def
  }
  vuelzw = JSON.parse(vuelzw)
  if (!vuelzw) {
    return def
  }
  let result = vuelzw[key]
  return result || def
}

export { saveToLocal, loadFromLocal }