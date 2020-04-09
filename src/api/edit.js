import axios from 'axios'

function PostEssay(essay) {
  return axios.post('/api/edit/post-new', essay)
}
function SetCategory(category) {
  return axios.post('/api/edit/set-category', category)
}
function ChangeMedia(single_media) {
  return axios.post('/api/edit/change-media', single_media)
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

export {
  PostEssay,
  SetCategory,
  GetCategory,
  GetMedia,
  MediaDetail,
  ChangeMedia,
  GetDate,
  SearchMedia
}
