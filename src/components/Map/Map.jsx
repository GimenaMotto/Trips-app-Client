import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useMemo, useState, useEffect } from 'react'
import tripsService from "../../services/trips.services"
import './Map.css'
import { Link, useNavigate } from 'react-router-dom'
import MarkerCard from "../MarkerCard/MarkerCard"
import MapStyle from "./MapStyle"

const Map = () => {

    const [trips, setTrips] = useState([])
    const [showTripCard, setShowTripCard] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [mousePos, setMousePos] = useState([0, 0])

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
            <GoogleMap zoom={2.5} options={{ styles: MapStyle }} center={{ lat: 4.087003031943222, lng: 3.6966068550106606 }} mapContainerClassName="map-container">
                {trips.map(elm => {
                    return (
                        <Marker
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
