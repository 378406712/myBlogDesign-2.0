import axios from 'axios'
function CategoryCount(essay) {
  return axios.post('/api/edit/category-count', essay)
}
function BatchDeleteCategory(key) {
  return axios.post('/api/category/BatchDeleteCategory', key)
}
function GetEssay(username) {
  return axios.get('/api/category/get-essay', username)
}
export { CategoryCount, GetEssay, BatchDeleteCategory }
