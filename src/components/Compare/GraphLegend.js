import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function GraphLegend({ width, height, data }){
  const ref = useRef();

  useEffect(() => {
    
    const svg = d3.select(ref.current)
      svg
      .attr("width", width)
      .attr("height", height)
      .selectAll("text")
      .remove();
  }, [width, height]);

  useEffect(() => {
    const svg = d3.select(ref.current);

    var selection = svg.selectAll("text")
    selection
      .text('')

    svg.append("circle").attr("cx",50).attr("cy", 50).attr("r", 6).style("fill", "blue")
    svg.append("circle").attr("cx",50).attr("cy",80).attr("r", 6).style("fill", "red")
    svg.append("text").attr("x", 70).attr("y", 55).text(data[0]).style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 70).attr("y", 85).text(data[1]).style("font-size", "15px").attr("alignment-baseline","middle")
  }, [data]);

  return (
    <div className="legend">
      <svg ref={ref}>
      </svg>
    </div>
      
  )

}

export default GraphLegend;