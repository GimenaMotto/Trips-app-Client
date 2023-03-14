import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import AppRoutes from './routes/AppRoutes'
import UserMessage from './components/UserMessage/UserMessage'
import { useContext } from 'react'
import { ThemeContext } from './contexts/theme.context'


const App = () => {

  const { themeValue } = useContext(ThemeContext)

  return (
    <div className={`App ${themeValue}`}>

      <Navigation />

      <AppRoutes />

      <Footer />

      <UserMessage />

    </div>
  );
}

export default App
