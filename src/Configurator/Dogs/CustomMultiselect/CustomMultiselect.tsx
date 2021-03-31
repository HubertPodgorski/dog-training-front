import React from 'react'
import styles from './CustomMultiselect.module.scss'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { SelectOption } from '../../../types'
import useSelector from '../../../hooks/useSelector'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import { Block, Warning, CheckCircleOutline } from '@material-ui/icons'

interface Props {
  options: SelectOption[]
  selectedValues: string[]
  selectLabel: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void
}

const CustomMultiselect = ({ options, selectedValues, selectLabel, onChange }: Props) => {
  const { selectedEvent } = useSelector((s) => s.tasksStore)

  const sortOptionsByDogAvailability = () => {
    if (selectedEvent) {
      return options.sort(({ id: idA }, { id: idB }) => {
        const dogAOnEvent = selectedEvent.dogs.find(({ dog }) => dog.id === idA)
        const dogBOnEvent = selectedEvent.dogs.find(({ dog }) => dog.id === idB)

        if (!dogAOnEvent && !dogBOnEvent) {
          return 0
        }

        if (!dogAOnEvent && dogBOnEvent && dogBOnEvent.status === 'present') {
          return 1
        }

        if (
          dogAOnEvent &&
          dogAOnEvent.status !== 'present' &&
          dogBOnEvent &&
          dogBOnEvent.status === 'present'
        ) {
          return 1
        }

        return -1
      })
    }

    return options
  }

  return (
    <FormControl className={styles.multiselect}>
      <InputLabel htmlFor='name-disabled'>{selectLabel}</InputLabel>

      <Select
        value={selectedValues}
        onChange={(e) => onChange(e.target.value)}
        name={selectLabel}
        multiple
        renderValue={(value) =>
          (value as string[]).map((dogId, index) => {
            const dogFound = options.find(({ id }) => id === dogId)

            if (!dogFound) {
              return ''
            }

            return `${dogFound.name}${index + 1 !== (value as string[]).length ? ', ' : ''}`
          })
        }
      >
        {sortOptionsByDogAvailability().map((option: SelectOption) => {
          const dogOnEvent =
            selectedEvent && selectedEvent.dogs.find(({ dog }) => dog.id === option.id)

          return (
            <MenuItem key={option.id} value={option.id}>
              <ListItemText primary={option.name} />

              {!selectedEvent && 'Wybierz wydarzenie'}

              {dogOnEvent && (
                <ListItemIcon>
                  {dogOnEvent.status !== 'present' ? (
                    <>
                      {dogOnEvent.status === 'notPresent' && <Block />}
                      {dogOnEvent.status === 'untouched' && <Warning />}
                    </>
                  ) : (
                    <CheckCircleOutline />
                  )}
                </ListItemIcon>
              )}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default CustomMultiselect
