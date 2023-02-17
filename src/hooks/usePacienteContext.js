import { useContext } from "react";
import { PacienteContext } from "../context/PacienteContext";

export const usePacientesContext = () => {
    const context = useContext( PacienteContext );

    if( !context ) {

        throw Error('usePacientesContext must be used inside an PacientesContextProvider');

    }

    return context;
}