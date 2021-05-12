import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import NavBarTab from './NavBarTab'

import {
  Link,
  useHistory
} from "react-router-dom"
import { useSelector} from 'react-redux'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  homeIcon: {
    cursor: 'pointer'
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [playerName, setPlayerName] = useState('')

  useEffect(() => {
    if (!window.localStorage.getItem('players')){
      window.localStorage.setItem('players', JSON.stringify([]))
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory()
  const teams = useSelector(state => state.teams.teams.sort((a, b) => a.locationName > b.locationName))
  const player_ids = useSelector(state => state.player.player_ids)

  const handleNameChangeAuto = (event, values) => {
    setPlayerName(values)
  }

  const handleNameChange = (event) => {
    setPlayerName(event.target.value)
  }

  const searchPlayer = (event) => {
    event.preventDefault()
    let player_selected = player_ids.find(player => (player.name.toUpperCase() === playerName.toUpperCase()))
    let stored_players = JSON.parse(window.localStorage.getItem('players'))
    if (player_selected !== -1 && player_selected !== undefined){
      let newPlayer = {name: playerName.toUpperCase(), id: player_selected.id}
      if (stored_players.some(p => p.name === newPlayer.name) === false){
        let updated_list = stored_players.concat(newPlayer)
        window.localStorage.removeItem('players')
        window.localStorage.setItem('players', JSON.stringify(updated_list))
      }
      history.push('/player/'.concat(player_selected.id))
      setPlayerName('')
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.homeIcon} onClick={() => history.push('/')} variant="h6" noWrap>
            Puck Watch
          </Typography>
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
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>        
        <List>
          <NavBarTab link={'/standings'} text={'Standings'}/>
          <NavBarTab link={'/leaders'} text={'Leaders'}/>
          <NavBarTab link={'/compare'} text={'Compare'}/>
          <NavBarTab link={'/about'} text={'About'}/>
          <Divider />
          {teams.map(team => (
            <Link to={`/teams/${team.id}/`} style={{ textDecoration: 'none' }} key={team.id}>
              <ListItem button>
                <ListItemIcon>
                  <img width="50px" alt='' src={`data:image/svg+xml;utf8,${encodeURIComponent(team.logo)}`} />
                </ListItemIcon>
                <ListItemText primary={team.locationName} secondary={team.teamName.toUpperCase()}/>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

export default Navbar