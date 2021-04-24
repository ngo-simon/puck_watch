import React from 'react'
import { sortForwards, sortDefensemen, sortGoalies } from '../../reducers/teamReducer'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
import PlayerRow from './PlayerRow'

const convertTime = (strTime) => {
  if (strTime === 0){
    return 0
  } else {
    const splitTime = strTime.split(':')
    return parseFloat(splitTime[0]) +  parseFloat(splitTime[1])/100
  }
}

const handleSort = (players, dispatch, field, player_type) => {
  let time_fields = ['timeOnIce', 'timeOnIcePerGame', 'powerPlayTimeOnIce']
  let sortedPlayers = null
  if (time_fields.includes(field)){
    sortedPlayers  = players.sort((a,b) => convertTime(a[field]) < convertTime(b[field]))
  } else {
    sortedPlayers = players.sort((a,b) => a[field] < (b[field]))
  }
  if (player_type === 'F'){
    dispatch(sortForwards(sortedPlayers))
  } else if (player_type === 'D'){
    dispatch(sortDefensemen(sortedPlayers))
  } else {
    dispatch(sortGoalies(sortedPlayers))
  }
}

const PlayerTable = ({players, headers, dispatch, adv, player_type}) => {
  return(
    <TableContainer style={ adv ? { width: 1500, margin: 'auto' } : { width: 800, margin: 'auto' }} component={Paper}>
      <Table aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell><b>#</b></TableCell>
            <TableCell><b>Player</b></TableCell>
            {headers.map(header => 
              <TableCell key={header.title}><b><div onClick={()=>handleSort(players, dispatch, header.field, player_type)}>{header.title}</div></b></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <PlayerRow player={player} headers={headers} key={player.id}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PlayerTable