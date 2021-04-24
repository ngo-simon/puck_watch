import teamReducer from '../reducers/teamReducer'
import playerReducer from '../reducers/playerReducer'
import homeReducer from '../reducers/homeReducer'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  teams: teamReducer,
  standings: homeReducer,
  player: playerReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store