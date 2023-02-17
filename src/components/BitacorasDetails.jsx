import React from 'react'
import Modal from 'react-bootstrap/Modal';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useBitacoraContext } from '../hooks/useBitacoraContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { EditBitacora } from './EditBitacora';

export const BitacorasDetails = ({ bitacora }) => {

    const { user } = useAuthContext();

    //Ventana para editar pacientes

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { dispatch } = useBitacoraContext();

    useEffect(() => {
    
        AOS.init()
      
      }, [])

    const handleClick = () => {

        if( !user ) {
            return;
        }

        axios.delete( '/api/bitacoras/' + bitacora._id, { headers : { 'Authorization' : `Bearer ${user.token}` } } ).then( res => {

            dispatch({ type : 'DELETE_BITACORA', payload : res.data });
            
         }).catch( (err) => {console.log(err)} );

    }

    return (
        <div className = 'card-details' data-aos = "fade-up" >

            <h4> {bitacora.titulo} </h4>
            <p> <strong> Paciente : </strong> {bitacora.paciente_id} </p>
            <p> <strong> Descripcion : </strong> {bitacora.descripcion} </p>
            <p> {formatDistanceToNow( new Date( bitacora.createdAt ), { addSuffix : true } )} </p>
            <span className='material-symbols-outlined edit' onClick={handleShow} > edit </span>
            <span className='material-symbols-outlined delete' onClick={handleClick}> delete </span>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                <Modal.Title>Editar Bitacora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditBitacora key = { bitacora._id } bitacora = { bitacora }  setShow={(bool) => setShow(bool)} />
                </Modal.Body>

            </Modal>

        </div>
    );
}
