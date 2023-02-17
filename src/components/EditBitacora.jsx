import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Swal from 'sweetalert2'
import { useBitacoraContext } from '../hooks/useBitacoraContext';
import Select from 'react-select';
import axios from 'axios';


export const EditBitacora = ({ bitacora, setShow }) => {

    const { dispatch } = useBitacoraContext();

    const { user } = useAuthContext();

    const [titulo, setTitulo] = useState(`${bitacora.titulo}`);
    const [descripcion, setDescripcion] = useState(`${bitacora.descripcion}`);
    const [paciente_id, setPaciente_id] = useState(`${bitacora.paciente_id}`);

    const [error, setError] = useState(null);   
    const [emptyFields, setEmptyFields] = useState([]);

    const [option, setOption] = useState([""])

     //Obtener los pacientes

     useEffect(() => {
      
        const getData = async () => {
  
          const arr = [];
  
          await axios.get('api/pacientes/', { headers : { 'Authorization' : `Bearer ${user.token}` } } )
          .then( (res) => {
  
            let result = res.data;
  
            result.map(( paciente ) => {
              
              return arr.push( { value : paciente._id, label : paciente.nombre } );
  
            });
  
            setOption( arr ); //Guardamos los datos en las opciones 
  
          });
  
        }
  
        getData(); //Ejecutamos la peticion
        
      }, [ user ])

      const handleSubmit = async ( e ) => {

        e.preventDefault();
  
        if( !user ) {
            setError( 'Debes estar logeado' );
            return;
        }
  
        const editBitacora = {
  
            _id : bitacora._id,
            titulo : titulo,
            descripcion : descripcion,
            paciente_id : paciente_id,
            user_id : bitacora.user_id,
            createdAt : bitacora.createdAt,
            updatedAt: bitacora.updatedAt
  
        }
  
        //Realizamos la llamada a la api
  
        const response = await fetch('/api/bitacoras/' + bitacora._id , {
            method: 'POST',
            body: JSON.stringify(editBitacora),
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
            
            setError(null)
            setEmptyFields([])
            dispatch({type: 'UPDATE_BITACORA', payload: editBitacora})
            Swal.fire('Correcto!!', `El usuario ${titulo} se modifico con exito`, 'success' );
          }
      } 

    
    return(
        <div className='create'>
            <form className='create-form' onSubmit = {handleSubmit}>

                <label> Titulo : </label>
                <input type = "text" required onChange = { (e) => setTitulo( e.target.value ) } value = {titulo} placeholder = "Escriba el Titulo" className = { emptyFields.includes('Titulo') ? 'error' : '' } />

                <label> Descripcion : </label>
                <textarea type = "text" required onChange = { (e) => setDescripcion( e.target.value ) } value = {descripcion} className = { emptyFields.includes('Descripcion') ? 'error' : '' }  cols="43" rows="5"  />

                <label> Paciente : </label>
                
                <Select
                  defaultInputValue={paciente_id}
                  className="basic-single"
                  classNamePrefix="select"
                  isLoading={true}
                  isClearable={true}
                  isSearchable={true}
                  name="color"
                  options={option}
                  onChange={(choice) => setPaciente_id(choice.label)}
                />

                { console.log(paciente_id) }

                <br></br>

                <button onClick={() => setShow(false)}> Edit Bitacora </button>

                {error && <div className="error">{error}</div>}

            </form>
        </div>
    );

}
