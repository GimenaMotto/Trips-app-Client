import './TripsPage.css'
import TripsList from "../../components/TripsList/TripsList"
import { Container, Row, Col } from "react-bootstrap"
import tripsService from "../../services/trips.service"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
// import { AuthContext } from "../../contexts/auth.context"

const TripPage = () => {

    const [trips, setTrips] = useState([])
    // const { user } = useContext(AuthContext)

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
                        <h3>Viajes</h3>
                        <hr />
                        <TripsList trips={trips} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TripPage