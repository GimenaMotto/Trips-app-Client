import './SignupForm.css'
import { useState } from "react"
import { Form, Button, Row, Col } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import uploadServices from '../../services/upload.services'
import FormError from '../FormError/FormError'


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

    const [loadingImage, setLoadingImage] = useState()

    const [errors, setErrors] = useState([])


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
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })
    }


    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, avatar: res.data[0] })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
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
                        <Form.Label>Contraseña: </Form.Label>
                        <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Género: </Form.Label>
                        <Form.Select className="mb-3" controlId="gender" name="gender" onChange={handleInputChange}>
                            <option value="No definido">No definido</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Hombre">Hombre</option>
                            <option value="No binario">No binario</option>
                        </Form.Select>
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Edad: </Form.Label>
                        <Form.Control type="text" value={signupData.age} onChange={handleInputChange} name="age" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar: </Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} multiple />
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Intereses: </Form.Label>
                <Form.Select className='FormSelect' id="interests" size={2} multiple value={signupData.interests} onChange={handleInputChange} name="interests">
                    <option value='Naturaleza '>Naturaleza</option>
                    <option value='Playa '>Playa</option>
                    <option value='Montaña '>Montaña</option>
                    <option value='Arte '>Arte</option>
                    <option value='Deporte '>Deporte</option>
                    <option value='Relax '>Relax</option>
                    <option value='Aventura '>Aventura</option>
                    <option value='Gastronomia '>Gastronomia</option>
                    <option value='Cultura '>Cultura</option>
                    <option value='Cine '>Cine</option>
                    <option value='Lectura '>Lectura</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Sobre mi</Form.Label>
                <Form.Control as="textarea" rows={2} value={signupData.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            <div className="d-grid mb-5">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Registrarme'}</Button>
            </div>

        </Form>
    )
}

export default SignupForm