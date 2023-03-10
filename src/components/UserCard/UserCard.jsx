import './UserCard.css'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'

const UserCard = ({ username, avatar, description, age, gender, _id }) => {

    return (
        <Link to={`/mi-perfil/${_id}`}>
            <Card style={{ width: '18rem' }} className="mb-4">

                < Card.Body >

                    <Card.Img className='rounded-circle' variant="top" src={avatar} />
                    <Card.Title className="m-3">{username}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Edad: {age}</ListGroup.Item>
                        <ListGroup.Item>Género: {gender}</ListGroup.Item>
                    </ListGroup>
                </Card.Body >
            </Card >
        </Link>
    )
}

export default UserCard