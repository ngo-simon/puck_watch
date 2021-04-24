import React  from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {
  useHistory
} from "react-router-dom"

const LeaderRow = ({player,value, logo}) => {

  const history = useHistory()

  return(
    <TableRow>
      <TableCell
        component="th"
        scope="row" onClick={() => history.push(`/teams/${player.team}/`)} >
        <p><img alt='' verticalalign='sub' width="35px" src={`data:image/svg+xml;utf8,${encodeURIComponent(logo)}`}/></p>
      </TableCell>
      <TableCell onClick={() => history.push(`/player/${player.id}/`)}>{player.name}</TableCell>
      <TableCell>{player.stats[value]}</TableCell>
    </TableRow>
  )
}

export default LeaderRow