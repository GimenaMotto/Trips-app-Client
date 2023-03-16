import './MarkerCard.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { ThemeContext } from '../../contexts/theme.context'


const MarkerCard = ({ images, title, _id, mousePos }) => {


    const { isLigthMode } = useContext(ThemeContext)
    const cardStyle = {
        width: '12rem',
        position: 'fixed',
        left: `${mousePos[0]}px`,
        top: `${mousePos[1]}px`,
        color: isLigthMode ? "#2b3035" : '#f8f9fa',
        backgroundColor: isLigthMode ? '#f8f9fa' : '#2b3035'
    }

    return (
        <Link to={`/detalles/${_id}`}>
            <Card style={cardStyle}>
                < Card.Body  >
                    <Card.Img variant="top" src={images[0]} />
                    <Card.Title className={`m-3`}>{title}</Card.Title>
                </Card.Body >

            </Card >
        </Link>
    )
}

export default MarkerCard