import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Territory } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from '@react-google-maps/api'
import { MapStylesDarkMode } from 'components/MapStyles'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import { AlertTriangle } from 'react-feather'
import utilsActions from 'redux/utils/actions'

const { googleDirectionRequest, clearStates } = utilsActions

const center = {
  lat: 6.700071,
  lng: -1.630783
}

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
}

const polylineOptions = {
  strokeColor: '#7367f0',
  strokeOpacity: 1,
  strokeWeight: 4
}

interface LocationProps {
  theme: string
  territory: Territory
}

interface Props {
  territory: Territory
  mode: string
  onClickMarker?: () => void
  onShowDirection: (territory: Territory) => void
}

declare const google: any

const MapMarker: React.FC<Props> = (props) => {
  const { territory, mode, onShowDirection } = props
  const [toggleWindow, setToggleWindow] = useState(false)

  const position = {
    lat: territory.coordinates.lat,
    lng: territory.coordinates.lng
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
      title={territory.locality}
      onClick={onClickMarker}
      icon={icon}
    >
      {toggleWindow ? (
        <MapInfoWindow
          territory={territory}
          onClickMarker={onClickMarker}
          mode={mode}
          onShowDirection={onShowDirection}
        />
      ) : null}
    </Marker>
  )
}

const MapInfoWindow: React.FC<Props> = (props) => {
  const { territory, onClickMarker, onShowDirection } = props

  const position = {
    lat: territory.coordinates.lat,
    lng: territory.coordinates.lng
  }

  return (
    <InfoWindow onCloseClick={onClickMarker} position={position}>
      <div id="iw-container">
        <div className="iw-title d-flex justify-content-between">
          <span>{territory.locality.toUpperCase()}</span>
          <small
            className="cursor-pointer"
            onClick={() => onShowDirection(territory)}
          >
            Get Direction
          </small>
        </div>
        <div className="iw-content">
          <div className="iw-subTitle">Region</div>
          <p>{territory.region.region}</p>
          <div className="iw-subTitle">Description</div>
          <p>{territory.description}</p>
          <div className="iw-subTitle">Number of Agents</div>
          <p>{territory.users.length}</p>
          <div className="iw-subTitle">Number of Outlets</div>
          <p>{territory.outlets.length}</p>
        </div>
        <div className="iw-bottom-gradient"></div>
      </div>
    </InfoWindow>
  )
}

const Location: React.FC<LocationProps> = (props) => {
  const { theme, territory } = props
  const dispatch: Dispatch = useDispatch()
  const mapRef = useRef<any>()
  const [myPosition, setMyPosition] = useState({
    lat: 6.700071,
    lng: -1.630783
  })
  const utils = Selector((state) => state.utils)
  const [direction, setDirection] = useState(utils.direction)

  const icon = {
    url:
      theme === 'dark'
        ? require('assets/images/icons/manMarkerDark.png').default
        : require('assets/images/icons/manMarkerLight.png').default,
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 0)
  }

  useEffect(() => {
    dispatch(clearStates())
    onLoadMarker(territory)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setMyPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      )
    } else {
      toast.error(
        <ToastBox
          color="success"
          icon={<AlertTriangle />}
          message="Geolocation is not supported by this browser."
          title="Oops!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'top-right'
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { direction, errors } = utils
    setDirection(direction)

    if (errors) {
      toast.error(
        <ToastBox
          color="success"
          icon={<AlertTriangle />}
          message={`Direction request failed due to ${JSON.stringify(errors)}`}
          title="Oops!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'top-right'
        }
      )
    }
  }, [utils])

  const onLoadMap = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(14)
  }, [])

  const onLoadMarker = useCallback(
    (territory: Territory) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          panTo({
            lat: territory.coordinates.lat,
            lng: territory.coordinates.lng
          })
        },
        () => null
      )
    },
    [panTo]
  )

  const options = {
    styles: theme === 'dark' ? MapStylesDarkMode : null,
    disableDefaultUI: false,
    zoomControl: false
  }

  const onShowDirection = useCallback(
    (territory: Territory) => {
      const directionsService = new google.maps.DirectionsService()
      const payload = {
        directionsService: directionsService,
        request: {
          origin: new google.maps.LatLng(myPosition.lat, myPosition.lng),
          destination: new google.maps.LatLng(
            territory.coordinates.lat,
            territory.coordinates.lng
          ),
          travelMode: google.maps.TravelMode.DRIVING
        }
      }
      dispatch(googleDirectionRequest(payload))
    },
    [myPosition, dispatch]
  )

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Location on map</CardTitle>
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
            <MapMarker
              territory={territory}
              mode={theme}
              onShowDirection={onShowDirection}
            />
            <Marker
              position={myPosition}
              title="My Current Location"
              icon={icon}
            />
            {direction ? (
              <DirectionsRenderer
                options={{
                  directions: direction,
                  polylineOptions: polylineOptions,
                  suppressMarkers: true
                }}
              />
            ) : null}
          </GoogleMap>
        </div>
      </CardBody>
    </Card>
  )
}

export default Location
