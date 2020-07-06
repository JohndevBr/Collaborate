import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // usado no lugar do href para não carregar o react do zero
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/collaborate.png'

export default function Logon(){

  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(event){
    event.preventDefault();

    try {
      const res = await api.post('sessions', { id });

      localStorage.setItem('companyId', id); // local storage, serve para salvar os dados selecionados no cache do navegador
      localStorage.setItem('companyName', res.data.name);

      history.push('/profile');
      
    } catch (err) {
      alert("Falha no Login, tente novamente");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">

          <form onSubmit={handleLogin}>
            <h1>Faça seu Logon</h1>

            <input 
              placeholder="ID da Empresa"
              value={id}
              onChange={event => setId(event.target.value)}
            />
            <button className="button" type="submit">Entrar</button>
              
            <Link className="back-link" to="/register"> 
              <FiLogIn size={16} color="#E02041" />
               Não tenho cadastro </Link> 
          </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
