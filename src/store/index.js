import Vue from 'vue'
import Vuex from 'vuex'
import homepage from './modules/homepage'
import user from './modules/user'
import tabsview from './modules/tabsview'
import language from './modules/language'
import permission from './modules/permission'
import center from './modules/user/center'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    homepage,
    tabsview,
    language,
    permission,
    center
  }
})
