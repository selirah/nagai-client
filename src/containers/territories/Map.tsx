import React, { useState, useCallback, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from '@react-google-maps/api'
import { MapStylesDarkMode } from 'components/MapStyles'
import { Territory } from 'classes'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import { AlertTriangle } from 'react-feather'
import territoryActions from 'redux/terrirtories/actions'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'

const { googleDirectionRequest } = territoryActions

const center = {
  lat: 6.700071,
  lng: -1.630783
}

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
}

const polylineOptions = {
  strokeColor: '#03A9F4',
  strokeOpacity: 0.5,
  strokeWeight: 12
}

interface MapProps {
  mode: string
  territories: Territory[]
  onLoadMap: (map: any) => void
  mapRef: any
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

const Map: React.FC<MapProps> = (props) => {
  const { mode, territories, onLoadMap, mapRef } = props
  const [myPosition, setMyPosition] = useState({
    lat: 6.700071,
    lng: -1.630783
  })
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.territories)
  const [direction, setDirection] = useState(store.direction)

  useEffect(() => {
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

  const options = {
    styles: mode === 'dark' ? MapStylesDarkMode : null,
    disableDefaultUI: false,
    zoomControl: false
  }

  if (territories.length && mapRef.current !== undefined) {
    let bounds: any = new google.maps.LatLngBounds()
    territories.map((t) => {
      bounds.extend({
        lat: t.coordinates.lat,
        lng: t.coordinates.lng
      })
      return bounds
    })
    mapRef.current.fitBounds(bounds)
  }

  useEffect(() => {
    const { direction, errors } = store
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
  }, [store])

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

  console.log(direction)

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={8}
      onLoad={onLoadMap}
      options={options}
    >
      {territories.length
        ? territories.map((t) => (
            <MapMarker
              key={t.id}
              territory={t}
              mode={mode}
              onShowDirection={onShowDirection}
            />
          ))
        : null}
      <Marker position={myPosition} title="My Current Location" />
      {direction ? (
        <DirectionsRenderer
          options={{ direction: direction, polylineOptions: polylineOptions }}
        />
      ) : null}
    </GoogleMap>
  )
}

export default Map
