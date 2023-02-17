import { useReducer } from "react";
import { createContext } from "react";

export const BitacoraContext = createContext();

export const bitacoraReducer = ( state, action ) => {
    
    switch ( action.type ) {
        
        case 'SET_BITACORA':
            return {
                bitacoras : action.payload
            };
        
        case 'CREATE_BITACORA' :
            return {
                bitacoras : [ action.payload, ...state.bitacoras ]
            };

        case 'DELETE_BITACORA' : 
            return {
                bitacoras : state.bitacoras.filter((bitacora) => bitacora._id !== action.payload._id )
            }
        
        case 'UPDATE_BITACORA':
            const updatedBitacora = state.bitacoras.map(bitacora => {
                if (bitacora._id === action.payload._id) {
                    return { ...bitacora, ...action.payload};
                }
                    return bitacora;
            });
                
        return { bitacoras: updatedBitacora };

        default:
            return state;
    }

} 

export const BitacoraContextProvider = ( { children } ) => {

    const [state, dispatch] = useReducer( bitacoraReducer, {
       bitacoras : null 
    } );


    return (
        <BitacoraContext.Provider value = { {...state, dispatch} } >

            { children }
            
        </BitacoraContext.Provider>
    );

}