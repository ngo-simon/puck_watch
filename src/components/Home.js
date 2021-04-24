import React from 'react';
import {
  useHistory
} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet'

//icons
import searchIcon from './icons/loupe.svg'
import trophyIcon from './icons/trophy.svg'
import jerseyIcon from './icons/jersey.svg'
import statsIcon from './icons/statistics.svg'
import aboutIcon from './icons/question.svg'
import compareIcon from './icons/compare.svg'
import player from './icons/player.png'

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 345,
    display: 'inline-block',
    verticalAlign: 'text-top'
  },
  media: {
    height: '30%',
    width: '30%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop:'20px'
  },
});

const MediaCard = (classes, title, desc, history, pathing, image) => {
  return (
    <Card className={classes.root} onClick={()=>{history.push(`/${pathing}`)}}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={image}
          title={desc}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// add icon to helmet
const Home = () => {
  const history = useHistory()
  const classes = useStyles()
  return(
    <div style={{textAlign:"center"}}>
      <Helmet>
        <title>{ 'Puck Watch' }</title>
      </Helmet>
      <img src={player} alt=""></img>
      <h1>Puck Watch</h1>
      <div style={{ overflow: 'hidden', paddingTop:75 }}>
        {MediaCard(classes, 'Teams', 'View Team Stats', history, 'teams', jerseyIcon)}
        {MediaCard(classes, 'Standings', 'View The Current Standings', history, 'standings', trophyIcon)}
        {MediaCard(classes, 'Search', 'Search For NHL Players', history, 'search', searchIcon)}
      </div>
      {MediaCard(classes, 'Leaders', 'View League Leaders', history, 'leaders', statsIcon)}
      {MediaCard(classes, 'Compare', 'Compare Player Stats', history, 'compare', compareIcon)}
      {MediaCard(classes, 'About', 'Learn About This Project', history,'about', aboutIcon)}
    </div>
  )
}

export default Home