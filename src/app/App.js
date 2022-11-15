import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import NavBar from './components/ui/nav-bar'

import Main from './layout/main'
import Login from './layout/login'
import Users from './layout/users'

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <NavBar />

          <Switch>
            <Route path="/" exact render={(props) => <Main {...props} />} />
            <Route
              path="/login/:type?"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/users/:userId?/:edit?"
              render={(props) => <Users {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
