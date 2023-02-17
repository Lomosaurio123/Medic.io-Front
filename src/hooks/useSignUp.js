import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Swal from 'sweetalert2'

export const useSignup = () => {

    const[error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (email, nombre, apellidoPaterno, apellidoMaterno, edad, especialidad, tel , password) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch( '/api/user/signup', {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify({email, nombre, apellidoPaterno, apellidoMaterno, edad, especialidad, tel , password})
        })

        const json = await response.json();

        if( !response.ok ) {
            
            setIsLoading(false);
            setError(json.error);  

        }

        if( response.ok ) {

            Swal.fire('Usuario Creado Correctamente!!!', `Bienvenido`, 'success' );

            // Guardar el usuario en el local storage
            localStorage.setItem( 'user', JSON.stringify(json) );

            //Actualizar AuthContext
            dispatch( { type : 'LOGIN',  payload : json } );

            setIsLoading(false);

        }

    };

    return{ signup, isLoading, error };

}