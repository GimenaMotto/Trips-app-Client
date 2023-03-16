import { useState, useContext, useEffect } from "react"
import { Form, Button, Col, Row, Container } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import uploadServices from "../../services/upload.services"
import { MessageContext } from "../../contexts/message.context"
import usersServices from "../../services/users.services"
import { AuthContext } from "../../contexts/auth.context"
import FormError from '../FormError/FormError'



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



    const handleInputChange = e => {
        const { value, name } = e.target
        setUsersData({ ...usersData, [name]: value })
    }

    useEffect(() => {
        getOneUser(user_id)
    }, [])

    const getOneUser = (user_id) => {
        usersServices
            .getOneUser(user_id)
            .then(({ data }) => {
                const { username, email, avatar, description, interests, gender, age } = data
                setUsersData({ username, email, avatar, description, interests, gender, age })

            })
            .catch(err => console.error(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        usersServices
            .editProfile(user_id, usersData)
            .then(({ data }) => {
                navigate(`/getOneUser/${user_id}`)
                refreshToken()
            })
            .catch(err => console.log(err))

    }


    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setUsersData({ ...usersData, avatar: res.data.cloudinary_url })
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
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={usersData.email} onChange={handleInputChange} name="email" />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Nombre de usuario:</Form.Label>
                        <Form.Control type="text" value={usersData.username} onChange={handleInputChange} name="username" />
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
                        <Form.Control type="text" value={usersData.age} onChange={handleInputChange} name="age" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar: </Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} multiple />
            </Form.Group>


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
                    <div className="d-grid mb-5">
                        <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Editar perfil'}</Button>
                    </div>
                </Row>
            </div>

        </Form>


    )
}

export default EditProfileForm