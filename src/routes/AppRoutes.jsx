import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import NewTripPage from '../pages/NewTripPage/NewTripPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import TripPage from '../pages/TripsPage/TripsPage'
import TripDetailsPage from '../pages/TripDetailsPage/TripDetailsPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<p>tiki tiki home home</p>} />
            <Route path='/viajes' element={<TripPage />} />
            <Route path='/crear-viaje' element={<NewTripPage />} />
            <Route path='/detalles/:trip_id' element={<TripDetailsPage />} />
            <Route path='/editar-viaje/:trip_id' element={<p>Page editar-comp form editar</p>} />
            <Route path='/registro' element={<SignupPage />} />
            <Route path='/iniciar-sesion' element={<LoginPage />} />
            <Route path='/perfil/:id ' element={<p>Page perfil- comp detalles perfil id</p>} />
            <Route path='/editar-perfil/:id' element={<p>Page editar perfil-comp form editar perfil</p>} />
            <Route path='*' element={<p>404</p>} />

        </Routes>
    )
}

export default AppRoutes