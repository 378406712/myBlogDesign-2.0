import axios from 'axios'
function BatchDeleteCategory(key) {
  return axios.post('/api/category/BatchDeleteCategory', key)
}
function GetEssay(username) {
  return axios.get('/api/category/get-essay', username)
}

export { GetEssay, BatchDeleteCategory }
