import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard'


const UsersProfilePage = () => {

    return (

        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <UserProfileCard />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default UsersProfilePage