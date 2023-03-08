import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NewTripPage from '../pages/NewTripPage/NewTripPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import TripPage from '../pages/TripsPage/TripsPage'
import TripDetailsPage from '../pages/TripDetailsPage/TripDetailsPage'
import EditTripPage from '../pages/EditTripPage/EditTripPage'
import PrivateRoute from './PrivateRoute'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/viajes' element={<TripPage />} />
            <Route path='/registro' element={<SignupPage />} />
            <Route path='/iniciar-sesion' element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path='/detalles/:trip_id' element={<TripDetailsPage />} />
                <Route path='/crear-viaje' element={<NewTripPage />} />
                <Route path='/editar-viaje/:trip_id' element={<EditTripPage />} />
            </Route>


            <Route path='/perfil/:id ' element={<p>Page perfil- comp detalles perfil id</p>} />
            <Route path='/editar-perfil/:id' element={<p>Page editar perfil-comp form editar perfil</p>} />
            <Route path='*' element={<p>404</p>} />

        </Routes>
    )
}

export default AppRoutes