import React  from 'react';
import { useSelector} from 'react-redux'
import LeaderTableGroup from './LeaderTableGroup'
import {scoring_values, physical_values, time_values, goalie_values} from '../headers'

const Leaders = () => {
  let player_array = useSelector(state => state.player.player_ids.filter(player => player.stats !== {}))
  let team_info = []
  team_info = useSelector(state => state.teams.teams)

  if (team_info.length === 0 || player_array.length === 0){
    return null
  }

  return (
    <div style={{textAlign:"center"}}>
      <h1>Leaders</h1>
      <LeaderTableGroup title={'Scoring'} col_array={scoring_values} player_array={player_array} team_info={team_info}/>
      <LeaderTableGroup title={'Physical'} col_array={physical_values} player_array={player_array} team_info={team_info}/>
      <LeaderTableGroup title={'Time'} col_array={time_values} player_array={player_array} team_info={team_info}/>
      <LeaderTableGroup title={'Goalies'} col_array={goalie_values} player_array={player_array} team_info={team_info}/>
    </div>
  )
}


export default Leaders