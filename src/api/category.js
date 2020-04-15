import axios from 'axios'
function CategoryCount(essay) {
    return axios.post('/api/edit/category-count', essay)
  }
export {CategoryCount}
