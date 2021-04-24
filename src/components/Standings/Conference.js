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

const Conference = ({div1, div2, name, headers, team_info}) => {
  let mergedConf = (div1.concat(div2)).sort((a,b) => a.points < b.points)
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
            {mergedConf.map(team => <StandingsRow team={team} team_info={team_info} ></StandingsRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Conference