import * as Api from '@/api/dashboard'
const dashboard = {
  state: {
    todoList: []
  },
  mutations: {
    setList(state, todo) {
      state.todoList = todo
      console.log(state.todoList)
    }
  },
  actions: {
    GetTodoList({ commit }, username) {
     return new Promise((resolve,reject)=>{
        Api.GetTodo(username).then((res) => {
           commit('setList', res.data[0].todo)
            resolve()
          }) .catch((e) => reject(e))
     })
    },
    SetListAll({ commit }, todo) {
      return new Promise((resolve, reject) => {
        Api.SetTodo(todo)
          .then((res) => {
            commit('setList', res.data.todo) 
            resolve(res)
          })
          .catch((e) => reject(e))
      })
    }
  }
}

export default dashboard
