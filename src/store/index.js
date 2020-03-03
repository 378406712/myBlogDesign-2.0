import Vue from 'vue'
import Vuex from 'vuex'
import center from './modules/center'
import user from './modules/user'
import tabsview from './modules/tabsview'
import language from './modules/language'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    center,
    tabsview,
    language,
    permission
  }
})