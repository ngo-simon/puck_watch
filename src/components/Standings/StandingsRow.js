import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {
  useHistory
} from "react-router-dom"

const teamNameStyle = {
  minWidth: "100px",
  cursor: 'pointer'
}

const logoStyle = {
  maxWidth: "45px",
  cursor: 'pointer'
}

const customColumnStyle2 = {
  maxWidth: "45px",
}

const StandingsRow = ({team, team_info}) => {
  const history = useHistory()
  const team_bio = team_info.find(t => parseInt(t.id) === team.team.id)
  return (
    <>
      <TableRow>
        <TableCell style={logoStyle}
                  component="th"
                  scope="row" onClick={() => history.push(`/teams/${team.team.id}/`)} >
          <p><img alt='' verticalalign='sub' width="40px" src={`data:image/svg+xml;utf8,${encodeURIComponent(team_bio.logo)}`}/></p>
        </TableCell>
        <TableCell style={teamNameStyle} onClick={() => history.push(`/teams/${team.team.id}/`)}>{team_bio.teamName} </TableCell>
        <TableCell style={customColumnStyle2}>{team.gamesPlayed}</TableCell>
        <TableCell style={customColumnStyle2}>{team.leagueRecord.wins}</TableCell>
        <TableCell style={customColumnStyle2}>{team.leagueRecord.losses}</TableCell>
        <TableCell style={customColumnStyle2}>{team.leagueRecord.ot}</TableCell>
        <TableCell style={customColumnStyle2}>{team.points}</TableCell>
        <TableCell style={customColumnStyle2}>{team.streak.streakCode}</TableCell>
      </TableRow>
    </>
  )
}

export default StandingsRow