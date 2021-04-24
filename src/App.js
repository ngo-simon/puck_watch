import React, { useEffect } from 'react';
import Main from './components/Main'
import { useDispatch } from 'react-redux'
import { 
  initializeTeams 
} from './reducers/teamReducer'
import {
  initializeStandings
} from './reducers/homeReducer'
import {
  initializeIds
} from './reducers/playerReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeStandings())
    dispatch(initializeTeams())
    dispatch(initializeIds())
  }, [dispatch])
  
  return (
    <Main />
  );
}

export default App;
