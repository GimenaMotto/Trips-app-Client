import './TripsList.css'
import { Col, Row } from "react-bootstrap"
import TripCard from '../TripCard/TripCard'


const TripsList = ({ trips }) => {
    return (

        <Row>
            {
                trips.map(elm => {
                    return (
                        <Col className='md-3 mt-3' key={elm._id}>
                            <TripCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>

    )
}

export default TripsList