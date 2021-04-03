import React from 'react'
import Fab from '@material-ui/core/Fab'
import { routePaths } from '../../../Router'
import { useHistory } from 'react-router-dom'
import { AccessTime } from '@material-ui/icons'

const StatisticsButton = () => {
  const history = useHistory()

  return (
    <Fab color='primary' aria-label='time' onClick={() => history.push(routePaths.statistics)}>
      <AccessTime />
    </Fab>
  )
}

export default StatisticsButton
