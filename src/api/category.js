import axios from 'axios'
function BatchDeleteCategory(key) {
  return axios.post('/api/category/BatchDeleteCategory', key)
}
function GetEssay(username) {
  return axios.get('/api/category/get-essay', username)
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

export {
  GetEssay,
  BatchDeleteCategory,
  GetCategory,
  SetCategory,
  GetCategoryDetail
}
