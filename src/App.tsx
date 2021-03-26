import React from 'react'
import styles from './App.module.scss'
import '@atlaskit/css-reset'
import Router from './Router'

const App = () => {
  return (
    <section className={styles.wrapper}>
      <Router />
    </section>
  )
}

export default App
