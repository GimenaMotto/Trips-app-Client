import { useState, useContext, useEffect } from "react"
import { Form, Button, Col, Row, Container } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import uploadServices from "../../services/upload.services"
import { MessageContext } from "../../contexts/message.context"
import usersServices from "../../services/users.services"
import { AuthContext } from "../../contexts/auth.context"
import FormError from '../FormError/FormError'
import { ThemeContext } from '../../contexts/theme.context'



const EditProfileForm = () => {

    const [usersData, setUsersData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
        description: '',
        interests: [],
        gender: '',
        age: ''
    })

    const { refreshToken } = useContext(AuthContext)

    const [loadingImage, setLoadingImage] = useState(false)

    const { emitMessage } = useContext(MessageContext)

    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const { user_id } = useParams()
    const { themeValue } = useContext(ThemeContext)
    const formStyle = themeValue === 'dark' ? 'light' : 'dark'



    const handleInputChange = e => {
        const { value, name } = e.target
        if (name === 'interests') {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
            setUsersData({ ...usersData, [name]: selectedOptions })
        } else {
            setUsersData({ ...usersData, [name]: value })
        }
    }

    useEffect(() => {
        getOneUser(user_id)
    }, [])

    const getOneUser = (user_id) => {
        usersServices
            .getOneUser(user_id)
            .then(({ data }) => {
                const { username, email, description, interests, gender, age } = data
                setUsersData({ username, email, description, interests, gender, age })

            })
            .catch(err => console.error(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        usersServices
            .editUser(user_id, usersData)
            .then(({ data }) => {
                setUsersData(data)
                navigate(`/perfil/${user_id}`)
                refreshToken()
            })
            .catch(err => console.log(err))

    }


    return (

        <Form onSubmit={handleFormSubmit}>


            <Row className="mb-3">
                <Col>
                    <Form.Group>
                        <Form.Label>Género: </Form.Label>
                        <Form.Select className="mb-3" controlId="gender" name="gender" onChange={handleInputChange} >
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
                        <Form.Control type="text" value={usersData.age} onChange={handleInputChange} name="age" />
                    </Form.Group>
                </Col>
            </Row>


            <Form.Group className="mb-3">
                <Form.Label>Intereses: </Form.Label>
                <Form.Select className='FormSelect custom-select' id="interests" size={2} multiple value={usersData.interests} onChange={handleInputChange} name="interests">
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
                <Form.Label>Sobre mi:</Form.Label>
                <Form.Control as="textarea" rows={2} value={usersData.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}


            <div className="d-grid">
                <Row>
                    <Col className="text-center">
                        <Button className="px-5 mt-3 mb-5" variant={formStyle} type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Editar perfil'}</Button>
                    </Col>
                </Row>
            </div>


        </Form >


    )
}

export default EditProfileForm