import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  useHistory
} from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import SearchedPlayer from './SearchedPlayer';

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
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'center',
  },
}))

const Search = () => {
  const [playerName, setPlayerName] = useState('')
  const [searched, setSearched] = useState([])

  useEffect(() => {
    let searchedNames = []
    if (!window.localStorage.getItem('players')){
      window.localStorage.setItem('players', JSON.stringify([]))
    } else {
      searchedNames = JSON.parse(window.localStorage.getItem('players'))
      setSearched(searchedNames)
    }
  }, []);
  
  const history = useHistory()
  const classes = useStyles()

  const player_ids = useSelector(state => state.player.player_ids)

  const clear_names = (event) => {
    setSearched([])
    window.localStorage.removeItem('players')
    window.localStorage.setItem('players', JSON.stringify([]))
  }

  const handleNameChangeAuto = (event, values) => {
    setPlayerName(values)
  }

  const handleNameChange = (event) => {
    setPlayerName(event.target.value)
  }

  const searchPlayer = (event) => {
    event.preventDefault()
    let player_selected = player_ids.find(player => (player.name.toUpperCase() === playerName.toUpperCase()))
    if (player_selected !== -1 && player_selected !== undefined){
      let newPlayer = {name: playerName.toUpperCase(), id: player_selected.id}
      if (searched.some(p => p.name === newPlayer.name) === false){
        let updated_list = searched.concat(newPlayer)
        window.localStorage.removeItem('players')
        setSearched(updated_list)
        window.localStorage.setItem('players', JSON.stringify(updated_list))
      }
      history.push('/player/'.concat(player_selected.id))
      setPlayerName('')
      
    }
  }

  return(
    <div>
      <div style={{textAlign:"center"}}>
        <h1>Search:</h1>
        <form onSubmit={searchPlayer}>
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
        </form>
        <h1>Recently Searched</h1>
        <Button variant="contained" color="primary" onClick={clear_names}>
          Clear
        </Button>
      </div>
      <div style={{paddingTop:50}}>
        <div style={{textAlign:"center", justifyContent:'center'}}>
          {searched.map((p, i) => 
            <div className={classes.root} key={i}>
              <SearchedPlayer name={p.name} id={p.id} />
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default Search