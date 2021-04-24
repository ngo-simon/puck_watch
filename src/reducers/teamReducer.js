import teamService from '../services/teamService'
const initial_state = {teams: [], roster: {}}

const teamReducer = (state = initial_state, action) => {
  switch (action.type) {
    case 'SORT_PLAYERS_F':
      return {...state, roster:{...state.roster, forwards:action.data}}
    case 'SORT_PLAYERS_D':
      return {...state, roster:{...state.roster, defensemen:action.data}}
    case 'SORT_PLAYERS_G':
      return {...state, roster:{...state.roster, goalies:action.data}}
    case 'SELECT_TEAM':
      const included_roster = {...state, roster:action.data}
      return included_roster
    case 'INIT':
      return action.data
    default: return state
  }
}

export const initializeTeams = () => {
  return async dispatch => {
    const teams = await teamService.getAllTeams()
    const initialTeam = await teamService.getTeamRoster(1)
    const init_data = {teams: teams, roster: initialTeam}
    dispatch({
      type: 'INIT',
      data: init_data
    })
  }
}

export const sortForwards = (players) => {
  return {
    type: 'SORT_PLAYERS_F',
    data: players
  }
}

export const sortDefensemen = (players) => {
  return {
    type: 'SORT_PLAYERS_D',
    data: players
  }
}

export const sortGoalies = (players) => {
  return {
    type: 'SORT_PLAYERS_G',
    data: players
  }
}

export const selectTeam = (id) => {
  return async dispatch => {
    const teamRoster = await teamService.getTeamRoster(id)
    dispatch({
      type: 'SELECT_TEAM',
      data: teamRoster
    })
  }
}


export default teamReducer