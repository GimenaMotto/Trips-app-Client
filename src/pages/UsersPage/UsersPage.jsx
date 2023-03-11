import UsersList from '../../components/UsersList/UsersList'
import './UsersPage.css'
import { Container, Row, Col, Modal } from "react-bootstrap"
import usersService from '../../services/users.services'
import { useContext, useEffect, useState } from "react"
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard'

const UsersPage = () => {

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        usersService
            .getAllUsers()
            .then(({ data }) => {
                setUsers(data)
            })
    }

    const handleCardClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
        loadUsers(); // Recarga la lista después de cerrar el modal
    };

    return (
        <>
            <Container className="UsersPage">
                <Row>
                    <Col >
                        <hr />
                        <h3>Comunidad usuarios de 360</h3>
                        <hr />
                        <UsersList users={users} onUserClick={handleCardClick} />
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton> <Modal.Title>Perfil de usuario</Modal.Title></Modal.Header>
                <Modal.Body>
                    {selectedUser && <UserProfileCard user={selectedUser} />}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UsersPage




// import UsersList from '../../components/UsersList/UsersList'
// import './UsersPage.css'
// import { Container, Row, Col, Modal } from "react-bootstrap"
// import usersService from '../../services/users.services'
// import { useContext, useEffect, useState } from "react"
// import UserProfileModal from '../../components/UserProfileModal/UserProfileModal'

// const UsersPage = () => {

//     const [users, setUsers] = useState([])
//     const [userId, setUserid] = useState(null)

//     useEffect(() => {
//         loadUsers()
//     }, [])

//     const loadUsers = () => {
//         usersService
//             .getAllUsers()
//             .then(({ data }) => {
//                 setUsers(data)
//             })
//     }

//     const handleUserClick = (userId) => {
//         setUserid(userId)
//     }

//     const handleCloseModal = () => {
//         setUserid(null)
//     }

//     return (
//         <>
//             <Container className="UsersPage">
//                 <Row>
//                     <Col >
//                         <hr />
//                         <h3>Comunidad usuarios de 360</h3>
//                         <hr />
//                         <UsersList users={users} handleUserClick={handleUserClick} />
//                     </Col>
//                 </Row>
//             </Container>

//             <UserProfileModal showModal={!!userId} user={userId} onClose={handleCloseModal} />
//         </>
//     )
// }

// export default UsersPage







// import UsersList from '../../components/UsersList/UsersList'
// import './UsersPage.css'
// import { Container, Row, Col, Modal } from "react-bootstrap"
// import usersService from '../../services/users.services'
// import { useContext, useEffect, useState } from "react"
// import UserProfileCard from '../../components/UserProfileCard/UserProfileCard'

// const UsersPage = () => {

//     const [users, setUsers] = useState([])
//     const [showModal, setShowModal] = useState(false)

//     useEffect(() => {
//         loadUsers()
//     }, [])

//     const loadUsers = () => {
//         usersService
//             .getAllUsers()
//             .then(({ data }) => {
//                 setUsers(data)
//             })
//     }

//     const fireFinalActions = () => {
//         setShowModal(false)
//         loadUsers()
//     }

//     return (
//         <>
//             <Container className="UsersPage">
//                 <Row>
//                     <Col >
//                         <hr />
//                         <h3>Comunidad usuarios de 360</h3>
//                         <hr />
//                         <UsersList users={users} />
//                     </Col>
//                 </Row>
//             </Container>

//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton> <Modal.Title>Perfil de usuario</Modal.Title></Modal.Header>
//                 <Modal.Body>
//                     <UserProfileCard fireFinalActions={fireFinalActions} />
//                 </Modal.Body>
//             </Modal>
//         </>
//     )
// }

// export default UsersPage
