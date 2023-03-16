import './UserCard.css'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'

const UserCard = ({ username, avatar, age, gender, _id }) => {

    return (

        <Link to={`/perfil/${_id}`}>
            <Card style={{ width: '18rem' }} className="mb-3 Usercard">
                < Card.Body className="d-flex flex-wrap align-items-center">
                    <Card.Img className='rounded-circle img mov-img' variant="top" src={avatar} />
                    <Card.Title className="m-1 text-center">{username}</Card.Title>
                    <ListGroup variant="flush" className="m-3">
                        <ListGroup.Item className="m-2 background-group">
                            <Card.Subtitle className="text-muted">Edad: {age}
                            </Card.Subtitle>
                        </ListGroup.Item>
                        <ListGroup.Item className="m-2 background-group">
                            <Card.Subtitle className="text-muted">Género: {gender}
                            </Card.Subtitle>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body >
            </Card >
        </Link>
    )
}

export default UserCard

