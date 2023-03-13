import formatedDate from '../../utils/formatDate'
import './EditTripForm.css'
import { Form, Row, Col, Button } from "react-bootstrap"
import tripsService from '../../services/trips.services'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import uploadServices from '../../services/upload.services'

const EditTripForm = ({ fireFinalActions }) => {

    const navigate = useNavigate()
    const [newData, setNewData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        images: [],
        budget: '',
        destination: ''
    })

    const { trip_id } = useParams()
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        tripsService
            .getOneTrip(trip_id)
            .then(({ data }) => {
                let { title, description, startDate, endDate, budget, destination, images } = data
                const formatedStartDate = formatedDate(startDate)
                const formatedEndDate = formatedDate(endDate)
                setNewData({ title, description, startDate: formatedStartDate, endDate: formatedEndDate, images: data.images, budget, destination })
                // console.log(data)
            })
            .catch(err => console.log(err))
    }

    const currentImages = newData.images
    console.log('esto es currentImages=>', currentImages)

    const handleInputChange = e => {
        const { value, name } = e.target
        setNewData({ ...newData, [name]: value })
    }

    const handleTripSubmit = e => {
        e.preventDefault()
        tripsService
            .editTrip(trip_id, newData)
            .then(({ data }) => {
                setNewData(data)
                fireFinalActions()
                navigate('/viajes')
            })
            .catch(err => console.log(err))
    }

    const [loadingImage, setLoadingImage] = useState()

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        for (let key in e.target.files) {
            formData.append('imageData', e.target.files[key])
        }

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setNewData({ ...newData, images: currentImages.concat(res.data) })
                setLoadingImage(false)
                console.log('esto es res.data=>', res.data)
                console.log('esto es newData', newData)

            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }


    return (
        <Form onSubmit={handleTripSubmit} >
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Título del viaje:</Form.Label>
                        <Form.Control type="text" name="title" value={newData.title} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Imágenes del destino:</Form.Label>
                        <Form.Control type="file" name="images" multiple onChange={handleFileUpload} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="destination">
                <Form.Label>Destino:</Form.Label>
                <Form.Control type="text" name="destination" value={newData.destination} onChange={handleInputChange} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="startDate">
                        <Form.Label>Fecha de partida:</Form.Label>
                        <Form.Control type="date" name="startDate" value={newData.startDate} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="endDate">
                        <Form.Label>Fecha de regreso:</Form.Label>
                        <Form.Control type="date" name="endDate" value={newData.endDate} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="budget">
                        <Form.Label>Presupuesto:</Form.Label>
                        <Form.Control type="text" name="budget" value={newData.budget} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control type="textarea" rows={2} name="description" value={newData.description} onChange={handleInputChange} />
            </Form.Group>
            <div className="d-grid mb-5">
                <Button variant="dark" type="submit">Editar viaje</Button>
            </div>
        </Form>
    )
}


export default EditTripForm