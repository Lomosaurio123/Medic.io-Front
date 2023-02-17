import React from 'react'
import Modal from 'react-bootstrap/Modal';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { usePacientesContext } from '../hooks/usePacienteContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { EditPaciente } from '../components/EditPaciente'


export const PacientesDetails = ({ paciente }) => {

    const { user } = useAuthContext();

    const { dispatch } = usePacientesContext();

    //Ventana para editar pacientes

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Efecto de la pagina con la libreria AOS

    useEffect(() => {
    
        AOS.init()
      
      }, []);

    //Llamada a la API para eliminar paciente
    
    const handleClick = () => {

        if( !user ) {
            return;
        }

        axios.delete( '/api/pacientes/' + paciente._id, { headers : { 'Authorization' : `Bearer ${user.token}` } } ).then( res => {

            dispatch({ type : 'DELETE_PACIENTE', payload : res.data });
            
         }).catch( (err) => {console.log(err)} );

    }

    return (
        <div className = 'card-details' data-aos = "fade-up" >

            <h4 className='paciente-name'> {paciente.nombre} {paciente.apellidoPaterno} </h4>
            <p> <strong> Edad : </strong> {paciente.edad} </p>
            <p> <strong> Email : </strong> {paciente.email} </p>
            <p> <strong> Tel : </strong> {paciente.tel} </p>
            <p> <strong> CURP : </strong> {paciente.CURP} </p>
            <p> <strong> Sangre : </strong> {paciente.tipoSangre} </p>
            <p> <strong> Peso (kg) : </strong> {paciente.peso} </p>
            <p> {formatDistanceToNow( new Date( paciente.updatedAt ), { addSuffix : true } )} </p>
            <span className='material-symbols-outlined edit' onClick={ handleShow }> edit </span>
            <span className='material-symbols-outlined delete' onClick={ handleClick }> delete </span>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                <Modal.Title>Editar Paciente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditPaciente key = { paciente._id } paciente = { paciente }  setShow={(bool) => setShow(bool)} />
                </Modal.Body>

            </Modal>

        </div>

    );
}
