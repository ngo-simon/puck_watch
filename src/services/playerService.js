import axios from 'axios'
const baseUrl = 'https://statsapi.web.nhl.com/api/v1/'

const getPlayer = async (player_id) => {
  const playerPic = "https://nhl.bamcontent.com/images/headshots/current/168x168/".concat(player_id).concat('.jpg')
  const responsePic = await axios.get(playerPic, {
    responseType: 'arraybuffer'
  })
  .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  .catch(error => {
    console.log('fail')
  })
  const statsUrl = baseUrl.concat("people/").concat(player_id).concat("/stats?stats=yearByYear")
  const responseStats = await axios.get(statsUrl)
  const playoffStatsUrl = baseUrl.concat("people/").concat(player_id).concat("/stats?stats=yearByYearPlayoffs")
  const responsePlayoffStats = await axios.get(playoffStatsUrl)
  const bioUrl = baseUrl.concat("people/").concat(player_id)
  const responseBio = await axios.get(bioUrl)
  return {
    pic: responsePic,
    stats: responseStats.data.stats[0].splits,
    playoffs: responsePlayoffStats.data.stats[0].splits,
    bio: responseBio.data.people[0]
  }
}

const getAllPlayerIds = async () => {
  let playerIds = []
  let teamIds = []
  for (let p = 1; p<31; p++){
    if (p === 11 || p === 27){ //exluding non existant teams: thrashers, whalers etc
      continue
    }
    teamIds = teamIds.concat(p)
  }
  teamIds = teamIds.concat([52,53,54]) // including recent expansions
  for (const id of teamIds){
    let reqUrl = baseUrl.concat("teams/").concat(id).concat("?hydrate=roster(person(stats(splits=statsSingleSeason)))")
    let response = await axios.get(reqUrl)
    for (let j = 0; j < response.data.teams[0].roster.roster.length; j++){
      let player_stats = {}
      if (response.data.teams[0].roster.roster[j].person.stats[0].splits.length !== 0) {
        player_stats = response.data.teams[0].roster.roster[j].person.stats[0].splits[0].stat
      }
      playerIds = playerIds.concat(
        {
          id: String(response.data.teams[0].roster.roster[j].person.id),
          name: response.data.teams[0].roster.roster[j].person.fullName,
          team: String(id),
          stats: player_stats
        }
      )
    }
  }
  return playerIds
}
let playerService = { getPlayer, getAllPlayerIds }
export default playerService