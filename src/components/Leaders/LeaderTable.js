import React  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import LeaderRow from './LeaderRow'

const convertTime = (strTime) => {
  if (strTime === 0){
    return 0
  } else {
    const splitTime = strTime.split(':')
    return parseFloat(splitTime[0]) +  parseFloat(splitTime[1])/100
  }
}

const LeaderTable = ({player_array, colName, value, team_info}) => {
  if (player_array.length !== 0 && team_info.length !== 0){
    let arr = player_array.filter(player => value in player.stats)
    let time_fields = ['evenTimeOnIce', 'powerPlayTimeOnIce', 'timeOnIcePerGame']
    
    // remove outliers
    arr = arr.filter(g => g.stats.games > 5)

    if (time_fields.includes(value)){
      //filter goalies
      arr = arr.filter(player => player.stats.hasOwnProperty('goals'))
      arr = arr.sort((a,b) => convertTime(b.stats[value]) - convertTime(a.stats[value])).slice(0,10)
    } else {
      if (value === 'goalAgainstAverage'){
        arr = arr.sort((a,b) => a.stats[value] - b.stats[value]).slice(0,10)
      } else {
        arr = arr.sort((a,b) => b.stats[value] - a.stats[value]).slice(0,10)
      }
    }
    return(
      <div style={{display: 'inline-block', verticalAlign: 'text-top'}}>
        <TableContainer style={{width: 300, margin: 'auto' }} component={Paper} >
          <Table aria-label="simple table" size='small'>
            <TableHead>
              <TableRow>
                <TableCell><b>Team</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>{colName}</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arr.map((player, i) => (
                <LeaderRow player={player} i={i} value={value} logo={team_info.find(t => t.id === player.team).logo} key={i}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
  
}

export default LeaderTable