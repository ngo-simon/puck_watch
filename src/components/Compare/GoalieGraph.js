import React from 'react';
import BarGraph from './BarGraph';

let xLabels = ['GP', 'Starts', "W", "L", "OT", "SO", 'GAA']
let title = "Stats Graph"

function GoalieGraph({ width, height, data }){
  
  return (
    <div className="StatChart">
      <BarGraph width={width} height={height} data={data} xLabels={xLabels} title={title}/>
    </div>
  )
}

export default GoalieGraph;