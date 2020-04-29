import axios from 'axios'

export function GetEssay(keywords) {
  return axios.get('/api/essay/get-essay', keywords)
}
