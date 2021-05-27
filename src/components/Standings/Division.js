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
import {standings_headers} from '../headers'

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

const Divison = ({div, name}) => {
  return (
    <div style={{display: 'inline-block', verticalAlign: 'text-top'}}>
      <h3>{name}</h3>
       <TableContainer component={Paper}>
       <ThemeProvider theme={theme}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell ><b></b></TableCell>
              <TableCell style={teamNameStyle}><b>Team</b></TableCell>
              {standings_headers.map(header => 
                <TableCell key={header}><b>{header}</b></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {div.map(team => <StandingsRow team={team} key={team.team.id}></StandingsRow>)}
          </TableBody>
        </Table>
        </ThemeProvider>
      </TableContainer>
    </div>
  )
}

export default Divison