import axios from 'axios'
const baseUrl = 'https://statsapi.web.nhl.com/api/v1/'

const getTeamLogo = async (teamNumber) => {
  const reqUrl = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/".concat(teamNumber).concat('.svg')
  const response = await axios.get(reqUrl)
  return response.data
}

const getAllTeams = async () => {
  let teamIds = []
  const reqUrl = baseUrl.concat("teams/")
  const response = await axios.get(reqUrl)
  for (const team of response.data.teams){
    if(team.id === 55){continue}
    const teamPic = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/".concat(team.id).concat('.svg')
    const responsePic = await axios.get(teamPic)
    teamIds = teamIds.concat({
      id: String(team.id),
      fullName: team.name,
      locationName: team.locationName,
      teamName: team.teamName,
      logo: responsePic.data
    })
  }
  return teamIds
}

const getTeamRoster = async (teamId) => {
  const reqUrl = baseUrl.concat("teams/").concat(teamId).concat("?hydrate=roster(person(stats(splits=statsSingleSeason)))")
  const response = await axios.get(reqUrl)
  const full_roster = response.data.teams[0].roster
  const team_id = response.data.teams[0].id
  const forwards = full_roster.roster.filter(player => player.position.type === 'Forward')
  const defensemen = full_roster.roster.filter(player => player.position.type === 'Defenseman')
  const goalies = full_roster.roster.filter(player => player.position.type === 'Goalie')
  return {
    id: team_id,
    forwards: forwards,
    defensemen: defensemen,
    goalies: goalies
  }
}

let teamService =  { getTeamLogo, getAllTeams, getTeamRoster }
export default teamService