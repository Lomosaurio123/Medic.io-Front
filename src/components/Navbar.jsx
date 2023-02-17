import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';


export const Navbar = () => {

  const { logout } = useLogout();

  const { user } = useAuthContext();


  useEffect(() => {
    
    AOS.init()
  
  }, [])

  const handleClick = () => {

    logout();

  };

  return (
    <header>
        <div className='container'  data-aos = "fade-up">

            <Link to = '/'>
                <strong style={{fontSize : 26}} > Medic.io &#127977; </strong>
            </Link>

            {user && (<>

                <Link to = '/pacientes'>
                  <strong style={{fontSize : 18}} > Pacientes </strong>
                </Link>

                <Link to = '/bitacoras'>
                  <strong style={{fontSize : 18}} > Bitacoras </strong>
                </Link>

                <Link to = '/diagnosticos'>
                  <strong style={{fontSize : 18}} > Diagnostico IA </strong>
                </Link>  

              </>
            )}

            <nav>

              {user && (<div>

                  <span> <strong> Bienvenido: &nbsp;</strong>  {user.email}</span>
                  <button onClick={handleClick} > Log Out </button>

                </div>
              )}

              {!user && (<div>

                <Link to = "/login"> Log In </Link>
                <Link to = "/signup"> Sign Up </Link>

              </div>)}

            </nav>

        </div>
    </header>
  );
}
