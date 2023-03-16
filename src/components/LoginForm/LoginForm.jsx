import { useState, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import authService from "../../services/auth.services"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from 'react-router-dom'
import { MessageContext } from "../../contexts/message.context"
import FormError from '../FormError/FormError'
import { ThemeContext } from "../../contexts/theme.context"

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const { themeValue } = useContext(ThemeContext)
    const { emitMessage } = useContext(MessageContext)
    const [errors, setErrors] = useState([])
    const { authenticateUser, user } = useContext(AuthContext)
    const formStyle = themeValue === 'dark' ? 'light' : 'dark'

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                navigate('/')
                authenticateUser()
                emitMessage('Bienvenid@ viajer@')
            })
            .catch(err => setErrors(err.response.data.message))
    }

    return (

        <Form className="Form-custom" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors}</FormError>}

            <div className="d-grid">
                <Row>
                    <Col className="text-center">
                        <Button variant={formStyle} type="submit" className="px-5 mt-3">Acceder</Button>
                    </Col>
                </Row>
            </div>

        </Form>
    )
}

export default LoginForm