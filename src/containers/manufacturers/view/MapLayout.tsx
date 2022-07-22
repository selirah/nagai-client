import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Manufacturer } from '@classes/index'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { MapStylesDarkMode } from '@components/MapStyles'
import { Selector } from '@redux/selector-dispatch'

interface Props {
  manufacturer: Manufacturer
  mode: string
  onClickMarker?: () => void
}

declare const google: any

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
}

const center = {
  lat: 6.700071,
  lng: -1.630783
}

const MapMarker: React.FC<Props> = (props) => {
  const { manufacturer, mode } = props
  const [toggleWindow, setToggleWindow] = useState(false)

  const position = {
    lat: manufacturer.coordinates.lat,
    lng: manufacturer.coordinates.lng
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
    anchor: new google.maps.Point(15, 15)
  }

  return (
    <Marker
      position={position}
      title={manufacturer.name}
      onClick={onClickMarker}
      icon={icon}
    >
      {toggleWindow ? (
        <MapInfoWindow
          manufacturer={manufacturer}
          onClickMarker={onClickMarker}
          mode={mode}
        />
      ) : null}
    </Marker>
  )
}

const MapInfoWindow: React.FC<Props> = (props) => {
  const { manufacturer, onClickMarker } = props

  const position = {
    lat: manufacturer.coordinates.lat,
    lng: manufacturer.coordinates.lng
  }

  return (
    <InfoWindow onCloseClick={onClickMarker} position={position}>
      <div id="iw-container">
        <div className="iw-title">{manufacturer.name.toUpperCase()}</div>
        <div className="iw-content">
          <div className="iw-subTitle">Contact</div>
          <p>
            {manufacturer.location}
            <br />
            <br />
            Phone. {manufacturer.phone}
            <br />
            e-mail: {manufacturer.email}
          </p>
        </div>
        <div className="iw-bottom-gradient"></div>
      </div>
    </InfoWindow>
  )
}

const MapLayout: React.FC<Props> = (props) => {
  const { manufacturer, mode } = props
  const store = Selector((state) => state.layout)
  const mapRef = useRef<any>()

  const options = {
    styles: store.mode === 'dark' ? MapStylesDarkMode : null,
    disableDefaultUI: false,
    zoomControl: false
  }

  const onLoadMap = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(14)
  }, [])

  const onLoadMarker = useCallback(
    (manufacturer: Manufacturer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          panTo({
            lat: manufacturer.coordinates.lat,
            lng: manufacturer.coordinates.lng
          })
        },
        () => null
      )
    },
    [panTo]
  )

  useEffect(() => {
    onLoadMarker(manufacturer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Address</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            onLoad={onLoadMap}
            options={options}
          >
            <MapMarker manufacturer={manufacturer} mode={mode} />
          </GoogleMap>
        </div>
        <hr className="m-0 mb-2" />
      </CardBody>
    </Card>
  )
}

export default MapLayout
