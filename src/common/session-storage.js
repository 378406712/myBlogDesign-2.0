function saveToLocal(key, value) {
  let personal = window.sessionStorage.__personal__
  if (!personal) {
    personal = {}
  } else {
    personal = JSON.parse(personal)
  }
  personal[key] = value
  window.sessionStorage.__personal__ = JSON.stringify(personal)
}

function loadFromLocal(key, def) {
  let personal = window.sessionStorage.__personal__
  if (!personal) {
    return def
  }
  personal = JSON.parse(personal)
  if (!personal) {
    return def
  }
  let result = personal[key]
  return result || def
}

export { saveToLocal, loadFromLocal }