import axios from 'axios'
function CategoryCount(essay) {
  return axios.post('/api/edit/category-count', essay)
}
function BatchDeleteCategory(key) {
  return axios.post('/api/category/BatchDeleteCategory', key)
}
export { CategoryCount, BatchDeleteCategory }
