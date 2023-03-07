import './TripCard.css'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const TripCard = ({ images, title, startDate, endDate, _id }) => {

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={images[0]} />
            <Card.Body>
                <Link to={`/detalles/${_id}`}>
                    <Card.Title>{title}</Card.Title>
                </Link>

                <Card.Text>Partida: {new Date(startDate).toLocaleDateString()}</Card.Text>
                <Card.Text>Regreso: {new Date(endDate).toLocaleDateString()}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default TripCard