import React  from 'react';
import { useSelector} from 'react-redux'
import LeaderTableGroup from './LeaderTableGroup'

let scoring_values = [
  {
    title:'Goals',
    value:'goals',
  },
  {
    title:'Assists',
    value:'assists',
  },
  {
    title:'Points',
    value:'points',
  },
  {
    title:'+/-',
    value:'plusMinus',
  }
]

let physical_values = [
  {
    title:'Hits',
    value:'hits',
  },
  {
    title:'Blocked',
    value:'blocked',
  },
  {
    title:'PIM',
    value:'pim',
  }
]

let time_values = [
  {
    title:'TOI',
    value:'evenTimeOnIce',
  },
  {
    title:'PPTOI',
    value:'powerPlayTimeOnIce',
  },
  {
    title:'TOI/G',
    value:'timeOnIcePerGame',
  }
]

let goalie_values = [
  {
    title:'GAA',
    value:'goalAgainstAverage',
  },
  {
    title:'SV%',
    value:'savePercentage',
  }
]

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