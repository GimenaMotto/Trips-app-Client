import './TripsPage.css'
import TripsList from "../../components/TripsList/TripsList"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import tripsService from "../../services/trips.service"
import { useEffect, useState, useContext } from "react"
import NewTripForm from '../../components/NewTripForm/NewTripForm'
import { AuthContext } from '../../contexts/auth.context'




const TripPage = () => {

    const [showModal, setShowModal] = useState(false)
    const [trips, setTrips] = useState([])

    const { user } = useContext(AuthContext)


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

    return (
        <>
            <Container className="TripsPage">
                {user && <Button onClick={() => setShowModal(true)} variant="dark">Crear viaje</Button>}
                <Row>
                    <Col >
                        <h3>Viajes organizados por usuarios de 360</h3>
                        <hr />
                        <TripsList trips={trips} />
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title>Nueva viaje</Modal.Title></Modal.Header>
                <Modal.Body>
                    <NewTripForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TripPage