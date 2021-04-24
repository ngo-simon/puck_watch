import React from 'react';
import BarGraph from './BarGraph';

let xLabels = ["TOI/G", "5v5TOI/G", "PPTOI/G", "SHTOI/G"]
let title = "Time Graph"

function TimeGraph({ width, height, data }){
  
  return (
    <div className="StatChart" style={{display: 'inline-block', verticalAlign: 'text-top'}}>
      <BarGraph width={width} height={height} data={data} xLabels={xLabels} title={title}/>
    </div>
  )
}

export default TimeGraph;