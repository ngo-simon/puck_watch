import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import StandingsRow from './StandingsRow'

const customColumnStyle2 = {
  maxWidth: "50px"
};

const Divison = ({div, name, headers, team_info}) => {
  return (
    <div style={{display: 'inline-block', verticalAlign: 'text-top'}}>
      <h3>{name}</h3>
       <TableContainer style={{ width: 500}} component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow >
              {headers.map(header => 
                <TableCell style={customColumnStyle2} key={header.title}><b>{header.title}</b></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {div.map(team => <StandingsRow team={team} team_info={team_info} key={team.team.id}></StandingsRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Divison