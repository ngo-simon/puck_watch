import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SeasonRow from './SeasonRow'

const PlayerChart = ({stats, headers, adv}) => {
  return (
    <TableContainer style={ adv ? { width: 1500, margin: 'auto' } : { width: 800, margin: 'auto' }} component={Paper}>
      <Table aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Season</TableCell>
            <TableCell>League</TableCell>
            <TableCell>Team</TableCell>
            {headers.map(header => 
              <TableCell key={header.title}><b>{header.title}</b></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((split) => (
            <SeasonRow key={split.season.concat(split.league.name).concat(split.team.name)}split={split} headers={headers}/>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default PlayerChart