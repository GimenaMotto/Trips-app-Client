import './UserProfileCard.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import usersService from '../../services/users.services'
import { Card, Button, Row, Col, ListGroup, ListGroupItem, Figure } from "react-bootstrap"


const UserProfileCard = (props) => {

    const [user, setUser] = useState({})
    const { user_id } = useParams()

    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = () => {
        usersService
            .getOneUser(user_id)
            .then(({ data }) => setUser(data))
            .catch(err => console.log(err))
    }

    return (

        <Card className="UserProfile">
            <Card.Body>
                <ListGroup className="List-group">
                    <Row className="justify-content">
                        <Col md={4} className="m-3">
                            <Card.Img src={user.avatar} className="card-image img-fluid" />
                        </Col>
                        <Col md={4} className="m-3">
                            <Card.Title className="username">{user.username}</Card.Title>
                            <Card.Subtitle className="email">{user.email}</Card.Subtitle>
                        </Col>
                    </Row>
                </ListGroup>
                <ListGroup>
                    <ListGroupItem className="m-3">
                        <Card.Subtitle><span>Sobre {user.username}: </span> {user.description} </Card.Subtitle>
                    </ListGroupItem>
                    <Card.Text className="m-2"><span>Género: </span>{user.gender}</Card.Text>
                    <Card.Text className="m-2"><span>Edad: </span>{user.age}</Card.Text>
                    <Card.Text className="m-2"><span>Intereses: </span>{user.interests}</Card.Text>

                </ListGroup>
            </Card.Body>
        </Card>


    )
}

export default UserProfileCard