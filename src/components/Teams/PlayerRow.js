import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import {
  useHistory
} from "react-router-dom"

const NonNullCell = (data, key) => {
  let cellValue = data
  if (data === undefined){
    cellValue = '-'
  } else if (data.toString().length > 5 && (typeof data !== 'string')){
    cellValue = data.toFixed(3)
  }
  return(
    <TableCell key={key}>{cellValue}</TableCell>
  )
}

const nameStyle = {
  cursor: 'pointer'
}

const PlayerRow = ({player, headers}) => {
  const history = useHistory()
  return(
    <TableRow>
      <TableCell>{player.jerseyNumber}</TableCell>
      <TableCell style={nameStyle} onClick={() => history.push(`/player/${player.id}/`)}>{player.name}</TableCell>
      {headers.map(h => NonNullCell(player[h.field], h.field))}
    </TableRow>
  )
}

export default PlayerRow