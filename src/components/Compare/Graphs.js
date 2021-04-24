import React from 'react';

import GraphLegend from './GraphLegend';
import CompareGraph from './CompareGraph';
import PPGraph from './PPGraph';
import TimeGraph from './TimeGraph';
import GoalieGraph from './GoalieGraph';
import GoaliePercentGraph from './GoaliePercentGraph';

let StandardGraphHeaders = [
  {
    title: 'GP',
    field: 'games'
  },
  {
    title: 'G',
    field: 'goals'
  },
  {
    title: 'A',
    field: 'assists'
  },
  {
    title: 'P',
    field: 'points'
  },
  {
    title: 'PIM',
    field: 'pim'
  },
  {
    title: '+/-',
    field: 'plusMinus'
  },
  {
    title: 'Shot%',
    field: 'shotPct'
  },
  {
    title: 'Blocked',
    field: 'blocked'
  },
  {
    title: 'Hits',
    field: 'hits'
  }
]

let PPGraphHeaders = [
  {
    title: 'PPG',
    field: 'powerPlayGoals'
  },
  {
    title: 'PPP',
    field: 'powerPlayPoints'
  },
  {
    title: 'SHG',
    field: 'shortHandedGoals'
  },
  {
    title: 'SHP',
    field: 'shortHandedPoints'
  }
]


let AvgTimeHeaders = [
  {
    title: 'TOI/G',
    field: 'timeOnIcePerGame'
  },
  {
    title: '5v5TOI/G',
    field: 'evenTimeOnIcePerGame'
  },
  {
    title: 'PPTOI/G',
    field: 'powerPlayTimeOnIcePerGame'
  },
  {
    title: 'SHTOI/G',
    field: 'shortHandedTimeOnIcePerGame'
  }
  
]

let GoalieHeaders = [
  {
    title: 'GP',
    field: 'games'
  },
  {
    title: 'Starts',
    field: 'gamesStarted'
  },
  {
    title: 'W',
    field: 'wins'
  },
  {
    title: 'L',
    field: 'losses'
  },
  {
    title: 'OT',
    field: 'ot'
  },
  {
    title: 'SO',
    field: 'shutouts'
  },
  {
    title: 'GAA',
    field: 'goalAgainstAverage'
  }
  
]

let GoalPercentHeaders = [
  {
    title: 'SV%',
    field: 'savePercentage'
  },
  {
    title: '5v5SV%',
    field: 'evenStrengthSavePercentage'
  },
  {
    title: 'SHSV%',
    field: 'shortHandedSavePercentage'
  },
  {
    title: 'PPSV%',
    field: 'powerPlaySavePercentage'
  }
  
]

const minute_convert = (time) => {
  let split = time.split(':')
  return parseInt(split[0])
}

const combine_data = (p1, p2, headers) => {
  let combined = []

  headers.forEach(h => {
    let stat1 = p1.stats[h.field]
    let stat2 = p2.stats[h.field]
    if(h.field === 'savePercentage'){
      stat1 = stat1*100
      stat2 = stat2*100
    }
    if ((typeof stat1) === 'string') {
      if (stat1.includes(':')) {
        stat1 = minute_convert(stat1)
        stat2= minute_convert(stat2)
      }
    }
    
    combined = combined.concat({header: h.title, p1: stat1, p2: stat2})
  })

  return combined
}

const Graphs = ({p1, p2}) => {
  let p_type = p1.stats.hasOwnProperty('saves')
  return (
    <div>
      <GraphLegend width={300} height={100} data={[p1.name, p2.name]} />
      {p_type ? 
      <div>
        <GoalieGraph width={1000} height={400} data={combine_data(p1, p2, GoalieHeaders)}/>
        <GoaliePercentGraph width={460} height={400} data={combine_data(p1, p2, GoalPercentHeaders)}/>
      </div>
      :
      <div>
        <CompareGraph width={1200} height={400} data={combine_data(p1, p2, StandardGraphHeaders)}/>
        <div style={{textAlign:"center"}}>
          <div style={{ overflow: 'hidden' }}>
            <PPGraph width={460} height={400} data={combine_data(p1, p2, PPGraphHeaders)}/>
            <TimeGraph width={460} height={400} data={combine_data(p1, p2, AvgTimeHeaders)}/>
          </div>
        </div>
      </div>
      }
      
    </div>
  )
  
  
}

export default Graphs