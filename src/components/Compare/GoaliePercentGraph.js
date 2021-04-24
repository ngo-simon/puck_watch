import React from 'react';
import BarGraph from './BarGraph';

let xLabels = ['SV%',"5v5SV%", "SHSV%", "PPSV%"]
let title = "Percentage Graph"

function GoalieGraph({ width, height, data }){
  
  return (
    <div className="StatChart">
      <BarGraph width={width} height={height} data={data} xLabels={xLabels} title={title}/>
    </div>
  )
}

export default GoalieGraph;