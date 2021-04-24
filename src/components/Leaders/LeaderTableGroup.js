import React  from 'react';
import LeaderTable from './LeaderTable'

const LeaderTableGroup = ({title, col_array, player_array, team_info}) => {
  return(
    <div style={{ overflow: 'hidden' }} key={title}>
      <h2>{title}</h2>
      {col_array.map((col) =>
        <LeaderTable player_array={player_array} colName={col.title} value={col.value} team_info={team_info} key={col.title}/>
      )}
    </div>
  )
}

export default LeaderTableGroup