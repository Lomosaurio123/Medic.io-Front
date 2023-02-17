import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Paguinas y componentes
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import { PacientesPage } from './pages/PacientesPage';
import { BitacorasPage } from './pages/BitacorasPage';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { useAuthContext } from './hooks/useAuthContext';
import { DiagnosticPage } from './pages/DiagnosticPage';

function App() {

  const { user } = useAuthContext();

  return (
    <div className="App">


      <BrowserRouter>

        <Navbar/>

        <div className='pages'>

          <Routes>

            <Route path='/' element = { user ? <HomePage/> : <Navigate to = "/login" /> } />

            <Route path='/login' element = { !user ? <LogInPage/> : <Navigate to = "/" /> } />

            <Route path='/signup' element = { !user  ? <SignUpPage/> : <Navigate to = "/" /> } />

            <Route path='/pacientes' element = { user ? <PacientesPage/> : <Navigate to = "/login" /> } />
            
            <Route path='/bitacoras' element = { user ? <BitacorasPage/> : <Navigate to = "/login" /> } />

            <Route path='/diagnosticos' element = { user ? <DiagnosticPage/> : <Navigate to = "/login" /> } />

          </Routes>

        </div>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
