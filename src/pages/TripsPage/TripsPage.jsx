import './TripsPage.css'
import TripsList from "../../components/TripsList/TripsList"
import { Container, Row, Col } from "react-bootstrap"
import tripsService from "../../services/trips.service"
import { useEffect, useState } from "react"


const TripPage = () => {

    const [trips, setTrips] = useState([])


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

    return (
        <>
            <Container className="TripsPage">
                <Row>
                    <Col >
                        <h3>Viajes organizados por usuarios de 360</h3>
                        <hr />
                        <TripsList trips={trips} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TripPage