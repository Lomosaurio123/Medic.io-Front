import React from 'react'
import { useState } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import { useSignup } from '../hooks/useSignUp';

export const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [edad, setEdad] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');

    const { signup, error, isLoading } = useSignup();

    //Animacion

    useEffect(() => {
    
        AOS.init()
      
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup( email, nombre, apellidoPaterno, apellidoMaterno, edad, especialidad, tel , password );

    };

    return (
        <form className='signup' onSubmit={handleSubmit} data-aos = "fade-up">

            <h3> Sign Up</h3>
            <label> Email: </label>
            <input type = "email" onChange = { (e) => setEmail( e.target.value ) } value = {email} />

            <label> Nombre: </label>
            <input type = "text" onChange = { (e) => setNombre( e.target.value ) } value = {nombre} />

            <label> Apellido Paterno: </label>
            <input type = "text" onChange = { (e) => setApellidoPaterno( e.target.value ) } value = {apellidoPaterno} />

            <label> Apellido Materno: </label>
            <input type = "text" onChange = { (e) => setApellidoMaterno( e.target.value ) } value = {apellidoMaterno} />

            <label> Edad: </label>
            <input type = "number" onChange = { (e) => setEdad( e.target.value ) } value = {edad} />

            <label> Especialidad: </label>
            <input type = "text" onChange = { (e) => setEspecialidad( e.target.value ) } value = {especialidad} />

            <label> Tel: </label>
            <input type = "number" onChange = { (e) => setTel( e.target.value ) } value = {tel} />

            <label> Password: </label>
            <input type = "password" onChange = { (e) => setPassword( e.target.value ) } value = {password} />

            <button disabled = {isLoading}> Sign Up </button>

            {error && <div className='error'> {error} </div>}

        </form>
    );
}
