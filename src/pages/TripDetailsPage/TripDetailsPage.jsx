import './TripDetailsPage.css'
import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import tripsService from '../../services/trips.service'
import CarouselTripDetails from '../../components/CarouselTripDetails/CarouselTripDetails'
import CardTripDetails from '../../components/CardTripDetails/CardTripDetails'


const TripDetailsPage = () => {

    const [trip, setTrip] = useState({})

    const { trip_id } = useParams()

    useEffect(() => {
        tripsService
            .getOneTrip(trip_id)
            .then(({ data }) => setTrip(data))
            .catch(err => console.log(err))
    }, [])

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
                    <CardTripDetails trip={trip} />
                </Col>
            </Row>


        </Container>
    )
}

export default TripDetailsPage