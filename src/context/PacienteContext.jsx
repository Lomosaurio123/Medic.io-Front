import { useReducer } from "react";
import { createContext } from "react";

export const PacienteContext = createContext();

export const pacienteReducer = ( state, action ) => {
    
    switch ( action.type ) {
        case 'SET_PACIENTES':
            return {
                pacientes : action.payload
            };
        
        case 'CREATE_PACIENTE' :
            return {
                pacientes : [ action.payload, ...state.pacientes ]
            };

        case 'DELETE_PACIENTE' : 
            return {
                pacientes : state.pacientes.filter((paciente) => paciente._id !== action.payload._id )
            }
        
        case 'UPDATE_PACIENTE':
            const updatedPacientes = state.pacientes.map(paciente => {
                if (paciente._id === action.payload._id) {
                    return { ...paciente, ...action.payload};
                }
                    return paciente;
            });
            
            return { pacientes: updatedPacientes };

        default:
            return state;
    }

} 

export const PacienteContextProvider = ( { children } ) => {

    const [state, dispatch] = useReducer( pacienteReducer, {
       paciente : null 
    } );


    return (
        <PacienteContext.Provider value = { {...state, dispatch} } >

            { children }
            
        </PacienteContext.Provider>
    );

}