import './TripDetailsPage.css'
import { useEffect, useState } from "react"
import { Container, Row, Col, Button, Carousel } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import tripsService from '../../services/trips.service'

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
                    <h3>Detalles de {trip.title}</h3>
                </Col>
            </Row>

            {/* las img del carousel son del array */}
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} className="mb-3">
                        <Carousel className="CarouselTripsDetails">
                            <Carousel.Item interval={1000}>
                                <img
                                    className="d-block w-100 Img-carousel"
                                    src="https://i.kym-cdn.com/entries/icons/original/000/034/772/Untitled-1.png"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{trip.title}</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                    className="d-block w-100 Img-carousel"
                                    src="https://i.kym-cdn.com/entries/icons/original/000/034/772/Untitled-1.png"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{trip.title}</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

            </Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="mb-3">
                    <div>{trip.description}</div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="mb-3">
                    <div> Fecha de partida: {new Date(trip.startDate).toLocaleDateString()}</div>
                </Col>
                <Col md={{ span: 6, offset: 3 }} className="mb-3">
                    <div> Fecha de regreso: {new Date(trip.endDate).toLocaleDateString()} </div>
                </Col>
            </Row>


        </Container>
    )
}

export default TripDetailsPage