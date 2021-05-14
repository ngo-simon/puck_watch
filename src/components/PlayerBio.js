import React from 'react';

const PlayerBio = ({pic, bio}) => {
  return(
    <div style={{ overflow: 'hidden'}}>
      <h1>{bio.fullName} #{bio.primaryNumber}</h1>
      <div style={{ display: 'inline-block', marginRight: '10px'}}>
        <img src={'data:image/jpeg;base64, '.concat(pic)} alt='player'/>
      </div>
      <div style={{ display: 'inline-block', textAlign:'left'}}>
        <p>Age: {bio.currentAge}</p>
        <p>Position: {bio.primaryPosition.name}, {bio.primaryPosition.name === 'Goalie' ? 'Catches' : 'Shoots'}: {bio.shootsCatches}</p>
        <p>Team: {bio.currentTeam.name}</p>
        <p>Height: {bio.height}, Weight: {bio.weight}lbs</p>
        <p>Born: {bio.birthCity}, {bio.birthStateProvince} -- {bio.birthCountry}</p>
      </div>
    </div>
  )
}

export default PlayerBio