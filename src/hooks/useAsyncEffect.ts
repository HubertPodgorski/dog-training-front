/* eslint-disable no-console */
import { useEffect, DependencyList } from 'react'
import { CancelledError } from './useCancellableWhen'

const useAsyncEffect = (
  asyncFunction: () => Promise<void | (() => void)>,
  deps?: DependencyList,
) => {
  useEffect(() => {
    let shouldClear = false
    let clearCallback: void | (() => void)

    const maybeClear = () => {
      if (clearCallback && shouldClear) {
        clearCallback()
      }
    }

    Promise.resolve(asyncFunction())
      .then((clear) => {
        clearCallback = clear
        maybeClear()
      })
      .catch((error: any) => {
        if (error instanceof CancelledError) {
          console.debug(error)
          return
        }

        // TODO: make it better
        console.error('useAsyncEffect', error)
      })

    return () => {
      shouldClear = true
      maybeClear()
    }
  }, deps)
}

export default useAsyncEffect
