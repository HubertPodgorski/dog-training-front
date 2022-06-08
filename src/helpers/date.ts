import { Event } from '../queries/calendarQueries'
import { format, isBefore } from 'date-fns'
import { pl } from 'date-fns/locale'

export const sortByDateDesc = (eventA: Event, eventB: Event) => {
  const dateBefore = isBefore(new Date(eventA.date), new Date(eventB.date))

  if (dateBefore) {
    return 1
  }

  return -1
}

export const formatDate = (date: string) => format(new Date(date), 'dd/MM/yy', { locale: pl })
export const formatTime = (time: string) => format(new Date(time), 'HH:mm', { locale: pl })
export const getDayOfWeek = (date: string) => format(new Date(date), 'eeee', { locale: pl })
