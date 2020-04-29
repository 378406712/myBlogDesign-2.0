import axios from 'axios'
function BatchDeleteCategory(key) {
  return axios.post('/api/category/BatchDeleteCategory', key)
}
function GetCategory(category) {
  return axios.get('/api/edit/get-category', category)
}
function SetCategory(category) {
  return axios.post('/api/edit/set-category', category)
}
function GetCategoryDetail(id) {
  return axios.get('/api/category/get-categoryDetail', id)
}
function alterCategory(data) {
  return axios.post('/api/category/alter-category', data)
}

export {
  BatchDeleteCategory,
  GetCategory,
  SetCategory,
  GetCategoryDetail,
  alterCategory
}
