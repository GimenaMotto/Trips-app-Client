import './UserCard.css'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'

const UserCard = ({ username, avatar, age, gender, _id }) => {

    return (

        // <Link to={`/perfil/${_id}`}>
        //     <div class="row py-5 px-4">
        //         <div class="col-md-5 mx-auto">
        //             <div class="bg-white shadow rounded overflow-hidden">
        //                 <div class="px-4 pt-0 pb-4 cover">
        //                     <div class="media align-items-end profile-head">
        //                         <div class="profile mr-3">
        //                             <img src={avatar} alt="..." width="130" class="rounded mb-2 img-thumbnail" />
        //                             <a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
        //                         </div>
        //                         <div class="media-body mb-5 text-white">
        //                             <h4 class="mt-0 mb-0">{username}</h4>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="bg-light p-4 d-flex justify-content-end text-center">
        //                 </div>
        //                 <div class="px-4 py-3">
        //                     <h5 class="mb-0">Sobre {username}: </h5>
        //                     <div class="p-4 rounded shadow-sm bg-light">
        //                         <p class="font-italic mb-0">Edad: {age}</p>
        //                         <p class="font-italic mb-0">Género: {gender}</p>
        //                     </div>
        //                 </div>
        //                 <div class="py-4 px-4">
        //                     <div class="d-flex align-items-center justify-content-between mb-3">
        //                         <h5 class="mb-0">Recent photos</h5>
        //                         <a href="#" class="btn btn-link text-muted">Show all</a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Link>



        <Link to={`/perfil/${_id}`}>
            <Card style={{ width: '18rem' }} className="mb-5 Usercard">
                < Card.Body className="d-flex flex-wrap align-items-center">
                    <Card.Img className='rounded-circle img mov-img' variant="top" src={avatar} />
                    <Card.Title className="m-3 text-center">{username}</Card.Title>
                    <ListGroup variant="flush" className="m-3">
                        <ListGroup.Item className="m-2 mt-2 background-group">
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


//     < Link to = {`/perfil/${_id}`}>
//         <Card className="mb-5 Usercard">
//             <div className="d-flex flex-wrap align-items-center">
//                 <div className="col-lg-4 col-md-12">
//                     <Card.Img
//                         className="rounded-circle img-fluid mov-img"
//                         variant="top"
//                         src={avatar}
//                     />
//                 </div>
//                 <div className="col-lg-8 col-md-12">
//                     <Card.Body>
//                         <Card.Title className="m-3">{username}</Card.Title>
//                         <ListGroup variant="flush" className="m-3">
//                             <ListGroup.Item className="m-2 mt-2 background-group">
//                                 <Card.Subtitle className="text-muted">
//                                     Edad: {age}
//                                 </Card.Subtitle>
//                             </ListGroup.Item>
//                             <ListGroup.Item className="m-2 background-group">
//                                 <Card.Subtitle className="text-muted">
//                                     Género: {gender}
//                                 </Card.Subtitle>
//                             </ListGroup.Item>
//                         </ListGroup>
//                     </Card.Body>
//                 </div>
//             </div>
//         </Card>
// </Link >