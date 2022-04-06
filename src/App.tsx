import React from 'react'
import styles from './App.module.scss'
import '@atlaskit/css-reset'
import Router from './Router'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <section className={styles.wrapper}>
        <Router />

        <div className={styles.version}>v1.0.0</div>
      </section>
    </MuiPickersUtilsProvider>
  )
}

export default App
