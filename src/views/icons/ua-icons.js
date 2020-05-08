const req = require.context('../../icons/svg/uas', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys()
const re = /\.\/(.*)\.svg/

const uaIcons = requireAll(req).map((i) => {
  return i.match(re)[1]
})
  export default uaIcons
