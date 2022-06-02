import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import NavBar from './components/nav-bar'

import Main from './layout/main'
import Login from './layout/login'
import UsersMain from './layout/users-main'

function App() {
  return <>
    <div className="container">
      <BrowserRouter>
        <NavBar />

        <Switch>
          <Route path='/' exact render={(props) => <Main {...props} />} />
          <Route path='/login' render={(props) => <Login {...props} />} />
          <Route path='/users/:userId?' render={(props) => <UsersMain {...props} />} />
        </Switch>

      </BrowserRouter>
    </div>
  </>
}

export default App
