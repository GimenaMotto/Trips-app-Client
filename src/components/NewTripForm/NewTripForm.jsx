import './NewTripForm.css'
import { useState, useContext } from 'react'
import tripsService from '../../services/trips.service'
import { Form, Row, Col, Button } from "react-bootstrap"
import uploadServices from '../../services/upload.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import FormError from '../FormError/FormError'
import { MessageContext } from '../../contexts/message.context'


const NewTripForm = ({ fireFinalActions }) => {

    const { user } = useContext(AuthContext)

    const [tripData, setTripData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        images: [],
        budget: '',
        destination: ''
    })

    const { emitMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setTripData({ ...tripData, [name]: value })
    }

    const handleTripSubmit = e => {
        e.preventDefault()

        tripsService
            .saveTrip(tripData)
            .then(({ data }) => {
                emitMessage('Viaje creado')
                fireFinalActions()
                navigate('/viajes')
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })
    }

    const [loadingImage, setLoadingImage] = useState()

    const [errors, setErrors] = useState([])

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        for (let key in e.target.files) {
            formData.append('imageData', e.target.files[key])
        }


        uploadServices
            .uploadimage(formData)
            .then(res => {
                console.log(res)
                setTripData({ ...tripData, images: res.data })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }



    return (
        <div className="TripForm">
            <Form onSubmit={handleTripSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Título del viaje:</Form.Label>
                            <Form.Control type="text" name="title" value={tripData.title} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="images">
                            <Form.Label>Imágenes del destino:</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} name="images" multiple />
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="destination">
                            <Form.Label>Destino:</Form.Label>
                            <Form.Control type="text" name="destination" value={tripData.destination} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="startDate">
                            <Form.Label>Fecha de partida:</Form.Label>
                            <Form.Control type="date" name="startDate" value={tripData.startDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="endDate">
                            <Form.Label>Fecha de regreso:</Form.Label>
                            <Form.Control type="date" name="endDate" value={tripData.endDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="budget">
                            <Form.Label>Presupuesto:</Form.Label>
                            <Form.Control type="text" name="budget" value={tripData.budget} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control type="textarea" rows={2} name="description" value={tripData.description} onChange={handleInputChange} />
                </Form.Group>

                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

                <div className="d-grid mb-5">
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Crear viaje'}</Button>
                </div>
            </Form>
        </div >
    )
}

export default NewTripForm