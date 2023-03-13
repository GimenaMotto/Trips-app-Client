import axios from 'axios'

class TripService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/trips`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getTrips() {
        return this.api.get('/getAllTrips')
    }

    getOrganizer(organizer_id) {
        return this.api.get(`/organizer/${organizer_id}`)
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

    joinToTrip(trip_id, tripData) {
        return this.api.put(`/join/${trip_id}`, tripData)
    }

    leaveTrip(trip_id, tripData) {
        return this.api.put(`/leave/${trip_id}`, tripData)
    }

    deleteTrip(trip_id) {
        return this.api.delete(`/deleteTrip/${trip_id}`)
    }


}

const tripsService = new TripService

export default tripsService
