import { useAuthContext } from './useAuthContext'
import { usePacientesContext } from './usePacienteContext';
import { useBitacoraContext } from './useBitacoraContext';

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch : pacientesDispatch } = usePacientesContext();
    const { dispatch : bitacorasDispatch } = useBitacoraContext();

    const logout = () => {

        //quitar el usuario del storage

        localStorage.removeItem( 'user' );

        //dispatch logout action

        dispatch({ type : 'LOGOUT' });

        pacientesDispatch({ type : 'SET_PACIENTES', payload : null });

        bitacorasDispatch({ type : 'SET_BITACORA', payload : null });

    };
    
    return {logout};

};
