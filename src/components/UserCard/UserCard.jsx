import './UserCard.css'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const UserCard = ({ username, avatar, description, _id }) => {

    return (
        <Link to={`/mi-perfil/${_id}`}>
            <Card style={{ width: '18rem' }} className="mb-4">

                < Card.Body >

                    <Card.Img variant="top" src={avatar} />
                    <Card.Title className="m-3">{username}</Card.Title>
                    <Card.Text className="m-3">Descripción: {description}</Card.Text>
                </Card.Body >
            </Card >
        </Link>
    )
}

export default UserCard