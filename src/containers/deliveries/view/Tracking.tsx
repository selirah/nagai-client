import React, { useCallback, useState, useEffect } from 'react'
import { Tracking } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { MapStylesDarkMode } from 'components/MapStyles'

const center = {
  lat: 6.700071,
  lng: -1.630783
}

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
}

interface Props {
  tracking: Tracking
  mode: string
  onClickMarker?: () => void
}

interface TrackingProps {
  tracking: Tracking
  mode: string
  onLoadMap: (map: any) => void
  mapRef: any
}

declare const google: any

const MapMarker: React.FC<Props> = (props) => {
  const { tracking, mode } = props
  const [toggleWindow, setToggleWindow] = useState(false)

  const position = {
    lat: parseFloat(tracking.outlet.coordinates.lat),
    lng: parseFloat(tracking.outlet.coordinates.lng)
  }

  const onClickMarker = useCallback(() => {
    setToggleWindow(!toggleWindow)
  }, [toggleWindow])

  const icon = {
    url:
      mode === 'dark'
        ? require('assets/images/icons/greenMarker.png').default
        : require('assets/images/icons/redMarker.png').default,
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 0)
  }

  return (
    <Marker
      position={position}
      title={tracking.outlet.outletName}
      onClick={onClickMarker}
      icon={icon}
    >
      {toggleWindow ? (
        <MapInfoWindow
          tracking={tracking}
          onClickMarker={onClickMarker}
          mode={mode}
        />
      ) : null}
    </Marker>
  )
}

const MapInfoWindow: React.FC<Props> = (props) => {
  const { tracking, onClickMarker } = props

  const position = {
    lat: parseFloat(tracking.outlet.coordinates.lat),
    lng: parseFloat(tracking.outlet.coordinates.lng)
  }

  return (
    <InfoWindow onCloseClick={onClickMarker} position={position}>
      <div id="iw-container">
        <div className="iw-title d-flex justify-content-between">
          <span>{tracking.outlet.outletName.toUpperCase()}</span>
        </div>
        <div className="iw-content">
          <div className="iw-subTitle">Locality</div>
          <p>{tracking.outlet.locality.toUpperCase()}</p>
          <div className="iw-subTitle">Sub-locality</div>
          <p>{tracking.outlet.subLocality.toUpperCase()}</p>
          <div className="iw-subTitle">Landmark</div>
          <p>{tracking.outlet.landmark}</p>
        </div>
        <div className="iw-bottom-gradient"></div>
      </div>
    </InfoWindow>
  )
}

const TrackingComponent: React.FC<TrackingProps> = (props) => {
  const { mode, tracking, onLoadMap, mapRef } = props
  const [dispatchPosition, setDispatchPosition] = useState<any>(null)

  const icon = {
    url:
      mode === 'dark'
        ? require('assets/images/icons/delivery-truck.png').default
        : require('assets/images/icons/delivery-truck.png').default,
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 0)
  }

  useEffect(() => {
    onLoadMarker(tracking)
    if (tracking.delivery.coordinates) {
      setDispatchPosition({
        lat: parseFloat(tracking.delivery.coordinates.lat),
        lng: parseFloat(tracking.delivery.coordinates.lng)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const panTo = useCallback(
    ({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng })
      mapRef.current.setZoom(14)
    },
    [mapRef]
  )

  const onLoadMarker = useCallback(
    (tracking: Tracking) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          panTo({
            lat: parseFloat(tracking.outlet.coordinates.lat),
            lng: parseFloat(tracking.outlet.coordinates.lng)
          })
        },
        () => null
      )
    },
    [panTo]
  )

  const options = {
    styles: mode === 'dark' ? MapStylesDarkMode : null,
    disableDefaultUI: false,
    zoomControl: false
  }

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Tracking on map</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={8}
            onLoad={onLoadMap}
            options={options}
          >
            <MapMarker tracking={tracking} mode={mode} />
            {dispatchPosition ? (
              <Marker
                position={dispatchPosition}
                title={`${tracking.delivery.dispatch.firstName.toUpperCase()} ${tracking.delivery.dispatch.lastName.toUpperCase()}`}
                icon={icon}
              />
            ) : null}
          </GoogleMap>
        </div>
      </CardBody>
    </Card>
  )
}

export default TrackingComponent
