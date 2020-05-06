import axios from 'axios'
function GetEssay(keywords) {
  return axios.get('/api/edit/get-essay-new', keywords)
}
function PostEssay(essay) {
  return axios.post('/api/edit/post-new', essay)
}
function CategoryCount(essay) {
  return axios.post('/api/edit/category-count', essay)
}
function SetCategory(category) {
  return axios.post('/api/edit/set-category', category)
}
function ChangeMedia(single_media) {
  return axios.post('/api/edit/change-media', single_media)
}
function RemoveMedia(id) {
  return axios.post('/api/edit/media-remove', id)
}
function GetCategory(category) {
  return axios.get('/api/edit/get-category', category)
}
function GetMedia(username) {
  return axios.get('/api/edit/get-media', username)
}
function MediaDetail(detail) {
  return axios.get('/api/edit/media-detail', detail)
}
function GetDate(username) {
  return axios.get('/api/edit/media-date', username)
}
function SearchMedia(keywords) {
  return axios.get('/api/edit/media-search', keywords)
}
function SearchCategory(keywords) {
  return axios.get('/api/edit/category-search', keywords)
}
function CategoryCountAll(username) {
  return axios.post('/api/edit/category-count-all', username)
}

export {
  GetEssay,
  PostEssay,
  CategoryCount,
  SetCategory,
  GetCategory,
  GetMedia,
  MediaDetail,
  ChangeMedia,
  GetDate,
  SearchMedia,
  RemoveMedia,
  SearchCategory,
  CategoryCountAll
}
