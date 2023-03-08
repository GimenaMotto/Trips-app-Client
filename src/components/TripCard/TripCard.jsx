import './TripCard.css'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const TripCard = ({ images, title, startDate, endDate, _id }) => {

    return (
        <Link to={`/detalles/${_id}`}>
            <Card style={{ width: '18rem' }} className="mb-4">

                < Card.Body >

                    <Card.Img variant="top" src={images[0]} />
                    <Card.Title className="m-3">{title}</Card.Title>


                    <Card.Text className="m-3">Partida: {new Date(startDate).toLocaleDateString()}</Card.Text>
                    <Card.Text className="m-3">Regreso: {new Date(endDate).toLocaleDateString()}</Card.Text>
                </Card.Body >
            </Card >
        </Link>
    )
}

export default TripCard