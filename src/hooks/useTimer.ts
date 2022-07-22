import { useState, useEffect, useCallback } from 'react'

export const useTimer = (startTime: number) => {
  const [time, setTime] = useState(startTime)
  const [intervalID, setIntervalID] = useState<any>(null)
  const hasTimerEnded = time <= 0
  const isTimerRunning = intervalID != null

  const update = useCallback(() => {
    setTime((time: number) => time - 1)
  }, [])

  const startTimer = useCallback(() => {
    if (!hasTimerEnded && !isTimerRunning) {
      setIntervalID(setInterval(update, 1000))
    }
  }, [hasTimerEnded, isTimerRunning, update])

  const stopTimer = useCallback(() => {
    clearInterval(intervalID)
    setIntervalID(null)
  }, [intervalID])

  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(intervalID)
      setIntervalID(null)
    }
  }, [hasTimerEnded, intervalID])

  useEffect(() => {
    clearInterval(intervalID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { time, startTimer, stopTimer }
}
