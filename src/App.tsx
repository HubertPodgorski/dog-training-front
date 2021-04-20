import React from 'react'
import styles from './App.module.scss'
import '@atlaskit/css-reset'
import Router from './Router'

const App = () => {
  return (
    <section className={styles.wrapper}>
      <Router />

      <div className={styles.version}>v1.0.0</div>
    </section>
  )
}

export default App
