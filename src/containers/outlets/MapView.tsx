import { useRef, useCallback, useState, useEffect } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import Map from './Map'
import outletActions from '@redux/outlets/actions'
import { Outlet } from '@classes/index'
import { useDispatch } from 'react-redux'

const { getOutletsRequest, setQueryParams, clearStates, setActiveLink } =
  outletActions

const MapView = () => {
  const store = Selector((state) => state.outlets)
  const mapRef = useRef<any>()
  const layoutStore = Selector((state) => state.layout)
  const [mode, setMode] = useState(layoutStore.mode)
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    const { params } = store
    params.skip = 0
    params.query = ''
    params.territory = 0
    dispatch(setQueryParams(params))
    dispatch(getOutletsRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('map'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { outlets } = store
    setOutlets(outlets)
    setMode(layoutStore.mode)
  }, [store, layoutStore])

  const onLoadMap = useCallback((map) => {
    mapRef.current = map
  }, [])

  return (
    <Map mapRef={mapRef} mode={mode} onLoadMap={onLoadMap} outlets={outlets} />
  )
}

export default MapView
