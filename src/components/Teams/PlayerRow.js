import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import {
  useHistory
} from "react-router-dom"

const nameStyle = {
  cursor: 'pointer'
}

const PlayerRow = ({player, headers}) => {
  const history = useHistory()
  return(
    <TableRow>
      <TableCell>{player.jerseyNumber}</TableCell>
      <TableCell style={nameStyle} onClick={() => history.push(`/player/${player.id}/`)}>{player.name}</TableCell>
      {headers.map(h => <TableCell key={h.title.concat(player.id)}>{player[h.field]}</TableCell>)}
    </TableRow>
  )
}

export default PlayerRow