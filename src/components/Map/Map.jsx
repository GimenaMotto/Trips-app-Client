import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useMemo, useState, useEffect, useContext } from 'react'
import tripsService from "../../services/trips.services"
import './Map.css'
import { Link, useNavigate } from 'react-router-dom'
import MarkerCard from "../MarkerCard/MarkerCard"
import markerMap from '../../images/Marker.png'
import MapStyleDark from "./MapStyleDark"
import MapStyleLight from "./MapStyleLight"
import { ThemeContext } from "../../contexts/theme.context"


const Map = () => {

    const [trips, setTrips] = useState([])
    const [showTripCard, setShowTripCard] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [mousePos, setMousePos] = useState([0, 0])

    const { themeValue } = useContext(ThemeContext)
    const mapStyle = themeValue === 'dark' ? MapStyleDark : MapStyleLight
    const navigate = useNavigate()

    useEffect(() => {
        loadTrips()
    }, [])

    const loadTrips = () => {
        tripsService
            .getTrips()
            .then(({ data }) => {
                setTrips(data)
            })
    }

    const handleClick = (tripID) => {
        navigate(`/detalles/${tripID}`)
    }

    const handleMarkerMouseOver = (tripID, event) => {
        setSelectedTrip(trips.find(trip => trip._id === tripID))
        setShowTripCard(true)
        const { domEvent: { clientX: x, clientY: y } } = event
        setMousePos([x, y])
    }

    const handleMarkerMouseOut = () => {
        setShowTripCard(false)
    }

    const destinations = trips.map(elm => elm.destination)


    return (
        <>
            <GoogleMap zoom={2.5} options={{ styles: mapStyle }} center={{ lat: 4.087003031943222, lng: 3.6966068550106606 }} mapContainerClassName="map-container">
                {trips.map(elm => {
                    return (
                        <Marker
                            icon={markerMap}
                            key={elm._id}
                            title={elm.title}
                            position={{ lat: elm.destination.coordinates[0], lng: elm.destination.coordinates[1] }}
                            onMouseOver={(event) => handleMarkerMouseOver(elm._id, event)}
                            onMouseOut={() => handleMarkerMouseOut()}
                            onClick={() => handleClick(elm._id)}

                        />

                    )
                })}
                {showTripCard && selectedTrip && (
                    <MarkerCard {...selectedTrip} mousePos={mousePos} />
                )}
            </GoogleMap>


        </>
    )
}

export default Map
