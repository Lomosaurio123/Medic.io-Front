import React from 'react'
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Swal from 'sweetalert2'
import { usePacientesContext } from '../hooks/usePacienteContext';

export const EditPaciente = ({ paciente, setShow }) => {


    const { user } = useAuthContext();

    const [nombre, setNombre] = useState(`${paciente.nombre}`);
    const [apellidoMaterno, setApellidoMaterno] = useState(`${paciente.apellidoMaterno}`);
    const [apellidoPaterno, setApellidoPaterno] = useState(`${paciente.apellidoPaterno}`);
    const [edad, setEdad] = useState(paciente.edad);
    const [email, setEmail] = useState(`${paciente.email}`);
    const [tel, setTel] = useState(paciente.tel);
    const [CURP, setCURP] = useState(`${paciente.CURP}`);
    const [tipoSangre, setTipoSangre] = useState(`${paciente.tipoSangre}`);
    const [peso, setPeso] = useState(paciente.peso);
    const [error, setError] = useState(null);   
    const [emptyFields, setEmptyFields] = useState([]);

    const { dispatch } = usePacientesContext();    

    const handleSubmit = async ( e ) => {

      e.preventDefault();

      if( !user ) {
          setError( 'Debes estar logeado' );
          return;
      }

      const editPaciente = {

          _id : paciente._id,
          nombre : nombre,
          apellidoMaterno : apellidoMaterno,
          apellidoPaterno : apellidoPaterno,
          edad : edad,
          email : email,
          tel : tel,
          CURP : CURP,
          tipoSangre : tipoSangre,
          peso : peso,
          user_id : paciente.user_id,
          createdAt : paciente.createdAt,
          updatedAt: paciente.updatedAt

      }

      //Realizamos la llamada a la api

      const response = await fetch('/api/pacientes/' + paciente._id , {
          method: 'POST',
          body: JSON.stringify(editPaciente),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
          setNombre('');
          setApellidoMaterno('');
          setApellidoPaterno('');
          setEdad('');
          setEmail('');
          setTel('');
          setCURP('');
          setTipoSangre('');
          setPeso('');
          setError(null)
          setEmptyFields([])
          dispatch({type: 'UPDATE_PACIENTE', payload: editPaciente})
          Swal.fire('Correcto!!', `El usuario ${nombre} se modifico con exito`, 'success' );
        }
    } 

    return (
        
        <div className='create'>
            <form className='create-form' onSubmit = {handleSubmit}>

                <label> Nombre : </label>
                <input type = "text" required onChange = { (e) => setNombre( e.target.value ) } value = {nombre} placeholder = "Escriba el Nombre" className = { emptyFields.includes('Nombre') ? 'error' : '' } />

                <label> Apellido Paterno : </label>
                <input type = "text" required onChange = { (e) => setApellidoPaterno( e.target.value ) } value = {apellidoPaterno} placeholder = "Escriba el Apellido Paterno" className = { emptyFields.includes('ApellidoPaterno') ? 'error' : '' } />

                <label> Apellido Materno : </label>
                <input type = "text" required onChange = { (e) => setApellidoMaterno( e.target.value ) } value = {apellidoMaterno} placeholder = "Escriba el Apellido Materno" className = { emptyFields.includes('ApellidoMaterno') ? 'error' : '' } />

                <label> Edad : </label>
                <input type = "number" required onChange = { (e) => setEdad( e.target.value ) } value = {edad} placeholder = "Escriba la Edad" className = { emptyFields.includes('Edad') ? 'error' : '' }  />

                <label> Email : </label>
                <input type = "email" required onChange = { (e) => setEmail( e.target.value ) } value = {email} placeholder = "Escriba el Email" className = { emptyFields.includes('Email') ? 'error' : '' } />

                <label> Tel : </label>
                <input type = "number" required onChange = { (e) => setTel( e.target.value ) } value = {tel} placeholder = "Escriba el Telefono" className = { emptyFields.includes('Tel') ? 'error' : '' } />

                <label> Curp : </label>
                <input type = "text" required onChange = { (e) => setCURP( e.target.value ) } value = {CURP} placeholder = "Escriba el CURP" className = { emptyFields.includes('CURP') ? 'error' : '' } />

                <label> Tipo de Sangre : </label>
                <input type = "text" required onChange = { (e) => setTipoSangre( e.target.value ) } value = {tipoSangre} placeholder = "Escriba el Tipo de Sangre" className = { emptyFields.includes('TipoDeSangre') ? 'error' : '' } />

                <label> Peso (kg) : </label>
                <input type = "number" required onChange = { (e) => setPeso( e.target.value ) } value = {peso} placeholder = "Escriba el Peso"  className = { emptyFields.includes('Peso') ? 'error' : '' } />

                <button onClick={() => setShow(false)} > Edit Paciente </button>

                {error && <div className="error">{error}</div>}

            </form>
        </div>


    )
}
