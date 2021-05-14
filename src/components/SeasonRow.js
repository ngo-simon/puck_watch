import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

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

const shortenLeague = (league) => {
  if (league === 'National Hockey League'){
    return 'NHL'
  } else {
    return league
  }
}

const SeasonRow = ({split, headers}) => {
  return(
    <TableRow>
      <TableCell>{[split.season.slice(0, 4), '-', split.season.slice(4)].join('')}</TableCell>
      <TableCell>{shortenLeague(split.league.name)}</TableCell>
      <TableCell>{shortenLeague(split.team.name)}</TableCell>
      {headers.map(h => NonNullCell(split.stat[h.field], h.field))}
    </TableRow>
  )
} 

export default SeasonRow