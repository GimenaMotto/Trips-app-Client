import './NewTripForm.css'
import { useState, useContext, useEffect } from 'react'
import tripsService from '../../services/trips.services'
import { Form, Row, Col, Button } from "react-bootstrap"
import uploadServices from '../../services/upload.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import FormError from '../FormError/FormError'
import { MessageContext } from '../../contexts/message.context'
import { ThemeContext } from '../../contexts/theme.context'


const NewTripForm = ({ fireFinalActions }) => {

    const { user } = useContext(AuthContext)
    const { themeValue } = useContext(ThemeContext)
    const formStyle = themeValue === 'dark' ? 'light' : 'dark'
    const [loadingImage, setLoadingImage] = useState()
    const [errors, setErrors] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const { emitMessage } = useContext(MessageContext)

    const [tripData, setTripData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        images: [],
        budget: '',
        destination: ''
    })

    useEffect(() => {
        setTripData({ ...tripData, images: selectedImages })
    }, [selectedImages])



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



    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        for (let key in e.target.files) {
            formData.append('imageData', e.target.files[key])
        }

        uploadServices
            .uploadimage(formData)
            .then(res => {
                console.log(res.data)
                setLoadingImage(false)
                setSelectedImages([...selectedImages, ...res.data])
                setTripData({ ...tripData, images: selectedImages })
            })
            .catch(err => {
                setLoadingImage(false)
            })
    }
    const handleImageRemove = (index) => {
        const newSelectedImages = [...selectedImages]
        newSelectedImages.splice(index, 1)
        setSelectedImages(newSelectedImages)
        console.log(selectedImages)
    }

    console.log(selectedImages)
    console.log(tripData)

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
                        <div className="d-flex flex-wrap">
                            {selectedImages && selectedImages.length > 0 && selectedImages.map((image, index) => (
                                <div key={index} className=" mb-3">
                                    <img src={image} className="img-fluid prev-img"></img>
                                    <button type="button" className="btn btn-danger position-absolute  " onClick={() => handleImageRemove(index)}>&times;</button>
                                </div>
                            ))}
                        </div>
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

                <div className="d-grid">
                    <Row>
                        <Col className="text-center">
                            <Button className="px-5 m-2 mb-3" variant={formStyle} type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Crear viaje'}</Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div >
    )
}

export default NewTripForm