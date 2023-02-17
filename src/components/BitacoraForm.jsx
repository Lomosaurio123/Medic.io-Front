import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useBitacoraContext } from '../hooks/useBitacoraContext';
import { useAuthContext } from '../hooks/useAuthContext'
import Select from 'react-select';
import axios from 'axios';

export const BitacoraForm = () => {

    const { user } = useAuthContext();
    const { dispatch } = useBitacoraContext();


    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [paciente_id, setPaciente_id] = useState('');

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

        const bitacora = {

            titulo : titulo,
            descripcion : descripcion,
            paciente_id : paciente_id

        }

        //Realizamos la llamada a la api

        const response = await fetch('/api/bitacoras', {
            method: 'POST',
            body: JSON.stringify(bitacora),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })
          
          const json = await response.json()
      
          if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
          }
          if (response.ok) {
            setTitulo('');
            setDescripcion('');
            setPaciente_id('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: 'CREATE_BITACORA', payload: json})
            Swal.fire('Correcto!!', `Datos guardados con exito`, 'success' );
          }
    }


    // Llamamos a los pacientes para ponerlos en el select



    return (

        <div className='create'>
            <form className='create-form' onSubmit = {handleSubmit}>

                <strong style={{fontSize : 25}} > Agregar Bitacora </strong>

                <br />
                <br />

                <label> Titulo : </label>
                <input type = "text" required onChange = { (e) => setTitulo( e.target.value ) } value = {titulo} placeholder = "Escriba el Titulo" className = { emptyFields.includes('Titulo') ? 'error' : '' } />

                <label> Descripcion : </label>
                <textarea type = "text" required onChange = { (e) => setDescripcion( e.target.value ) } value = {descripcion} className = { emptyFields.includes('Descripcion') ? 'error' : '' }  cols="43" rows="5"  />

                <label> Paciente : </label>
                
                <Select
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

                <button> Add Bitacora </button>

                {error && <div className="error">{error}</div>}

            </form>
        </div>

    );
}