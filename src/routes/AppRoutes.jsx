import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<p>tiki tiki home home</p>} />
            <Route path='/viajes' element={<p>Page viajes- comp todos los viajes</p>} />
            <Route path='/crear-viaje' element={<p>Page crear viaje- comp form crear</p>} />
            <Route path='/detalles/:id' element={<p>Page detalles- comp detalles</p>} />
            <Route path='/editar-viaje/:id' element={<p>Page editar-comp form editar</p>} />
            <Route path='/registro' element={<SignupPage />} />
            <Route path='/iniciar-sesion' element={<p>Page login -comp form login</p>} />
            <Route path='/perfil/:id ' element={<p>Page perfil- comp detalles perfil id</p>} />
            <Route path='/editar-perfil/:id' element={<p>Page editar perfil-comp form editar perfil</p>} />
            <Route path='*' element={<p>404</p>} />

        </Routes>
    )
}

export default AppRoutes