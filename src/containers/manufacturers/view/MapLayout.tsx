import React, { Fragment, useRef, useCallback } from 'react'
import { Manufacturer } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { GoogleMap, Marker } from '@react-google-maps/api'
// import MapStyles from 'components/MapStyles'

interface Props {
  manufacturer: Manufacturer
}

const mapContainerStyle = {
  width: '100%',
  height: '80vh'
}

const center = {
  lat: 6.700071,
  lng: -1.630783
}

const options = {
  // styles: MapStyles,
  disableDefaultUI: false,
  zoomControl: true
}

const MapMarker: React.FC<Props> = (props) => {
  const { manufacturer } = props

  const position = {
    lat: manufacturer.coordinates.lat,
    lng: manufacturer.coordinates.lng
  }

  return <Marker position={position} title={manufacturer.name} />
}

const MapLayout: React.FC<Props> = (props) => {
  const { manufacturer } = props
  const mapRef = useRef()

  const onLoadMap = useCallback((map) => {
    mapRef.current = map
  }, [])

  return (
    <Fragment>
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
              <MapMarker manufacturer={manufacturer} />
            </GoogleMap>
          </div>
          <hr className="m-0 mb-2" />
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default MapLayout
