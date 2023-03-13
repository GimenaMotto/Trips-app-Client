import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NewTripPage from '../pages/NewTripPage/NewTripPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import TripPage from '../pages/TripsPage/TripsPage'
import TripDetailsPage from '../pages/TripDetailsPage/TripDetailsPage'
import EditTripPage from '../pages/EditTripPage/EditTripPage'
import PrivateRoute from './PrivateRoute'
import UsersPage from '../pages/UsersPage/UsersPage'
import UsersProfilePage from '../pages/UserProfilePage/UserProfilePage'


const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/registro' element={<SignupPage />} />
            <Route path='/iniciar-sesion' element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path='/viajes' element={<TripPage />} />
                <Route path='/detalles/:trip_id' element={<TripDetailsPage />} />
                <Route path='/crear-viaje' element={<NewTripPage />} />
                <Route path='/editar-viaje/:trip_id' element={<EditTripPage />} />
                <Route path='/comunidad' element={<UsersPage />} />
                <Route path='/perfil/:user_id' element={<UsersProfilePage />} />
                <Route path='/editar-perfil/:user_id' element={<p>Page editar perfil-comp form editar perfil</p>} />
            </Route>

            <Route path='*' element={<p>404</p>} />

        </Routes>
    )
}

export default AppRoutes