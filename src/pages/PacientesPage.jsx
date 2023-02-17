import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { PacientesDetails } from '../components/PacientesDetails';
import { PacienteForm } from '../components/PacienteForm';
import { usePacientesContext } from '../hooks/usePacienteContext';
import { useAuthContext } from '../hooks/useAuthContext'


export const PacientesPage = () => {

    const { pacientes, dispatch } = usePacientesContext();
    const { user } = useAuthContext();

    useEffect(() => {
    
        AOS.init()
      
      }, [])


    useEffect(() => {

        const fethWorkout = async () => {
            axios.get('api/pacientes/', { headers : { 'Authorization' : `Bearer ${user.token}` } } ).then(res => {
                dispatch( { type : 'SET_PACIENTES', payload : res.data } )
            }).catch(err =>{console.log(err)});    
        }
        if( user ) {
            fethWorkout();
        }

    }, [dispatch,user])
    

    return (

        <div className='home'>

            <div className='pacientes' data-aos = "fade-up">

                <strong style={{fontSize : 30}} > Pacientes &#128106; </strong>

                { pacientes && pacientes.map( ( paciente ) => ( 
                    
                    <PacientesDetails key = { paciente._id } paciente = { paciente } /> 

                ))}

            </div>

            <PacienteForm/>

        </div>
    );
}
