import React from 'react';
import {
  useHistory
} from "react-router-dom"
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 200,
    display: 'inline-block',
    verticalAlign: 'text-top'
  },
  media: {
    height: 150,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});


const TeamCard = ({team}) => {
  const history = useHistory()
  const classes = useStyles()
  console.log(team)
  return (
    <Card className={classes.root} onClick={() => history.push(`/teams/${team.id}/`)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`data:image/svg+xml;utf8,${encodeURIComponent(team.logo)}`}
          title={team.fullName}
        />
        <CardContent>
          <Typography gutterBottom variant="body" align='left' component="h2">
            {team.locationName}
          </Typography>
          <Typography gutterBottom variant="body1" align='left' component="h2">
            {team.teamName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TeamCard