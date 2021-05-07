import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {
  useHistory
} from "react-router-dom"

const teamNameStyle = {
  maxWidth: "100px",
  cursor: 'pointer'
}

const StandingsRow = ({team, team_info}) => {
  const history = useHistory()
  const team_bio = team_info.find(t => parseInt(t.id) === team.team.id)
  return (
    <>
      <TableRow>
        <TableCell
                  component="th"
                  scope="row" onClick={() => history.push(`/teams/${team.team.id}/`)} >
          <p><img alt='' verticalalign='sub' width="40px" src={`data:image/svg+xml;utf8,${encodeURIComponent(team_bio.logo)}`}/></p>
        </TableCell>
        <TableCell style={teamNameStyle} onClick={() => history.push(`/teams/${team.team.id}/`)}>{team_bio.teamName} </TableCell>
        <TableCell align='center'>{team.gamesPlayed}</TableCell>
        <TableCell align='center'>{team.leagueRecord.wins}</TableCell>
        <TableCell align='center'>{team.leagueRecord.losses}</TableCell>
        <TableCell align='center'>{team.leagueRecord.ot}</TableCell>
        <TableCell align='center'>{team.points}</TableCell>
        <TableCell align='center'>{team.streak.streakCode}</TableCell>
      </TableRow>
    </>
  )
}

export default StandingsRow