import playerService from '../services/playerService'
const initial_state = {player: {}, player_ids: []}

const playerReducer = (state = initial_state, action) => {
  switch (action.type) {
    case 'SET_PLAYER':
      return {...state, player: action.data}
    case 'INIT_IDS':
      return action.data
    default: return state
  }
}

export const setPlayer = (player_id) => {
  return async dispatch => {
    const player = await playerService.getPlayer(player_id)
    dispatch({
      type: 'SET_PLAYER',
      data: player
    })
  }
}

export const initializeIds = () => {
  return async dispatch => {
    const player_ids = await playerService.getAllPlayerIds()
    dispatch({
      type: 'INIT_IDS',
      data: {
        player: {},
        player_ids: player_ids
      }
    })
  }
}

export default playerReducer