import './SignupPage.css'
import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'

const SignupPage = () => {

    return (

        <Container className="SignupPage">

            <Row>

                <Col md={{ offset: 1, span: 10 }}>

                    <h3>Registro</h3>

                    <hr />

                    <SignupForm />

                </Col>
            </Row>

        </Container>
    )
}

export default SignupPage