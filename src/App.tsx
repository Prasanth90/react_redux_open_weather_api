import React from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { darkKnight } from './themes/dark-knight'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WeatherView from './components/views/weather/WeatherView'
import './App.css'

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <ThemeProvider theme={darkKnight}>
          <CssBaseline />
          <Switch>
            <Route path="/" exact component={WeatherView} />
          </Switch>
        </ThemeProvider>
      </Router>
    )
  }
}
