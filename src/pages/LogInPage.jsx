import React from 'react'
import { useState } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import { useLogin } from '../hooks/useLogIn';

export const LogInPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, isLoading } = useLogin();


    //Animacion

    useEffect(() => {
    
        AOS.init()
      
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login( email, password );

    };

    return (
        <form className='login' onSubmit={handleSubmit} data-aos = "fade-up">

            <h3> Log In </h3>

            <label> Email: </label>
            <input type = "email" onChange = { (e) => setEmail( e.target.value ) } value = {email} />

            <label> Password: </label>
            <input type = "password" onChange = { (e) => setPassword( e.target.value ) } value = {password} />

            <button disabled = {isLoading}> Log In </button>

            {error && <div className='error'> {error} </div>}

        </form>
    );
}
