import React from 'react';
import BarGraph from './BarGraph';

let xLabels = ["PPG", "PPP", "SHG", "SHP"]
let title = 'Special Teams Stats'

function PPGraph({ width, height, data }){
  
  return (
    <div className="PPchart" style={{display: 'inline-block', verticalAlign: 'text-top'}}>
      <BarGraph width={width} height={height} data={data} xLabels={xLabels} title={title}/>
    </div>
  )
}

export default PPGraph;