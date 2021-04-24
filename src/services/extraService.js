import axios from 'axios'
const baseUrl = 'https://statsapi.web.nhl.com/api/v1/'

const getStandings = async () => {
  const reqUrl = baseUrl.concat('standings?season=20202021')
  const response = await axios.get(reqUrl)
  return response.data
}
let extraService = { getStandings }
export default extraService