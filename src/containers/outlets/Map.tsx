import React, { useState, useCallback } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { MapStylesDarkMode } from '@components/MapStyles'
import { Outlet } from '@classes/index'

const center = {
  lat: 6.700071,
  lng: -1.630783
}

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
}

interface MapProps {
  mode: string
  outlets: Outlet[]
  onLoadMap: (map: any) => void
  mapRef: any
}

interface Props {
  outlet: Outlet
  mode: string
  onClickMarker?: () => void
}

declare const google: any

const MapMarker: React.FC<Props> = (props) => {
  const { outlet, mode } = props
  const [toggleWindow, setToggleWindow] = useState(false)

  const position = {
    lat: parseFloat(outlet.coordinates.lat),
    lng: parseFloat(outlet.coordinates.lng)
  }

  const onClickMarker = useCallback(() => {
    setToggleWindow(!toggleWindow)
  }, [toggleWindow])

  const icon = {
    url:
      mode === 'dark'
        ? require('@assets/images/icons/greenMarker.png').default
        : require('@assets/images/icons/redMarker.png').default,
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 0)
  }

  return (
    <Marker
      position={position}
      title={outlet.outletName}
      onClick={onClickMarker}
      icon={icon}
    >
      {toggleWindow ? (
        <MapInfoWindow
          outlet={outlet}
          onClickMarker={onClickMarker}
          mode={mode}
        />
      ) : null}
    </Marker>
  )
}

const MapInfoWindow: React.FC<Props> = (props) => {
  const { outlet, onClickMarker } = props

  const position = {
    lat: parseFloat(outlet.coordinates.lat),
    lng: parseFloat(outlet.coordinates.lng)
  }

  return (
    <InfoWindow onCloseClick={onClickMarker} position={position}>
      <div id="iw-container">
        <div className="iw-title d-flex justify-content-between">
          <span>{outlet.outletName.toUpperCase()}</span>
        </div>
        <div className="iw-content">
          <div className="iw-subTitle">Locality</div>
          <p>{outlet.locality}</p>
          <div className="iw-subTitle">Sub-locality</div>
          <p>{outlet.subLocality}</p>
          <div className="iw-subTitle">Territory</div>
          <p>{outlet.territory.locality}</p>
          <div className="iw-subTitle">Landmark</div>
          <p>{outlet.landmark}</p>
        </div>
        <div className="iw-bottom-gradient"></div>
      </div>
    </InfoWindow>
  )
}

const Map: React.FC<MapProps> = (props) => {
  const { mode, outlets, onLoadMap, mapRef } = props

  const options = {
    styles: mode === 'dark' ? MapStylesDarkMode : null,
    disableDefaultUI: false,
    zoomControl: false
  }

  if (outlets.length && mapRef.current !== undefined) {
    let bounds: any = new google.maps.LatLngBounds()
    outlets.map((t) => {
      bounds.extend({
        lat: parseFloat(t.coordinates.lat),
        lng: parseFloat(t.coordinates.lng)
      })
      return bounds
    })
    mapRef.current.fitBounds(bounds)
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={8}
      onLoad={onLoadMap}
      options={options}
    >
      {outlets.length
        ? outlets.map((t) => <MapMarker key={t.id} outlet={t} mode={mode} />)
        : null}
    </GoogleMap>
  )
}

export default Map
