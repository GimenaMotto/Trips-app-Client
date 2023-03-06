import './SignupForm.css'
import { useState } from "react"
import { Form, Button, Row, Col } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
        description: '',
        interests: [],
        gender: '',
        age: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        if (name === 'interests') {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
            setSignupData({ ...signupData, [name]: selectedOptions })
        } else {
            setSignupData({ ...signupData, [name]: value })
        }
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/iniciar-sesion'))
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label>Género</Form.Label>
                        <Form.Control type="text" value={signupData.gender} onChange={handleInputChange} name="gender" />
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Edad</Form.Label>
                        <Form.Control type="text" value={signupData.age} onChange={handleInputChange} name="age" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Selecciona tu avatar</Form.Label>
                <Form.Control type="file" value={signupData.avatar} onChange={handleInputChange} name="avatar" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Intereses</Form.Label>
                <Form.Select className='FormSelect' id="interests" size={2} multiple value={signupData.interests} onChange={handleInputChange} name="interests">
                    <option value='Naturaleza'>Naturaleza</option>
                    <option value='Playa'>Playa</option>
                    <option value='Montaña'>Montaña</option>
                    <option value='Arte'>Arte</option>
                    <option value='Cultura'>Cultura</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Sobre mi</Form.Label>
                <Form.Control as="textarea" rows={2} value={signupData.description} onChange={handleInputChange} name="description" />
            </Form.Group>




            <div className="d-grid">
                <Button variant="dark" type="submit">Registrarme</Button>
            </div>

        </Form>
    )
}

export default SignupForm