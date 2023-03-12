import './TripsPage.css'
import TripsList from "../../components/TripsList/TripsList"
<<<<<<< HEAD
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import tripsService from "../../services/trips.service"
import { useEffect, useState, useContext } from "react"
import NewTripForm from '../../components/NewTripForm/NewTripForm'
import { AuthContext } from '../../contexts/auth.context'


=======
import { Container, Row, Col, Modal, Button } from "react-bootstrap"
import tripsService from "../../services/trips.service"
import { useEffect, useState, useContext } from "react"
import NewTripForm from '../../components/NewTripForm/NewTripForm'
import { ThemeContext } from '../../contexts/theme.context'
>>>>>>> aa54e49ebe0f5554a1fe1a1764cb2ffc38935338


const TripPage = () => {

    const [showModal, setShowModal] = useState(false)
    const [trips, setTrips] = useState([])
<<<<<<< HEAD

    const { user } = useContext(AuthContext)

=======
    const [showModal, setShowModal] = useState(false)
    const { themeValue } = useContext(ThemeContext)
    const themePageStyle = themeValue === 'dark' ? 'light' : 'dark'
>>>>>>> aa54e49ebe0f5554a1fe1a1764cb2ffc38935338

    useEffect(() => {
        loadTrips()
    }, [])

    const loadTrips = () => {
        tripsService
            .getTrips()
            .then(({ data }) => {
                setTrips(data)
            })
    }
    const fireFinalActions = () => {
        setShowModal(false)
        loadTrips()
    }

    const fireFinalActions = () => {
        setShowModal(false)
        loadTrips()
    }

    return (
        <>
            <Container className="TripsPage">
<<<<<<< HEAD
                {user && <Button onClick={() => setShowModal(true)} variant="dark">Crear viaje</Button>}
                <Row>
                    <Col >
                        <h3>Viajes organizados por usuarios de 360</h3>
                        <hr />
                        <TripsList trips={trips} />
=======
                <Row className="justify-content-center align-items-center">
                    <Col xs={8} md={8} lg={9} className="text-center mt-4">
                        <h3 className="mb-4">Viajes organizados por usuarixs de 360</h3>
                    </Col>
                    <Col xs={4} md={4} lg={3} className="text-md-right mt-4">
                        <Button variant={themePageStyle} size="md" onClick={() => setShowModal(true)}>Crear un viaje</Button>
>>>>>>> aa54e49ebe0f5554a1fe1a1764cb2ffc38935338
                    </Col>
                </Row>
                <TripsList trips={trips} />
            </Container>

<<<<<<< HEAD
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title>Nueva viaje</Modal.Title></Modal.Header>
=======
            <Modal className="Modal-newTrip" size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title className="Modal-title-newTrip">Nuevo Viaje</Modal.Title></Modal.Header>
>>>>>>> aa54e49ebe0f5554a1fe1a1764cb2ffc38935338
                <Modal.Body>
                    <NewTripForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TripPage