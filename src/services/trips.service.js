import axios from 'axios'

class TripService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/trips`
        })
    }

    getTrips() {
        return this.api.get('/getAllTrips')
    }

    getOneTrip(trip_id) {
        return this.api.get(`/getOneTrip/${trip_id}`)
    }

    saveTrip(tripData) {
        return this.api.post('/saveTrip', tripData)
    }

    editTrip(trip_id, tripData) {
        return this.api.put(`/editTrip/${trip_id}`, tripData)
    }

    deleteTrip(trip_id) {
        return this.api.delete(`/deleteTrip/${trip_id}`)
    }
}

const tripsService = new TripService

export default tripsService
