import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector} from 'react-redux'
import { 
  setPlayer
} from '../reducers/playerReducer'
import PlayerBio from './PlayerBio'
import PlayerChart from './PlayerChart'

const tableHeaders = [
  {
    title: 'GP',
    field: 'games'
  },
  {
    title: 'G',
    field: 'goals'
  },
  {
    title: 'A',
    field: 'assists'
  },
  {
    title: 'P',
    field: 'points'
  },
  {
    title: 'PIM',
    field: 'pim'
  },
  {
    title: '+/-',
    field: 'plusMinus'
  }
]
const extraHeaders = [
  {
    title: 'TOI',
    field: 'timeOnIce'
  },
  {
    title: 'Hits',
    field: 'hits'
  },
  {
    title: 'Shot%',
    field: 'shotPct'
  },
  {
    title: 'FO%',
    field: 'faceOffPct'
  },
  {
    title: 'PPG',
    field: 'powerPlayGoals'
  },
  {
    title: 'PPP',
    field: 'powerPlayPoints'
  },
  {
    title: 'PPTOI',
    field: 'powerPlayTimeOnIce'
  },
  {
    title: 'GWG',
    field: 'gameWinningGoals'
  },
]

const goalieHeaders = [
  {
    title: 'GP',
    field: 'games'
  },
  {
    title: 'W',
    field: 'wins'
  },
  {
    title: 'L',
    field: 'losses'
  },
  {
    title: 'SO',
    field: 'shutouts'
  },
  {
    title: 'S%',
    field: 'savePercentage'
  },
  {
    title: 'GAA',
    field: 'goalAgainstAverage'
  },
  {
    title: 'Saves',
    field: 'saves'
  }
]

const extraGoalieHeaders = [
  {
    title: 'GA',
    field: 'goalsAgainst'
  },
  {
    title: 'PPS%',
    field: 'powerPlaySavePercentage'
  },
  {
    title: 'SHS%',
    field: 'shortHandedSavePercentage'
  },
  {
    title: 'ES%',
    field: 'evenStrengthSavePercentage'
  },

]

const useStyles = makeStyles({
  root: {
    justifyContent: "center"
  },
  table: {
    paddingRight: '10px'
  }
});


const PlayerStats = (stats, position, adv, classes) => {
  let headers = []
  if (position === 'Goalie') {
    headers = goalieHeaders
    if (adv) {
      headers = headers.concat(extraGoalieHeaders)
    }
  } else {
    headers = tableHeaders
    if (adv) {
      headers = headers.concat(extraHeaders)
    }
  }
  return (
    <PlayerChart stats={stats} headers={headers} adv={adv}/>

  )
}

const PlayerProfile = ({ id }) => {
  const [advancedStats, setAdvancedStats] = useState(false)
  const [NHLonly, setNHLonly] = useState(false)
  const classes = useStyles();
  const dispatch = useDispatch()
  const player = useSelector(state => state.player.player)
  if (player === undefined  || player.bio === undefined || player.bio.id !== parseInt(id)){
    dispatch(setPlayer(id))
    return null
  }
  let interStats = player.stats.filter(split => ['Olympics', 'WC-A', 'WJC-A', 'WJC-18', 'WCup', 'WJ18-A', 'WC', 'WJC-20', 'OGQ', 'International', 'EHT', 'OG'].indexOf(split.league.name) > -1)
  let careerStats = player.stats.filter(split => !interStats.includes(split))
  let playoffStats = player.playoffs

  if (NHLonly){
    careerStats = careerStats.filter(split => split.league.name === 'National Hockey League')
    playoffStats = playoffStats.filter(split => split.league.name === 'National Hockey League')
  }

  return(
    <div style={{textAlign:"center"}}> 
      <PlayerBio pic={player.pic} bio={player.bio}/>
      <FormGroup row className={classes.root}>
        <FormControlLabel
          control={
            <Switch 
              checked={NHLonly}
              onChange={() => setNHLonly(!NHLonly)}
              name="nhl only" 
            />
          }
          label="NHL Only"
        />
        <FormControlLabel
          control={
            <Switch
              checked={advancedStats}
              onChange={() => setAdvancedStats(!advancedStats)}
              name="advanced"
              color="primary"
            />
          }
          label="Show Advanced Stats"
        />
      </FormGroup>
      <h1>Regular Season Stats</h1>
      {PlayerStats(careerStats, player.bio.primaryPosition.name, advancedStats, classes)}
      <h1>Playoff Stats</h1>
      {PlayerStats(playoffStats, player.bio.primaryPosition.name, advancedStats, classes)}
      <h1>International Stats</h1>
      {PlayerStats(interStats, player.bio.primaryPosition.name, advancedStats, classes)}
    </div>
  )
}

export default PlayerProfile