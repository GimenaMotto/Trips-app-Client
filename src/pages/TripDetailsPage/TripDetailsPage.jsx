import './TripDetailsPage.css'
import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Button, Carousel, Card } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import tripsService from '../../services/trips.service'
// import { AuthContext } from '../../contexts/auth.context'

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
        //sacar fuera carousel
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
                                    {/* <h3>{trip.title}</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                    className="d-block w-100 Img-carousel"
                                    src="https://i.kym-cdn.com/entries/icons/original/000/034/772/Untitled-1.png"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    {/* <h3>{trip.title}</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

            </Container>
            {/* sacar fuera card */}

            <Row>
                <Col md={{ span: 6, offset: 3 }} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">{trip.title}</Card.Title>
                            <Card.Subtitle className="mb-3 text-muted">Partida:{new Date(trip.startDate).toLocaleDateString()}</Card.Subtitle>
                            <Card.Subtitle className="mb-3 text-muted">Regreso:{new Date(trip.endDate).toLocaleDateString()}</Card.Subtitle>
                            <Card.Text className="mb-3">
                                {trip.description}
                            </Card.Text>
                            <Row>
                                <Col className="mb-3">
                                    <Link to="">
                                        <Button variant="dark" as="span"> Sumarse al viaje</Button>
                                    </Link>
                                </Col>
                                <Col className="mb-3">
                                    <Link to="">
                                        <Button variant="dark" as="span"> Dejar el viaje</Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Row >
                                <Col className="mb-3">
                                    <Link to="">
                                        <Button variant="dark" as="span"> Editar</Button>
                                    </Link>
                                </Col>
                                <Col className="mb-3">
                                    <Link to="">
                                        <Button variant="dark" as="span"> Eliminar</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </Container>
    )
}

export default TripDetailsPage