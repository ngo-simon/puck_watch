import React, {useState} from 'react';
import { useSelector} from 'react-redux'
import { fade, makeStyles} from '@material-ui/core/styles';
import {
  useHistory
} from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Graphs from './Graphs';
import {tableHeaders, extraHeaders, goalieHeaders, extraGoalieHeaders} from '../headers'


const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    display: 'inline-block',
    minWidth: 500,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    minWidth: 500,
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    }
  }
}))


const playerTable = (player, headers, history, k) => {
  return(
    <TableRow key={k}>
      <TableCell onClick={() => history.push(`/player/${player.id}/`)}>{player.name}</TableCell>
      {headers.map(h => <TableCell key={h.field}>{player.stats[h.field]}</TableCell>)}
    </TableRow>
  )
}

const checkType = (p1, p2, advancedStats) => {

  let headers = []
  if (p1 === null && p2 === null){
    return null
  }
  if (Object.keys(p1.stats) === 0 || Object.keys(p1.stats) === 0) {
    return []
  }
  if (p1.stats.hasOwnProperty('goals') && p2.stats.hasOwnProperty('goals')){ //both skaters
    headers = tableHeaders
    if (advancedStats) {
      headers = headers.concat(extraHeaders)
    }
    return headers
  } else if (!p1.stats.hasOwnProperty('goals') && !p2.stats.hasOwnProperty('goals')) { //both goalies
    headers = goalieHeaders
    if (advancedStats) {
      headers = headers.concat(extraGoalieHeaders)
    }
    return headers
  } else { //player type mismatch
    return []
  }
}

const TableComp = (p1, p2, history, advFunc, advancedStats) => {
  if (p1 === null || p2 === null){
    return null
  }
  let headers = checkType(p1, p2, advancedStats)
  if (headers.length === 0) {
    return (
      <div>Player Type Mismatch</div>
    )
  } else {
    return(
      <div>
        <Button variant="contained" color="primary" onClick = {advFunc}>
          Show Advanced Stats
        </Button>
        <TableContainer style={ advancedStats ? { width: 1500, margin: 'auto' } : { width: 800, margin: 'auto' }} component={Paper}>
          <Table aria-label="simple table" size='small'>
            <TableHead>
              <TableRow key={'k'}>
                <TableCell><b>Name</b></TableCell>
                {headers.map(h => <TableCell key={h.title}><b>{h.title}</b></TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {playerTable(p1, headers, history, 1)}
              {playerTable(p2, headers, history, 2)}
            </TableBody>
          </Table>
        </TableContainer>
        <Graphs p1={p1} p2={p2}/>
      </div>
    )
  }

  
}
// clear button
const Compare = () => {
  const [playerName1, setPlayerName1] = useState('')
  const [playerName2, setPlayerName2] = useState('')
  const [p1, setP1] = useState(null)
  const [p2, setP2] = useState(null)
  const [advancedStats, setAdvancedStats] = useState(false)

  const history = useHistory()
  const classes = useStyles()

  let player_ids = useSelector(state => state.player.player_ids.filter(player => player.stats !== {}))

  const handleNameChangeAuto = (event, values) => {
    setPlayerName1(values)
  }

  const handleNameChange = (event) => {
    setPlayerName1(event.target.value)
  }
  const handleNameChangeAuto2 = (event, values) => {
    setPlayerName2(values)
  }

  const handleNameChange2 = (event) => {
    setPlayerName2(event.target.value)
  }

  const setPlayers = (event) => {
    event.preventDefault()
    let player_selected1 = player_ids.find(player => (player.name.toUpperCase() === playerName1.toUpperCase()))
    let player_selected2 = player_ids.find(player => (player.name.toUpperCase() === playerName2.toUpperCase()))
    if (player_selected1 && player_selected2) {
      setP1(player_selected1)
      setP2(player_selected2)
    } else {
      console.log('error')
    }
  }

  return(
    <div style={{textAlign:"center"}}>
      <h1>Compare Players</h1>
      <form onSubmit={setPlayers}>
        <div>
          <Autocomplete
            id="search-player"
            freeSolo
            className={classes.search}
            options={player_ids.map(player => player.name.toUpperCase())}
            onChange={handleNameChangeAuto}
            style={{ width: 300 }}
            classes={{inputRoot: classes.inputRoot}}
            renderInput={(playerName) => (
              <div>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <TextField {...playerName} id="playerSearch" value={playerName} InputProps={{...playerName.InputProps, disableUnderline: true}} onChange={handleNameChange} label="" style={{ width: 300 }} className={classes.inputInput} />
              </div>
            )}>
          </Autocomplete>
          <Autocomplete
            id="search-player2"
            freeSolo
            className={classes.search}
            options={player_ids.map(player => player.name.toUpperCase())}
            onChange={handleNameChangeAuto2}
            style={{ width: 300 }}
            classes={{inputRoot: classes.inputRoot}}
            renderInput={(playerName) => (
              <div>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <TextField {...playerName} id="playerSearch2" value={playerName} InputProps={{...playerName.InputProps, disableUnderline: true}} onChange={handleNameChange2} label="" style={{ width: 300 }} className={classes.inputInput} />
              </div>
            )}>
          </Autocomplete>
        </div>
        <div style={{paddingTop:25}}>
          <Button variant="contained" color="primary" type="submit">
            Compare
          </Button>
        </div>
      </form>
      {TableComp(p1, p2, history, () => setAdvancedStats(!advancedStats), advancedStats)}
    </div>
  )
}

export default Compare