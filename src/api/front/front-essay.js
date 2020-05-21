import axios from 'axios'

export function GetEssayList(keywords) {
  return axios.get('/api/essay/get-essay', keywords)
}

export function GetBokeEssay(keywords) {
  return axios.get('/api/indexpage/get-boke-essay', keywords)
}
export function setGuestComment(comments) {
  return axios.post('/api/indexpage/set-guest-comment', comments)
}
export function searchEssay(keywords) {
  return axios.get('/api/indexpage/search-essay', keywords)
}
