import './CardTripDetails.css'
import { Card, Button, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap"
import { Link, } from "react-router-dom"
import { useParams } from 'react-router-dom'
import tripsService from '../../services/trips.service'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth.context'


const CardTripDetails = ({ trip }) => {

    const { user } = useContext(AuthContext)
    const { trip_id } = useParams()
    const navigate = useNavigate()

    const handleTripDelete = () => {
        tripsService
            .deleteTrip(trip_id)
            .then(({ data }) => {
                navigate('/viajes')
            })
            .catch(err => console.log(err))
    }

    const [tripData, setNewData] = useState({
        travellers: ''
    })
    // copia del estado

    const handleJoinTrip = () => {
        tripsService
            .joinToTrip(trip_id, tripData)
            .then(({ data }) => {

                let { travellers } = data
                setNewData({ travellers })
                // console.log(tripData)
                navigate(`/viajes`)
            })
            .catch(err => console.log(err))
    }

    // const handleLeaveTrip = () => {
    //     tripsService
    //         .leaveTrip(trip_id, setNewData)
    //         .then(({ data }) => {
    //             let { travellers } = data
    //             setNewData({ travellers })
    //             navigate(`/detalles/${trip_id}`)
    //         })
    // }

    useEffect(() => {
        console.log(trip)
    }, [trip])

    return (
        <Card>
            <Card.Body>
                <Card.Title className="m-2 ml-4">{trip.title}</Card.Title>
                <ListGroup variant="flush" className="m-3">
                    <ListGroup.Item className="m-2 mt-2">
                        <Card.Subtitle className="text-muted">Partida:{new Date(trip.startDate).toLocaleDateString()}
                        </Card.Subtitle>
                    </ListGroup.Item>
                    <ListGroup.Item className="m-2">
                        <Card.Subtitle className="text-muted">Regreso:{new Date(trip.endDate).toLocaleDateString()}
                        </Card.Subtitle>
                    </ListGroup.Item>
                    <ListGroupItem className="m-2 mt-2">
                        <Card.Subtitle>Organizador:{trip.organizer?.username}</Card.Subtitle>
                    </ListGroupItem>

                    <ListGroupItem className="m-2 mt-2">
                        <Card.Subtitle>Viajerxs:{
                            trip.travellers?.map(elm => {
                                return <p>{elm.username}</p>
                            })}</Card.Subtitle>
                    </ListGroupItem>
                </ListGroup>

                <Card.Text className="m-3 ml-2 mr-2">
                    Sobre el viaje:  {trip.description}
                </Card.Text>
                <Card.Text className="m-3 ml-2 mr-2">
                    Presupuesto: {trip.budget}
                </Card.Text>
                <Row>
                    <Col className="m-3 d-flex justify-content-center">
                        <Link to="">
                            <Button variant="dark" as="span" onClick={handleJoinTrip}> Sumarse al viaje</Button>
                        </Link>
                    </Col>
                    <Col className="m-3 d-flex justify-content-center">
                        <Link to="">
                            <Button variant="dark" as="span" > Abandonar viaje</Button>
                            {/* onClick={handleLeaveTrip} */}
                        </Link>
                    </Col>
                </Row>
                <Row >
                    <Col className="m-3 d-flex justify-content-center">
                        <Link to={`/editar-viaje/${trip_id}`}>
                            {(user._id === trip.organizer || user.role === 'ADMIN') && <Button variant="dark" as="span"> Editar</Button>}

                        </Link>
                    </Col>
                    <Col className="m-3 d-flex justify-content-center">
                        <Link to="">
                            {(user._id === trip.organizer || user.role === 'ADMIN') && <Button variant="danger" as="span" onClick={handleTripDelete}> Eliminar</Button>}
                        </Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card >
    )
}

export default CardTripDetails