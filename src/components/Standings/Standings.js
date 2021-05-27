import React, {useState} from 'react';
import { useSelector } from 'react-redux'

import Conference from './Conference'
import Divison from './Division'
import Button from '@material-ui/core/Button'

const standingsChart = (conferenceView, standings) => {
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
    let eastConf, westConf = []
    eastConf = (east.concat(north)).sort((a,b) => a.points < b.points)
    westConf = (west.concat(central)).sort((a,b) => a.points < b.points)
    return(
      <div style={{ overflow: 'hidden' }}>
        <Conference div={westConf} name={'Western'} />
        <Conference div={eastConf} name={'Eastern'} />
      </div>
    )
  }else {
    // division names changed for covid season
    return(
      <div style={{ overflow: 'hidden' }}>
        <Divison div={west} name={'Honda West'} />
        <Divison div={central} name={'Discover Central'} />
        <Divison div={east} name={'MassMutual East'} />
        <Divison div={north} name={'Scotia North'} />
      </div>
    )
  }
}

const Standings = () => {
  const [conferenceView, setConferenceView] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('Conference')
  const standings = useSelector(state => state.standings)

  if(standings.length === 0){
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
      {standingsChart(conferenceView, standings)}
    </div>
  )
}

export default Standings