import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useMemo, useState, useEffect } from 'react'
import tripsService from "../../services/trips.services"
import AutocompleteMap from "../AutocompleteMap/AutocompleteMap"
import './Map.css'


const Map = () => {

    const [selected, setSelected] = useState(null)

    const [trips, setTrips] = useState([])


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

    const destinations = trips.map(elm => elm.destination)


    return (
        <>
            {/* <div><AutocompleteMap setSelected={setSelected} /></div> */}
            <GoogleMap zoom={2.2} center={{ lat: 40.41, lng: -3.7 }} mapContainerClassName="map-container">
                {destinations.map(elm => {
                    return <Marker position={{ lat: elm.coordinates[0], lng: elm.coordinates[1] }} />
                })}
            </GoogleMap>
        </>
    )
}

export default Map
