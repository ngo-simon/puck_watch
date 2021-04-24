import { makeStyles } from '@material-ui/core/styles';
import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector} from 'react-redux'
import { 
  setPlayer
} from '../reducers/playerReducer'

const tableHeaders = [
  {
    title: 'Season',
    field: 'season'
  },
  {
    title: 'League',
    field: 'leagueName'
  },
  {
    title: 'Team',
    field: 'teamName'
  },
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
    title: 'Shifts',
    field: 'shifts'
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
    title: 'Season',
    field: 'season'
  },
  {
    title: 'Team',
    field: 'teamName'
  },
  {
    title: 'League',
    field: 'leagueName'
  },
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



const PlayerBio = (pic, bio) => {
  return(
    <div style={{textAlign:"center"}}>
      <img src={'data:image/jpeg;base64, '.concat(pic)} alt='player'/>
      <h1>{bio.fullName} #{bio.primaryNumber}</h1>
      <p>Position: {bio.primaryPosition.name}, {bio.primaryPosition.name === 'Goalie' ? 'Catches' : 'Shoots'}: {bio.shootsCatches}</p>
      <p>Team: {bio.currentTeam.name}</p>
      <p>Height: {bio.height}, Weight: {bio.weight}lbs</p>
      <p>Born: {bio.birthCity}, {bio.birthStateProvince} {bio.birthCountry}</p>
      <p>Age: {bio.currentAge}</p>
    </div>
  )
}

const NonNullCell = (data) => {
  let cellValue = data
  if (data === undefined){
    cellValue = '-'
  }
  return(
    <TableCell>{cellValue}</TableCell>
  )
}

const shortenLeague = (league) => {
  if (league === 'National Hockey League'){
    return 'NHL'
  } else {
    return league
  }
}

const morePlayerStats = (split, adv) => {
  if (!adv){
    return null
  }
  return(
    <React.Fragment>
      {NonNullCell(split.stat.timeOnIce)}
      {NonNullCell(split.stat.shifts)}
      {NonNullCell(split.stat.shotPct)}
      {NonNullCell(split.stat.faceOffPct)}
      {NonNullCell(split.stat.powerPlayGoals)}
      {NonNullCell(split.stat.powerPlayPoints)}
      {NonNullCell(split.stat.powerPlayTimeOnIce)}
      {NonNullCell(split.stat.gameWinningGoals)}
    </React.Fragment>
  )
}

const moreGoalieStats = (split, adv) => {
  if (!adv){
    return null
  }
  return(
    <React.Fragment>
      {NonNullCell(split.stat.goalsAgainst)}
      {NonNullCell(split.stat.powerPlaySavePercentage ? ((split.stat.powerPlaySavePercentage / 100).toFixed(3)) : '-')}
      {NonNullCell(split.stat.shortHandedSavePercentage ? ((split.stat.shortHandedSavePercentage / 100).toFixed(3)) : '-')}
      {NonNullCell(split.stat.evenStrengthSavePercentage ? (split.stat.evenStrengthSavePercentage / 100).toFixed(3) : '-')}
    </React.Fragment>
  )
}

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
    <TableContainer style={ adv ? { width: 1500, margin: 'auto' } : { width: 800, margin: 'auto' }} component={Paper}>
      <Table aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            {headers.map(header => 
              <TableCell key={header.title}><b>{header.title}</b></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {position !== 'Goalie' ? (stats.map((split, i) => (
            <TableRow key={i}>
              <TableCell>{[split.season.slice(0, 4), '-', split.season.slice(4)].join('')}</TableCell>
              <TableCell>{shortenLeague(split.league.name)}</TableCell>
              {NonNullCell(split.team.name)}
              {NonNullCell(split.stat.games)}
              {NonNullCell(split.stat.goals)}
              {NonNullCell(split.stat.assists)}
              {NonNullCell(split.stat.points)}
              {NonNullCell(split.stat.pim)}
              {NonNullCell(split.stat.plusMinus)}
              {morePlayerStats(split, adv)}
            </TableRow>
            ))) :
            (stats.map((split, i) => (
              <TableRow key={i}>
                <TableCell>{[split.season.slice(0, 4), '-', split.season.slice(4)].join('')}</TableCell>
                <TableCell>{shortenLeague(split.league.name)}</TableCell>
                {NonNullCell(split.team.name)}
                {NonNullCell(split.stat.games)}
                {NonNullCell(split.stat.wins)}
                {NonNullCell(split.stat.losses)}
                {NonNullCell(split.stat.shutouts)}
                {NonNullCell(split.stat.savePercentage ? split.stat.savePercentage.toFixed(3) : '-')}
                {NonNullCell(split.stat.goalAgainstAverage ? split.stat.goalAgainstAverage.toFixed(2) : '-')}
                {NonNullCell(split.stat.saves)}
                {moreGoalieStats(split, adv)}
              </TableRow>
            )))
          }
        </TableBody>
      </Table>
    </TableContainer>
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
    careerStats = careerStats.filter(split => shortenLeague(split.league.name) === 'NHL')
    playoffStats = playoffStats.filter(split => shortenLeague(split.league.name) === 'NHL')
  }
  return(
    <div style={{textAlign:"center"}}> 
      {PlayerBio(player.pic, player.bio)}
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