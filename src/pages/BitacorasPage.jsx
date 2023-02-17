import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useBitacoraContext } from '../hooks/useBitacoraContext';
import { useAuthContext } from '../hooks/useAuthContext'
import { BitacorasDetails } from '../components/BitacorasDetails'
import { BitacoraForm } from '../components/BitacoraForm'

export const BitacorasPage = () => {

    const { bitacoras , dispatch } = useBitacoraContext();
    const { user } = useAuthContext();

    useEffect(() => {
    
        AOS.init()
      
      }, [])


    useEffect(() => {

        const fethBitacoras = async () => {
            axios.get('api/bitacoras/', { headers : { 'Authorization' : `Bearer ${user.token}` } } ).then(res => {
                dispatch( { type : 'SET_BITACORA', payload : res.data } )
            }).catch(err =>{console.log(err)});    
        }
        if( user ) {
            fethBitacoras();
        }

    }, [dispatch,user])
    

    return (

        <div className='home'>

            <div className='bitacoras' data-aos = "fade-up">

                <strong style={{fontSize : 30}} > Bitacoras &#9997; </strong>

                { bitacoras && bitacoras.map( ( bitacora ) => ( 
                    
                    <BitacorasDetails key = { bitacora._id } bitacora = { bitacora } /> 

                ))}

            </div>

            <BitacoraForm/>

        </div>
    );
}