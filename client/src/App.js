import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import GlobalState from './context/GlobalState'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <GlobalState>
      <Router>
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
          <Route path='/*' component={Dashboard} />
        </Switch>
      </Router>
    </GlobalState>
  )
}
export default App
