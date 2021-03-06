import Vue from 'vue'
import Vuex from 'vuex'
import homepage from './modules/homepage'
import app from './modules/app'
import user from './modules/user'
import tabsview from './modules/tabsview'
import language from './modules/language'
import permission from './modules/permission'
import account from './modules/user/account'
import edit from './modules/edit'
import category from './modules/essay/category'
import settings from './modules/settings'
import essay from './modules/essay/essay'
import dashboard from './modules/dashboard'
import indexpage from './front/indexpage'
import bokepage from './front/bokepage'
import archive from './front/archive'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    homepage,
    dashboard,
    app,
    tabsview,
    language,
    permission,
    account,
    edit,
    category,
    settings,
    essay,

    indexpage,
    bokepage,
    archive
  }
})
