import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Territory } from 'classes'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import territoryActions from 'redux/terrirtories/actions'
import Map from './Map'

const { getTerritoryRequest, setQueryParams, setActiveLink, clearStates } =
  territoryActions

const MapView = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.territories)
  const [territories, setTerritories] = useState<Territory[]>([])
  const mapRef = useRef<any>()
  const layoutStore = Selector((state) => state.layout)
  const [mode, setMode] = useState(layoutStore.mode)

  useEffect(() => {
    const { params } = store
    params.region = 2 // set to Ashanti region
    params.query = ''
    dispatch(setQueryParams(params))
    dispatch(getTerritoryRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('map'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { territories } = store
    setTerritories(territories)
    setMode(layoutStore.mode)
  }, [store, layoutStore])

  // const panTo = useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng })
  //   mapRef.current.setZoom(8)
  // }, [])

  const onLoadMap = useCallback((map) => {
    mapRef.current = map
  }, [])

  // const onLoadMarker = useCallback(
  //   (territory: Territory) => {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         panTo({
  //           lat: territory.coordinates.lat,
  //           lng: territory.coordinates.lng
  //         })
  //       },
  //       () => null
  //     )
  //   },
  //   [panTo]
  // )

  return (
    <Map
      mapRef={mapRef}
      mode={mode}
      onLoadMap={onLoadMap}
      territories={territories}
    />
  )
}

export default MapView
