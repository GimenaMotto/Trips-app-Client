import './CardTripDetails.css'
import { Card, Button, Row, Col, ListGroup, ListGroupItem, Figure } from "react-bootstrap"
import { Link, } from "react-router-dom"
import { useParams } from 'react-router-dom'
import tripsService from '../../services/trips.services'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { ThemeContext } from '../../contexts/theme.context'


const CardTripDetails = ({ trip, loadTripData }) => {

    const { themeValue } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)
    const [travellersIds, setTravellersIds] = useState([])
    const { trip_id } = useParams()
    const navigate = useNavigate()
    const style = themeValue === 'dark' ? 'light' : 'dark'

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

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        getTravellersIds()
    }, [trip.travellers])

    const loadData = () => {
        tripsService
            .getOneTrip(trip_id)
            .then(({ data }) => {
                let { travellers } = data
                setNewData({ travellers })
                loadTripData()
            })
            .catch(err => console.log(err))
    }

    const handleJoinTrip = () => {
        tripsService
            .joinToTrip(trip_id, tripData)
            .then(({ data }) => {
                const { travellers } = data
                setNewData({ travellers })
                loadTripData()
            })
            .catch(err => console.log(err))
    }


    const handleLeaveTrip = () => {
        tripsService
            .leaveTrip(trip_id, tripData)
            .then(({ data }) => {
                const { ...travellers } = data
                setNewData({ travellers })
                loadTripData()
            })
    }

    const getTravellersIds = () => {
        setTravellersIds(trip.travellers?.map(elm => elm._id))
    }

    return (
        <Card className="CardTripDetails">
            <Card.Body>
                <Card.Title className="m-2 ml-4">{trip.title}</Card.Title>
                <ListGroup variant="flush" className="m-3">
                    <ListGroup.Item className="m-2 mt-2 background-group">
                        <Card.Subtitle className="text-muted">Partida:{new Date(trip.startDate).toLocaleDateString()}
                        </Card.Subtitle>
                    </ListGroup.Item>
                    <ListGroup.Item className="m-2 background-group">
                        <Card.Subtitle className="text-muted">Regreso:{new Date(trip.endDate).toLocaleDateString()}
                        </Card.Subtitle>
                    </ListGroup.Item>
                    <ListGroupItem className="m-2 mt-2 background-group">

                        <Card.Subtitle> <span className="mr-2 align-self-center organizer">Organizador/a:</span>
                            <Link to={`/perfil/${trip.organizer?._id}`}>
                                <Figure className="m-0">
                                    <div className="d-flex align-items-center ml-2">
                                        <Figure.Image
                                            src={trip.organizer?.avatar}
                                            roundedCircle
                                            className="mr-2 rounded-circle img-fluid traveller-avatar"
                                        /><Figure.Caption className="organizer-name">
                                            {trip.organizer?.username}
                                        </Figure.Caption>
                                    </div>
                                </Figure>
                            </Link>

                        </Card.Subtitle>
                    </ListGroupItem>

                </ListGroup >
                <Card.Text className="m-3 ml-2 mr-2">
                    <span className='viajeDescription'> Sobre el viaje:</span>  {trip.description}
                </Card.Text>
                <Card.Text className="m-3 ml-2 mr-2">
                    <span className='budget'> Presupuesto:</span>  {trip.budget}
                </Card.Text>

                <ListGroupItem className="m-4 mt-5 background-group">
                    <Card.Subtitle>  <span className="viajerxs"> Viajerxs: </span></Card.Subtitle>

                    <div className="d-flex justify-content">
                        {trip.travellers?.map((elm, i) => (
                            <Link to={`/perfil/${elm._id}`}>
                                <Figure key={i} className="figure m-2">
                                    <Figure.Image className="rounded-circle img-fluid traveller-avatar" src={elm.avatar} alt={elm.username} />
                                    <Figure.Caption >
                                        <span className="cardDetails">{elm.username}</span>
                                    </Figure.Caption>

                                </Figure>
                            </Link>
                        ))}
                    </div>

                </ListGroupItem>
                <Row>
                    <Col className="m-3 d-flex justify-content-center">
                        {travellersIds?.includes(user._id) ? <Link to="">
                            <Button onClick={handleLeaveTrip} variant={style} as="span"> Abandonar viaje</Button>
                        </Link>
                            :
                            <Link to="">
                                <Button variant={style} as="span" onClick={handleJoinTrip}> Sumarse al viaje</Button>
                            </Link>}
                    </Col>

                </Row>
                <Row >
                    <Col className="m-3 d-flex justify-content-center">
                        <Link to={`/editar-viaje/${trip_id}`}>
                            {(user._id === trip.organizer?._id || user.role === 'ADMIN') && <Button variant={style} as="span"> Editar</Button>}

                        </Link>
                    </Col>
                    <Col className="m-3 d-flex justify-content-center">
                        <Link to="">
                            {(user._id === trip.organizer?._id || user.role === 'ADMIN') && <Button variant="danger" as="span" onClick={handleTripDelete}> Eliminar</Button>}

                        </Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card >
    )
}

export default CardTripDetails