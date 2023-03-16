import { Container, Col, Row } from "react-bootstrap"
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm"
import './EditProfilePage.css'

const EditProfilePage = () => {


    return (
        <Container className="EditProfilePage">

            <Row>
                <Col md={{ offset: 2, span: 8 }}>
                    <h3>Editar Perfil</h3>
                    <hr />
                    <EditProfileForm />
                </Col>
            </Row>

        </Container>
    )
}



export default EditProfilePage