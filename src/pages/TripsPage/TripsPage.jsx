import './TripsPage.css'
import TripsList from "../../components/TripsList/TripsList"
import { Container, Row, Col, Modal, Button } from "react-bootstrap"
import tripsService from "../../services/trips.service"
import { useEffect, useState, useContext } from "react"
import NewTripForm from '../../components/NewTripForm/NewTripForm'
import { ThemeContext } from '../../contexts/theme.context'

const TripPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [trips, setTrips] = useState([])
    const { themeValue } = useContext(ThemeContext)
    const themePageStyle = themeValue === 'dark' ? 'light' : 'dark'
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
                <Row className="justify-content-center align-items-center">
                    <Col xs={8} md={8} lg={9} className="text-center mt-4">
                        <h3 className="mb-4">Viajes organizados por usuarixs de 360</h3>
                    </Col>
                    <Col xs={4} md={4} lg={3} className="text-md-right mt-4">
                        <Button variant={themePageStyle} size="md" onClick={() => setShowModal(true)}>Crear un viaje</Button>
                    </Col>
                </Row>
                <TripsList trips={trips} />
            </Container>
            <Modal className="Modal-newTrip" size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title className="Modal-title-newTrip">Nuevo Viaje</Modal.Title></Modal.Header>
                <Modal.Body>
                    <NewTripForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default TripPage