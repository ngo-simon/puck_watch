import React from 'react';
import Divider from '@material-ui/core/Divider';
import {
  Link,
} from "react-router-dom"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Equalizer from '@material-ui/icons/Equalizer';
import Help from '@material-ui/icons/Help';
import SyncAlt from '@material-ui/icons/SyncAlt';
import EmojiEvents from '@material-ui/icons/EmojiEvents';

const icon_help = (text) => {
  switch(text) {
    case 'Standings':
      return(<EmojiEvents />)
    case 'Compare':
      return(<SyncAlt />)
    case 'Leaders':
      return(<Equalizer />)
    case 'About':
      return(<Help />)
    default:
      return(
        <Help />
      )
  }
}

const NavBarTab = ({link, text}) => {
  return(
    <>
    <Divider />
      <Link to={link} style={{ textDecoration: 'none' }} key={text}>
        <ListItem button>
          <ListItemIcon>
            {icon_help(text)}
          </ListItemIcon> 
          <ListItemText primary={text}/>
        </ListItem>
      </Link>
    </>
  )
}

export default NavBarTab