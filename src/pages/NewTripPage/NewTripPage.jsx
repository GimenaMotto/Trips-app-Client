import './NewTripPage.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NewTripForm from '../../components/NewTripForm/NewTripForm'


const NewTripPage = () => {

    const navigate = useNavigate()

    const fireFinalActions = () => {
        navigate('/viajes')
    }

    return (

        <Container className="NewTripPage">
            <Row>

                <Col md={{ offset: 0, span: 12 }}>
                    <h3>Nuevo Viaje</h3>
                    <hr />
                    <NewTripForm fireFinalActions={fireFinalActions} />
                </Col>
            </Row>
        </Container>

    )
}

export default NewTripPage