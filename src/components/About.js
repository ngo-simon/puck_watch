import React from 'react';

const About = () => {
  return(
    <div style={{marginLeft:"auto", marginRight:"auto", display: "table"}}>
      <h1>About This Project</h1>
      <p>Puck Watch is a NHL stats tool created by myself (Simon Ngo) during quarantine in 2020-2021 when the NHL season was suspended. <br />
      The site was inspired by my incessant searching and comparison of NHL stats throughout the season. I decided to create a website that tracks it all in one place.
      </p>
      <p></p>
      
      <h2>This project used:</h2>
      <div style={{textAlign:"left"}}>
        <ul>
          <li><a href="https://reactjs.org/">React JS</a></li>
          <li><a href="https://redux.js.org/">Redux</a></li>
          <li><a href="https://www.npmjs.com/package/axios">Axios</a></li>
          <li><a href="https://d3js.org/">D3.js - Data-Driven Documents</a></li>
          <li><a href="https://github.com/dword4/nhlapi">NHL API Documentation</a></li>
          <li><a href="https://material-ui.com/">Material-UI</a></li>
        </ul>
        <div>
          <h2>Images and Icons</h2>
          <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div>Icons made by <a href="https://creativemarket.com/Becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div>Team logos from https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/(team_id).svg</div>
          <div>Player photos from http://nhl.bamcontent.com/images/headshots/current/168x168/(player_id).jpg</div>
        </div> 
      </div>
      <h2>Personal Links</h2>
      <a href="https://github.com/ngo-simon">Github</a>
      
    </div>
  )
}

export default About