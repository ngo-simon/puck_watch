import React from 'react';
import { useSelector } from 'react-redux'

import TeamCard from './TeamCard'


const Teams = () => {
  const team_info = useSelector(state => state.teams.teams)
  
  if(team_info.length === 0){
    return(null)
  }

  return(
    <div style={{textAlign:"center"}}>
      <h1>Teams</h1>
      {team_info.map(team => <TeamCard team={team} key={team.id}/>)}
    </div>
  )
}

export default Teams