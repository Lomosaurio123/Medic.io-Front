import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBitacoraContext } from '../hooks/useBitacoraContext';

export const DiagnosticPage = () => {

    //Definimos el esado del analisis
    
    const [diagnostico, setDiagnostico] = useState('');

    //Traemos el contexto del usuario y las bitacoras

    const { user } = useAuthContext();
    const { dispatch } = useBitacoraContext();


    //Efecto de la pag 

    useEffect(() => {
    
        AOS.init()
      
    }, [])   

    //Comienza el procesa de lectura de imagen 

    const [image, setImage] = useState(null);

    async function handleImageChange(e) {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                
                setImage(reader.result);
                let img = new Image();
                img.src = reader.result;
                img.onload = async () => {

                    if (img.width > 0) {
                        
                        //Reescalado de la imagen para entrar en el modelo
                        let tensor = tf.browser.fromPixels(img).mean(2).toFloat().expandDims(0).expandDims(-1).resizeBilinear( [150,150] );

                        const newTensor = tensor.div( 255 );

                        //Cargamos el modelo
                        const model = await tf.loadLayersModel('http://localhost:3300/model.json');
                        console.log( "Se cargo el modelo" )

                        //Realizamos inferencia en el modelo

                        let prediction = model.predict(newTensor);

                        const result = prediction.dataSync()[0];

                        console.log( result );

                        if ( result > 0.5 ) {

                            Swal.fire('Analisis Finalizado', `No tiene Neumonia`, 'success' );
                            setDiagnostico('Sin Neumonia');

                        } else {

                            Swal.fire('Analisis Finalizado', `tiene Neumonia`, 'success' );
                            setDiagnostico('Con Neumonia');
                            
                        }


                    } else {
                        console.log("La imagen seleccionada no tiene un ancho válido");
                    }
                }
            } catch (error) {
                console.log("Error al abrir la imagen", error);
            }
        };
    
        reader.readAsDataURL(file);

    }

    const handleClick = async (e) => {

        e.preventDefault();

        if( !user ) {
            return;
        }

        const bitacora = {

            titulo : 'Diagnostico Usando IA',
            descripcion : diagnostico,
            paciente_id : 'Selecciona Paciente'

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
      
          if (response.ok) {
            dispatch({type: 'CREATE_BITACORA', payload: json})
            Swal.fire('Finalizado!', `La bitacora ${bitacora.titulo} se creo con exito`, 'success' );
          }

    }
    
    return (

        <div>

            <strong style={{fontSize : 30}} > Diagnostico IA &#129302; </strong>

            <Container fluid className="vertical-center" data-aos = "fade-up">

                <Row>

                    <Col sm>

                    <Form.Control type="file" onChange={handleImageChange} />
                    {diagnostico && <Button onClick={handleClick} data-aos = "fade-up"> Crear Bitacora </Button>}

                    </Col>

                    <Col sm>
                    
                        {image && <img src={image} alt="Selected" width="400" height="300" />}

                    </Col>

                </Row>
    
            </Container>

        </div>

    )
}
