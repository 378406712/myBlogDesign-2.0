import axios from 'axios'

function GetEssay(keywords) {
  return axios.get('/api/essay/get-essay', keywords)
}

function SearchEssay(keywords) {
  return axios.get('/api/essay/essay-search', keywords)
}
export { GetEssay, SearchEssay }
