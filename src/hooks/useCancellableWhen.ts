import { useEffect, useRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCancellableWhen = <T extends (...args: any[]) => any>(
  method: T,
  cancelPrevious: boolean, // change from false to true triggers the cancellation
): T => {
  const [[counter, lastCancelPrevious], setState] = useState<[number, boolean]>([0, false])

  const updatedCounter = counter + +(cancelPrevious && !lastCancelPrevious)
  if (cancelPrevious !== lastCancelPrevious) {
    // can't use useEffect, need to set it asap
    setState([updatedCounter, cancelPrevious])
  }

  const counterRef = useRef(0)
  counterRef.current = updatedCounter

  useEffect(
    () => () => {
      counterRef.current = NaN
    },
    [],
  )

  return ((...args) => {
    if (counterRef.current === updatedCounter) {
      return method(...args)
    }
    throw new CancelledError()
  }) as T
}

export default useCancellableWhen

export class CancelledError extends Error {
  constructor() {
    super('Cancelled callback')
  }
}
