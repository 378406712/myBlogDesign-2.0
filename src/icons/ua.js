// import Vue from 'vue'
// import IconSvg from '@/components/icon-svg'

// Vue.component('svg-icon', IconSvg)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./svg', false, /\.svg$/)
// requireAll(req)
import Vue from 'vue'
import IconSvg from '@/components/icon-svg'// svg component

// register globally
Vue.component('ua-icon', IconSvg)

const req = require.context('./svg/uas', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
