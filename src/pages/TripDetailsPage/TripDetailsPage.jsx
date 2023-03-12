import './TripDetailsPage.css'
import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import tripsService from '../../services/trips.service'
import CarouselTripDetails from '../../components/CarouselTripDetails/CarouselTripDetails'
import CardTripDetails from '../../components/CardTripDetails/CardTripDetails'
import { Link } from 'react-router-dom'


const TripDetailsPage = () => {

    const [trip, setTrip] = useState({})

    const { trip_id } = useParams()

    useEffect(() => {
        loadTripData()
    }, [])

    const loadTripData = () => {
        tripsService
            .getOneTrip(trip_id)
            .then(({ data }) => setTrip(data))
            .catch(err => console.log(err))
    }

    return (

        <Container className="DetailsTripTitle mb-3">
            <Row >
                <Col md={{ offset: 3, span: 6 }}>
                    <h3>Información sobre {trip.title}</h3>
                </Col>
            </Row>

            <CarouselTripDetails trip={trip} />


            <Row>
                <Col md={{ span: 6, offset: 3 }} className="mb-3">
                    <CardTripDetails trip={trip} loadTripData={loadTripData} />
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Link to="javascript:history.back()" className="btn btn-outline-dark">Volver</Link>
                    </div>
                </Col>
            </Row>


        </Container>
    )
}

export default TripDetailsPage