import React from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2'
import { usePacientesContext } from '../hooks/usePacienteContext';
import { useAuthContext } from '../hooks/useAuthContext'

export const PacienteForm = () => {

    const { user } = useAuthContext();
    const { dispatch } = usePacientesContext();

    const [nombre, setNombre] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [edad, setEdad] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [CURP, setCURP] = useState('');
    const [tipoSangre, setTipoSangre] = useState('');
    const [peso, setPeso] = useState('');
    const [error, setError] = useState(null);   
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async ( e ) => {

        e.preventDefault();

        if( !user ) {
            setError( 'Debes estar logeado' );
            return;
        }

        const paciente = {

            nombre : nombre,
            apellidoMaterno : apellidoMaterno,
            apellidoPaterno : apellidoPaterno,
            edad : edad,
            email : email,
            tel : tel,
            CURP : CURP,
            tipoSangre : tipoSangre,
            peso : peso

        }

        //Realizamos la llamada a la api

        const response = await fetch('/api/pacientes' , {
            method: 'POST',
            body: JSON.stringify(paciente),
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
            dispatch({type: 'CREATE_PACIENTE', payload: json})
            Swal.fire('Correcto!!', `El usuario ${paciente.nombre} se creo con exito`, 'success' );
          }
    }

    return (

        <div className='create'>
            <form className='create-form' onSubmit = {handleSubmit}>

                <strong style={{fontSize : 25}} > Agregar Paciente </strong>

                <br />
                <br />

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

                <button> Add Paciente </button>

                {error && <div className="error">{error}</div>}

            </form>
        </div>

    );
}
