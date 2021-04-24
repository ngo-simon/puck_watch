import React from 'react';
import Navbar from './Navbar'
import Home from './Home'
import TeamStats from './Teams/TeamStats'
import PlayerProfile from './PlayerProfile'
import Standings from './Standings/Standings'
import About from './About'
import Teams from './Teams/Teams'
import Search from './Search/Search'
import Leaders from './Leaders/Leaders'
import Compare from './Compare/Compare'

import {
  Switch, Route,
  useRouteMatch,
} from "react-router-dom"

const Main = () => {
  const match = useRouteMatch('/teams/:id')
  const team_id = match ? match.params.id : null
  const match2 = useRouteMatch('/player/:id')
  const player_id = match2 ? match2.params.id : null
  return(
    <div>
      <Navbar />
      <Switch>
        <Route path="/player/:id">
          <PlayerProfile id={player_id} />
        </Route>
        <Route path="/teams/:id">
          <TeamStats id={team_id} />
        </Route>
        <Route path="/teams">
          <Teams />
        </Route>
        <Route path="/standings">
          <Standings />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/leaders">
          <Leaders />
        </Route>
        <Route path="/compare">
          <Compare />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default Main