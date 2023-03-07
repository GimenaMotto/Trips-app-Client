import './NewTripForm.css'
import { useState } from 'react'
import tripsService from '../../services/trips.service'
import { Form, Row, Col, Button } from "react-bootstrap"

const NewTripForm = ({ fireFinalActions }) => {

    const [tripData, setTripData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        images: [],
        budget: '',
        destination: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setTripData({ ...tripData, [name]: value })
    }

    const handleTripSubmit = e => {
        e.preventDefault()

        tripsService
            .saveTrip(tripData)
            .then(({ data }) => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="TripForm">
            <Form onSubmit={handleTripSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Título del viaje:</Form.Label>
                            <Form.Control type="text" name="title" value={tripData.title} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Imágenes del destino:</Form.Label>
                            <Form.Control type="file" value={tripData.images} onChange={handleInputChange} name="images" multiple />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="destination">
                    <Form.Label>Destino:</Form.Label>
                    <Form.Control type="text" name="destination" value={tripData.destination} onChange={handleInputChange} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="startDate">
                            <Form.Label>Fecha de partida:</Form.Label>
                            <Form.Control type="date" name="startDate" value={tripData.startDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="endDate">
                            <Form.Label>Fecha de regreso:</Form.Label>
                            <Form.Control type="date" name="endDate" value={tripData.endDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col>
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
                <div className="d-grid mb-5">
                    <Button variant="dark" type="submit">Crear viaje</Button>
                </div>
            </Form>
        </div>
    )
}

export default NewTripForm