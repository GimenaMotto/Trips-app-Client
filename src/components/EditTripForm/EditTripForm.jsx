import formatedDate from '../../utils/formatDate'
import './EditTripForm.css'
import { Form, Row, Col, Button } from "react-bootstrap"
import tripsService from '../../services/trips.services'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import uploadServices from '../../services/upload.services'
import AutocompleteMap from '../AutocompleteMap/AutocompleteMap'



const EditTripForm = ({ fireFinalActions }) => {

    const navigate = useNavigate()
    const [loadingImage, setLoadingImage] = useState()
    const { trip_id } = useParams()
    const [selectedImages, setSelectedImages] = useState([])
    const [selected, setSelected] = useState(null)
    const [newData, setNewData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        images: [],
        budget: '',
        destination: []
    })

    useEffect(() => {
        loadData()
    }, [])

    const [gmapsLoaded, setGmapsLoaded] = useState(false)

    useEffect(() => {
        window.initMap = () => setGmapsLoaded(true)
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnYSn7VdpeCvZqaqKcJ62uAfr-p6t2M1g&libraries=places&callback=initMap`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    }, [])

    const loadData = () => {
        tripsService
            .getOneTrip(trip_id)
            .then(({ data }) => {
                let { title, description, startDate, endDate, budget, destination, images } = data
                const formatedStartDate = formatedDate(startDate)
                const formatedEndDate = formatedDate(endDate)
                setNewData({ title, description, startDate: formatedStartDate, endDate: formatedEndDate, images: data.images, budget, destination })
            })
            .catch(err => console.log(err))
    }

    const currentImages = newData.images



    const handleInputChange = e => {
        const { value, name } = e.target
        setNewData({ ...newData, [name]: value })
    }



    useEffect(() => {
        setNewData({ ...newData, destination: { coordinates: selected, type: "Point" } })
    }, [selected])


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

    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        for (let key in e.target.files) {
            formData.append('imageData', e.target.files[key])
        }
        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSelectedImages([...selectedImages, ...res.data])
                setNewData({ ...newData, images: currentImages.concat(res.data) })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    const handleImageRemove = (index) => {
        const newSelectedImages = [...selectedImages]
        newSelectedImages.splice(index, 1)
        setSelectedImages(newSelectedImages)
    }


    return (
        <div className="EditTripForm">
            <Form onSubmit={handleTripSubmit} >
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Título del viaje:</Form.Label>
                            <Form.Control type="text" name="title" value={newData.title} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Destino:</Form.Label>
                            {gmapsLoaded && <div><AutocompleteMap selected={selected} setSelected={setSelected} value={newData.destination} onChange={handleInputChange} /></div>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Imágenes del destino:</Form.Label>
                            <Form.Control type="file" name="images" multiple onChange={handleFileUpload} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {selectedImages && selectedImages.length > 0 && selectedImages.map((image, index) => (
                        <Col md={6} key={index} className=" mb-3">
                            <img src={image} className="img-fluid prev-img"></img>
                            <button type="button" className="btn btn-danger position-absolute  " onClick={() => handleImageRemove(index)}>&times;</button>
                        </Col>
                    ))}
                </Row>
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
                    <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Editar viaje'}</Button>
                </div>
            </Form>
        </div>
    )
}
export default EditTripForm