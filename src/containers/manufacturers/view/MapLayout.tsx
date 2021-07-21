import React, {
  Fragment,
  useRef,
  useCallback,
  useState,
  useEffect
} from 'react'
import { Manufacturer } from 'classes'
import { Card, CardHeader, CardBody, CardTitle, Badge } from 'reactstrap'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { getInitials } from 'utils'
import { MapStylesDarkMode } from 'components/MapStyles'
import { Selector } from 'redux/selector-dispatch'

interface Props {
  manufacturer: Manufacturer
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
  const { manufacturer } = props
  const [toggleWindow, setToggleWindow] = useState(false)

  const position = {
    lat: manufacturer.coordinates.lat,
    lng: manufacturer.coordinates.lng
  }

  const onClickMarker = useCallback(() => {
    setToggleWindow(!toggleWindow)
  }, [toggleWindow])

  const icon = {
    url: require('assets/images/icons/location.png').default,
    scaledSize: new google.maps.Size(40, 40),
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

  const renderAvatar = (manufacturer: Manufacturer) => {
    if (manufacturer && manufacturer.logo) {
      return (
        <img
          className="img-fluid w-100 h-100"
          src={manufacturer.logo}
          style={{ objectFit: 'cover', borderRadius: '100%' }}
          alt="Card"
        />
      )
    } else {
      return (
        <div
          style={{ borderRadius: '100%' }}
          className={`d-flex w-100 h-100 font-size-xl justify-content-center align-items-center avatar-variant-lg bg-info text-white`}
        >
          {getInitials(manufacturer.name)}
        </div>
      )
    }
  }

  return (
    <InfoWindow onCloseClick={onClickMarker} position={position}>
      <Fragment>
        <div className="d-flex justify-content-center profile-image-wrapper mb-2">
          <div
            className="profile-image"
            style={{
              width: '100px',
              height: '100px',
              overflow: 'hidden'
            }}
          >
            {manufacturer ? renderAvatar(manufacturer) : ''}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Badge className="text-uppercase" color="info" pill>
            {manufacturer ? manufacturer.name.replace(/_/gi, ' ') : null}
          </Badge>
        </div>
      </Fragment>
    </InfoWindow>
  )
}

const MapLayout: React.FC<Props> = (props) => {
  const { manufacturer } = props
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
