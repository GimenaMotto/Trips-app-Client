import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard'
import { Link } from 'react-router-dom'

const UsersProfilePage = () => {

    return (

        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <UserProfileCard />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <Link to="javascript:history.back()" className="btn btn-outline-dark">Volver</Link>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default UsersProfilePage