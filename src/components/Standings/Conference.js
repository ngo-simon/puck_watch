import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';

import StandingsRow from './StandingsRow'

const teamNameStyle = {
  paddingRight: '20px',
  cursor: 'pointer',
}


const theme = createMuiTheme({
  overrides: {
      MuiTableCell: {
          root: { 
              padding: '2px 8px',
          },
      },
  },
});



const Conference = ({div1, div2, name, headers, team_info}) => {
  let mergedConf = (div1.concat(div2)).sort((a,b) => a.points < b.points)
  return (
    <div style={{display: 'inline-block', verticalAlign: 'text-top'}}>
      <h3>{name}</h3>
      <TableContainer  component={Paper}>
      <ThemeProvider theme={theme}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell ><b></b></TableCell>
            <TableCell style={teamNameStyle}><b>Team</b></TableCell>
            {headers.map(header => 
              <TableCell key={header.title}><b>{header.title}</b></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {mergedConf.map(team => <StandingsRow team={team} team_info={team_info} ></StandingsRow>)}
        </TableBody>
      </Table>
      </ThemeProvider>
      </TableContainer>
    </div>
  )
}

export default Conference