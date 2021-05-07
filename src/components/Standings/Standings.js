import React, {useState} from 'react';
import { useSelector} from 'react-redux'

import Conference from './Conference'
import Divison from './Division'
import Button from '@material-ui/core/Button'

const headers = [
  {title: 'GP'},
  {title: 'W'},
  {title: 'L'},
  {title: 'OTL'},
  {title: 'P'},
  {title: 'Strk'}
]


const showStandings = (conferenceView, standings, team_info) => {
  let east, west, north, central = {}
  for (let record in standings.records) {
    let name = standings.records[record].division.name
    let div_standings = standings.records[record].teamRecords
    if (name === 'MassMutual East'){
      east = div_standings
    } else if (name === 'Honda West'){
      west = div_standings
    } else if (name === 'Scotia North'){
      north = div_standings
    } else if (name === 'Discover Central'){
      central = div_standings
    } 
  }

  if (conferenceView){
    return(
      <div style={{ overflow: 'hidden' }}>
        <Conference div1={west} div2={central} name={'Western'} headers={headers} team_info={team_info}/>
        <Conference div1={north} div2={east} name={'Eastern'} headers={headers} team_info={team_info}/>
      </div>
    )
  }else {
    // division names changed for covid season
    return(
      <div style={{ overflow: 'hidden' }}>
        <Divison div={west} name={'Honda West'} headers={headers} team_info={team_info} />
        <Divison div={central} name={'Discover Central'} headers={headers} team_info={team_info}/>
        <Divison div={east} name={'MassMutual East'} headers={headers} team_info={team_info}/>
        <Divison div={north} name={'Scotia North'} headers={headers} team_info={team_info}/>
      </div>
    )
  }
}

const Standings = () => {
  const [conferenceView, setConferenceView] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('Conference')
  const standings = useSelector(state => state.standings)
  const team_info = useSelector(state => state.teams.teams)

  if(standings.length === 0 || team_info.length === 0){
    return(null)
  }

  const changeConferenceView = () => {
    setConferenceView(!conferenceView)
    if (conferenceView) {
      setButtonLabel('Conference')
    } else {
      setButtonLabel('Division')
    }
  }

  return(
    <div style={{textAlign:"center"}}>
      <h1>Standings</h1>
      <Button variant="contained" color="primary" onClick={() => changeConferenceView()}>
        {buttonLabel}
      </Button>
      {showStandings(conferenceView, standings, team_info)}
    </div>
  )
}

export default Standings