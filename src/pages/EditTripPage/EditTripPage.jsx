import './EditTripPage.css'
import { Container, Row, Col } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import EditTripForm from '../../components/EditTripForm/EditTripForm'

const EditTripPage = () => {

    const navigate = useNavigate()

    const fireFinalActions = () => {
        navigate('/viajes')
    }

    return (

        <Container className="EditTripPage">
            <Row>

                <Col md={{ offset: 2, span: 8 }}>
                    <h3>Editar viaje</h3>
                    <hr />
                    <EditTripForm fireFinalActions={fireFinalActions} />
                </Col>
            </Row>
        </Container>

    )
}

export default EditTripPage