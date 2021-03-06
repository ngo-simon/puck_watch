import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTeam } from '../../reducers/teamReducer'
import Button from '@material-ui/core/Button'
import {tableHeaders, extraTeamHeaders, goalieHeaders, extraGoalieHeaders} from '../headers'

import PlayerTable from './PlayerTable'

const TeamHeader = (team_info, name) => {
  return(
    <div>
      <div>
        <img alt='' width="200px" src={`data:image/svg+xml;utf8,${encodeURIComponent(team_info.logo)}`} />
      </div>
      <h1>{name}</h1>
    </div>
  )
}

const format_skaters = (skater) => {
  //verifiy if skater already formatted
  if(skater.formatted){
    return skater
  }
  if (skater.person.stats[0].splits.length === 0 ){
    return {
      id: skater.person.id,
      jerseyNumber: skater.jerseyNumber,
      name: skater.person.fullName,
      games: 0,
      goals: 0,
      assists: 0,
      points: 0,
      pim: 0,
      plusMinus:0,
      timeOnIce:0,
      timeOnIcePerGame: 0,
      blocked: 0,
      hits: 0,
      shotPct:0,
      faceOffPct: 0,
      powerPlayGoals: 0,
      powerPlayPoints: 0,
      powerPlayTimeOnIce: 0,
      gameWinningGoals: 0,
      formatted: true
    }
  }
  let playerStats = skater.person.stats[0].splits[0].stat
  const formatted_skater = {
    id: skater.person.id,
    jerseyNumber: parseInt(skater.jerseyNumber),
    name: skater.person.fullName,
    games: playerStats.games,
    goals: playerStats.goals,
    assists: playerStats.assists,
    points: playerStats.points,
    pim: playerStats.pim,
    plusMinus: playerStats.plusMinus,
    timeOnIce: playerStats.timeOnIce,
    timeOnIcePerGame: playerStats.timeOnIcePerGame,
    blocked: playerStats.blocked,
    hits: playerStats.hits,
    shotPct: playerStats.shotPct,
    faceOffPct: playerStats.faceOffPct,
    powerPlayGoals: playerStats.powerPlayGoals,
    powerPlayPoints: playerStats.powerPlayPoints,
    powerPlayTimeOnIce: playerStats.powerPlayTimeOnIce,
    gameWinningGoals: playerStats.gameWinningGoals,
    formatted: true
  }
  return formatted_skater
}

const format_goalies = (goalie) => {
  if(goalie.formatted){
    return goalie
  }
  if (goalie.person.stats[0].splits.length === 0 ){
    return {
      id: goalie.person.id,
      jerseyNumber: goalie.jerseyNumber,
      name: goalie.person.fullName,
      games: 0,
      wins: 0,
      losses: 0,
      ties: 0,
      shutouts: 0,
      savePercentage:0,
      goalAgainstAverage:0,
      saves: 0,
      goalsAgainst: 0,
      powerPlaySavePercentage: 0,
      shortHandedSavePercentage: 0,
      evenStrengthSavePercentage: 0,
      formatted: true
    }
  }
  const formatted_goalie = {
    id: goalie.person.id,
    jerseyNumber: goalie.jerseyNumber,
    name: goalie.person.fullName,
    games: goalie.person.stats[0].splits[0].stat.games,
    wins: goalie.person.stats[0].splits[0].stat.wins,
    losses: goalie.person.stats[0].splits[0].stat.losses,
    ties: goalie.person.stats[0].splits[0].stat.ties,
    shutouts: goalie.person.stats[0].splits[0].stat.shutouts,
    savePercentage: goalie.person.stats[0].splits[0].stat.savePercentage,
    goalAgainstAverage: goalie.person.stats[0].splits[0].stat.goalAgainstAverage,
    saves: goalie.person.stats[0].splits[0].stat.saves,
    goalsAgainst: goalie.person.stats[0].splits[0].stat.goalsAgainst,
    powerPlaySavePercentage: goalie.person.stats[0].splits[0].stat.powerPlaySavePercentage,
    shortHandedSavePercentage: goalie.person.stats[0].splits[0].stat.shortHandedSavePercentage,
    evenStrengthSavePercentage: goalie.person.stats[0].splits[0].stat.evenStrengthSavePercentage,
    formatted: true
  }
  return formatted_goalie
}

const TeamStats = ({ id }) => {

  const team_roster = useSelector(state => state.teams.roster)
  const team_info = useSelector(state => state.teams.teams.find(team => team.id === id))
  const dispatch = useDispatch()

  const [advancedStats, setAdvancedStats] = useState(false)
  const [forwardHeaders, setForwardHeaders] = useState(tableHeaders)
  const [defenseHeaders, setDefenseHeaders] = useState(tableHeaders)
  const [goalHeaders, setGoalHeaders] = useState(goalieHeaders)

  if (team_roster === {} || team_roster.id !== parseInt(id) || team_info === undefined){
    dispatch(selectTeam(id))
    return null
  }
  
  let forwards = team_roster.forwards
  forwards = forwards.map(forward => format_skaters(forward))

  let defensemen = team_roster.defensemen
  defensemen = defensemen.map(dman => format_skaters(dman))

  let goalies = team_roster.goalies
  goalies = goalies.map(goalie => format_goalies(goalie))

  const changeAdvancedView = () => {
    setAdvancedStats(!advancedStats)
    if (!advancedStats){
      setForwardHeaders(tableHeaders.concat(extraTeamHeaders))
      setDefenseHeaders(tableHeaders.concat(extraTeamHeaders))
      setGoalHeaders(goalieHeaders.concat(extraGoalieHeaders))
    } else {
      setForwardHeaders(tableHeaders)
      setDefenseHeaders(tableHeaders)
      setGoalHeaders(goalieHeaders)
    }
    
  }

  return(
    <div style={{textAlign:"center"}}>
      {TeamHeader(team_info, team_info.fullName)}
      <Button variant="contained" color="primary" onClick ={() => changeAdvancedView()}>Show Advanced Stats</Button>
      <h2>Forwards</h2>
      <PlayerTable players={forwards} headers={forwardHeaders} dispatch={dispatch} adv={advancedStats} player_type={'F'}/>
      <h2>Defensemen</h2>
      <PlayerTable players={defensemen} headers={defenseHeaders} dispatch={dispatch} adv={advancedStats} player_type={'D'}/>
      <h2>Goalies</h2>
      <PlayerTable players={goalies} headers={goalHeaders} dispatch={dispatch} adv={advancedStats} player_type={'G'}/>
    </div>
  )
}

export default TeamStats