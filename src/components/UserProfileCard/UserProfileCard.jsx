import './UserProfileCard.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import usersService from '../../services/users.services'
import { MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit'



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

        <div>
            <MDBCard>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                        <MDBCardImage src={user.avatar}
                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                    </div>
                    <div className="ms-3" style={{ marginTop: '130px' }}>
                        <MDBTypography tag="h5">{user.username}</MDBTypography>
                        <MDBCardText>{user.email}</MDBCardText>
                    </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="d-flex justify-content-end text-center py-1">

                    </div>
                </div>
                <MDBCardBody className="text-black p-4">
                    <div className="mb-5">
                        <p className="lead fw-normal mb-1">About {user.username}</p>
                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <MDBCardText className="font-italic mb-1">{user.description}</MDBCardText>
                            <MDBCardText className="font-italic mb-1">Intereses: {user.interests}</MDBCardText>
                            <MDBCardText className="font-italic mb-0">Género: {user.gender}</MDBCardText>
                        </div>
                    </div>
                </MDBCardBody>
            </MDBCard>

        </div>
    )
}

export default UserProfileCard