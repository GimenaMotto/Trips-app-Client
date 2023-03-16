import './MarkerCard.css'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'


const MarkerCard = ({ images, title, startDate, endDate, _id, mousePos }) => {




    return (
        <Link to={`/detalles/${_id}`}>
            <Card style={{ width: '12rem', position: 'fixed', left: `${mousePos[0]}px`, top: `${mousePos[1]}px` }}>
                < Card.Body >
                    <Card.Img variant="top" src={images[0]} />
                    <Card.Title className={`m-3`}>{title}</Card.Title>
                </Card.Body >
                {/* <Card.Text className="m-3">Partida: {new Date(startDate).toLocaleDateString()}</Card.Text>
                    <Card.Text className="m-3">Regreso: {new Date(endDate).toLocaleDateString()}</Card.Text> */}

            </Card >
        </Link>
    )
}

export default MarkerCard