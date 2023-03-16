import './UserProfileCard.css'
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import usersService from '../../services/users.services'
import { Row, Col, Image, Button } from "react-bootstrap"
import { AuthContext } from '../../contexts/auth.context'

const UserProfileCard = (props) => {

    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const { user_id } = useParams()

    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = () => {
        usersService
            .getOneUser(user_id)
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err))
    }

    return (

        <Row className="py-5 px-4 ProfilCard">
            <Col md={10} className="mx-auto">
                <div className="bg-white shadow rounded overflow-hidden">
                    <div className="px-4 pt-0 pb-4 cover-cardUser">
                        <div className="media align-items-end profile-head">
                            <div className="profile mr-3">
                                <Image src={userData.avatar} alt="..." width="200" className="rounded mb-2 img-thumbnail" />
                                {(user._id === user_id || user.role === 'ADMIN') && <Button href={`/editar-perfil/${user_id}`} className="m-3" variant="outline-light" size="sm" block>Edit profile</Button>}

                            </div>
                            <div className="media-body mb-5 text-white">
                                <h4 className="mt-0 mb-1">{userData.username}</h4>
                                <p className="mb-0">{userData.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3">
                        <h5 className="mb-0 black">Sobre mi: </h5>
                        <p className="font-italic mb-0 black">{userData.description}</p>
                        <div className="p-4 rounded shadow-sm bg-light">
                            <p className="font-italic mb-0 ">Edad: {userData.age}</p>
                            <p className="font-italic mb-0 ">Género: {userData.gender}</p>
                            <p className="font-italic mb-0 ">Intereses: {userData.interests}</p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

    )
}

export default UserProfileCard