import axios from 'axios'
export function GetTodo(todo){
   return axios.post('/api/dashboard/get-todo',todo)
}
export function SetTodo(todo){
   return axios.post('/api/dashboard/set-todo',todo)
}
