import extraService from '../services/extraService'

const homeReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_HOME':
      return action.data
    default: return state
  }
}

export const initializeStandings = () => {
  return async dispatch => {
    const standings = await extraService.getStandings()
    dispatch({
      type: 'INIT_HOME',
      data: standings
    })
  }
}


export default homeReducer