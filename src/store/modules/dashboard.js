import * as Api from '@/api/dashboard'
const dashboard = {
  state: {
    todoList: [
        { text: 'star this repository', done: false },
        { text: 'fork this repository', done: false },
        { text: 'follow author', done: false },
        { text: 'vue-element-admin', done: true },
        { text: 'vue', done: true },
        { text: 'element-ui', done: true },
        { text: 'axios', done: true },
        { text: 'webpack', done: true }
    ]
  },
  mutations: {
    setList(state, todo) {
    state.todoList = todo[0].todo
    }
  },
  actions: {
    SetListAll({ commit }, todo) {
      return new Promise((resolve, reject) => {
        Api.SetTodo(todo)
          .then((res) => {
            commit('setList',res.data)
            resolve()
          })
          .catch(() => reject())
      })
    }
  }
}

export default dashboard
