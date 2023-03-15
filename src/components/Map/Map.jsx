import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useMemo, useState, useEffect } from 'react'
import tripsService from "../../services/trips.services"
import AutocompleteMap from "../AutocompleteMap/AutocompleteMap"
import './Map.css'
import { Link, useNavigate } from 'react-router-dom'


const Map = () => {

    const [selected, setSelected] = useState(null)

    const [trips, setTrips] = useState([])

    const [showDetails, setShowDetails] = useState(false)

    const [selectedTrip, setSelectedTrip] = useState(null)

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



    const destinations = trips.map(elm => elm.destination)


    return (
        <>

            <GoogleMap zoom={2.5} center={{ lat: 4.087003031943222, lng: 3.6966068550106606 }} mapContainerClassName="map-container">
                {trips.map(elm => {
                    return (
                        <Marker
                            key={elm._id}
                            title={elm.title}
                            position={{ lat: elm.destination.coordinates[0], lng: elm.destination.coordinates[1] }}
                            onClick={() => handleClick(elm._id)}

                        />

                    )
                })}
            </GoogleMap>
        </>



    )
}

export default Map


