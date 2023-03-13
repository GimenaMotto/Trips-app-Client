import './TripDetailsPage.css'
import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import tripsService from '../../services/trips.services'
import CarouselTripDetails from '../../components/CarouselTripDetails/CarouselTripDetails'
import CardTripDetails from '../../components/CardTripDetails/CardTripDetails'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../contexts/theme.context'

const TripDetailsPage = () => {

    const { themeValue } = useContext(ThemeContext)
    const detailsStyle = themeValue === 'dark' ? 'light' : 'dark'
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
                        <Link to="javascript:history.back()"> <Button variant={detailsStyle} className='outline' as="span">Volver</Button></Link>

                    </div>
                </Col>
            </Row>


        </Container>
    )
}

export default TripDetailsPage