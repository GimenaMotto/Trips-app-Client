import './UserProfileCard.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import usersService from '../../services/users.services'
import { Card, Row, Col, ListGroup, ListGroupItem, Image, Button } from "react-bootstrap"


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

        <Row className="py-5 px-4">
            <Col md={10} className="mx-auto">
                <div className="bg-white shadow rounded overflow-hidden">
                    <div className="px-4 pt-0 pb-4 cover-cardUser">
                        <div className="media align-items-end profile-head">
                            <div className="profile mr-3">
                                <Image src={user.avatar} alt="..." width="200" className="rounded mb-2 img-thumbnail" />
                                <Button href={`/editar-perfil/${user_id}`} variant="outline-dark" size="sm" block>Edit profile</Button>
                            </div>
                            <div className="media-body mb-5 text-white">
                                <h4 className="mt-0 mb-1">{user.username}</h4>
                                <p className="mb-0">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3">
                        <h5 className="mb-0">Sobre mi: </h5>
                        <p className="font-italic mb-0">{user.description}</p>
                        <div className="p-4 rounded shadow-sm bg-light">
                            <p className="font-italic mb-0">Edad: {user.age}</p>
                            <p className="font-italic mb-0">Género: {user.gender}</p>
                            <p className="font-italic mb-0">Intereses: {user.interests}</p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>


        // <Card className="UserProfile">
        //     <Card.Body>
        //         <Row>
        //             <Col sm={12} md={4} className="text-center mb-3">
        //                 <Card.Img src={user.avatar} className="card-image img-fluid" />
        //             </Col>
        //             <Col sm={12} md={8}>
        //                 <Card.Title className="username">{user.username}</Card.Title>
        //                 <Card.Subtitle className="email">{user.email}</Card.Subtitle>
        //                 <ListGroup>
        //                     <ListGroupItem>
        //                         <Card.Subtitle><span>Sobre {user.username}: </span> {user.description} </Card.Subtitle>
        //                     </ListGroupItem>
        //                     <ListGroupItem><Card.Text><span>Género: </span>{user.gender}</Card.Text></ListGroupItem>
        //                     <ListGroupItem><Card.Text><span>Edad: </span>{user.age}</Card.Text></ListGroupItem>
        //                     <ListGroupItem><Card.Text><span>Intereses: </span>{user.interests}</Card.Text></ListGroupItem>
        //                 </ListGroup>
        //             </Col>
        //         </Row>
        //     </Card.Body>
        // </Card>

        // <Card className="UserProfile">
        //     <Card.Body>
        //         <ListGroup className="List-group">
        //             <Row className="justify-content">
        //                 <Col sm={12} md={4} className="text-center mb-3">
        //                     <Card.Img src={user.avatar} className="card-image img-fluid" />
        //                 </Col>
        //                 <Col md={4} className="m-3">
        //                     <Card.Title className="username">{user.username}</Card.Title>
        //                     <Card.Subtitle className="email">{user.email}</Card.Subtitle>
        //                 </Col>
        //             </Row>
        //         </ListGroup>
        //         <ListGroup>
        //             <ListGroupItem className="m-3">
        //                 <Card.Subtitle><span>Sobre {user.username}: </span> {user.description} </Card.Subtitle>
        //             </ListGroupItem>
        //             <Card.Text className="m-2"><span>Género: </span>{user.gender}</Card.Text>
        //             <Card.Text className="m-2"><span>Edad: </span>{user.age}</Card.Text>
        //             <Card.Text className="m-2"><span>Intereses: </span>{user.interests}</Card.Text>
        //         </ListGroup>
        //     </Card.Body>
        // </Card>
    )
}

export default UserProfileCard