import { useContext } from "react";
import { BitacoraContext } from "../context/BitacoraContext";

export const useBitacoraContext = () => {
    const context = useContext( BitacoraContext );

    if( !context ) {

        throw Error('useBitacoraContext must be used inside an BitacoraContextProvider');

    }

    return context;
}