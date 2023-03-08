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

    //faltan rutas put y delete 
}

const tripsService = new TripService

export default tripsService
