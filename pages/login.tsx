import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Login.module.css'

import { Form }  from '@unform/web';
import Input from '../components/input';
import * as Yup from 'yup';

import api from '../services/api';
import { login } from '../services/auth';

type Login = {
    email: string,
    password: string
}

export default function LoginPage(){
    
    const formRef = useRef(null);    
    const [msg, setMsg] = useState('');
    const [alertHide, setAlertHide] = useState(true);

    //Validate login
    async function handleSubmit(data:Login) {

        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                .email('Digite um e-mail válido;')
                .required('Digite seu e-mail de cadastro;'),
                password: Yup.string()
                .min(6, 'A senha precisa ter no mínimo de 6 caracteres;')
                .required('Informe sua SENHA;')
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            
            // Validation passed
            setAlertHide(false);
            try {                
                setMsg('Validando login ...');
                
                const response = await api.post('/login', data);
                
                login(response.data.token, response.data.id, response.data.email);

                setMsg('Login efetuado!');
            } catch(error) {
                setMsg('Verifique seus dados de acesso');
                console.log(error.message)
                //formRef.current.setFieldError('password', 'Dados inválidos');
            }

        } catch(err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
    }    

    return (
    <div className={styles.container}>
        <Head>
            <title>Wiser App Login</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.splash}></div>
        <div className={styles.form}>
            <h1 className={styles.title}>Olá, seja<br /> bem-vindo!</h1>
            <p className={styles.info}>Para acessar a plataforma,<br /> faça seu login.</p>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input name="email" type="email" label="e-mail" />
                <Input name="password" type="password" label="senha" />
                <button type="submit">entrar</button>
            </Form>
            <p className={alertHide ? 'hidden' : 'message-alert'}>{msg}</p>
            <p className={styles.remember}>Esqueceu seu login ou senha? <br />Clique <Link href="/">aqui</Link>.</p>            
        </div>

    </div>
    )
}