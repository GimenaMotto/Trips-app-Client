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

        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Img src={user.avatar} />
                    </Col>
                    <Col>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Subtitle>{user.email}</Card.Subtitle>
                    </Col>
                </Row>
                <ListGroup>
                    <ListGroupItem className="m-3">
                        <Card.Text><span>Sobre {user.username}: </span> {user.description} </Card.Text>
                    </ListGroupItem>
                    <ListGroupItem className="m-1">
                        <Card.Text><span>Intereses: </span>{user.interests}</Card.Text>
                    </ListGroupItem>
                    <ListGroupItem className="m-1">
                        <Card.Text><span>Género: </span>{user.gender}</Card.Text>
                    </ListGroupItem>
                </ListGroup>
            </Card.Body>
        </Card>

        // <div>
        //     <Card>
        //         <div className="rounded-top text-white d-flex flex-row cardBlack">
        //             <div className="ms-4 mt-5 d-flex flex-column columnCard">
        //                 <Card.Image src={user.avatar}
        //                     alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail imageCard" fluid style={{ width: '150px', zIndex: '1' }} />

        //             </div>
        //             <div className="ms-3" style={{ marginTop: '130px' }}>
        //                 <Card.Text tag="h5">{user.username}</Card.Text>
        //                 <Card.Text>{user.email}</Card.Text>
        //             </div>
        //         </div>
        //         <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
        //             <Button outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
        //                 Edit profile
        //             </Button>
        //             <div className="d-flex justify-content-end text-center py-1">

        //             </div>
        //         </div>
        //         <Card.Body className="text-black p-4">
        //             <div className="mb-5">
        //                 <p className="lead fw-normal mb-1">Sobre {user.username}:</p>
        //                 <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
        //                     <hr />
        //                     <Card.Text className="font-italic mb-1">{user.description}</Card.Text>
        //                     <hr />
        //                     <Card.Text className="font-italic mb-1">Intereses: {user.interests}</Card.Text>
        //                     <hr />
        //                     <Card.Text className="font-italic mb-1">Género: {user.gender}</Card.Text>
        //                 </div>
        //             </div>
        //         </Card.Body>
        //     </Card>

        // </div>
    )
}

export default UserProfileCard