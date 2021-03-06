import axios from 'axios'

function GetEssay(keywords) {
  return axios.get('/api/essay/get-essay', keywords)
}
function GetTrashEssay(keywords){
  return axios.get('/api/essay/get-trash-essay',keywords)
}
function GetCategory(category) {
  return axios.get('/api/edit/get-category', category)
}
function SearchEssay(keywords) {
  return axios.get('/api/essay/essay-search', keywords)
}
function FilterEssay(keywords) {
  return axios.get('/api/essay/essay-filter', keywords)
}
function BatchDeleteEssay(key) {
  return axios.post('/api/essay/BatchDeleteEssay', key)
}
function BatchTrashEssay(key) {
  return axios.post('/api/essay/BatchTrashEssay', key)
}
function EssayDate(key) {
  return axios.get('/api/essay/essay-date', key)
}

export {
  GetEssay,
  GetTrashEssay,
  SearchEssay,
  BatchDeleteEssay,
  BatchTrashEssay,
  EssayDate,
  GetCategory,
  FilterEssay,
}
