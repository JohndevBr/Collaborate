import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api';


export default function Register(){
  const [name, setName] = useState('');

  const history = useHistory();
  
  async function handleRegister(event){
    event.preventDefault(); 
    console.log({
      name,
    }); 
    const data ={ name };

    try {
      const res = await api.post('companies', data);
      console.log(res); 
      alert(`Tudo certo! Seu ID é ${res.data.id}`);
      history.push('/');
    } catch (err) {
      alert('Algo deu errado! Tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro e tenha uma melhor gestão dos funcionários da sua empresa </p>
          <Link className="back-link" to="/"> 
              <FiArrowLeft size={16} color="#E02041" />
               Voltar para o Logon </Link>
        </section>

        <form onSubmit={handleRegister}> 
          <input 
            placeholder="Nome da Empresa"
            value={name} // constante criada lá em cima com useState
            onChange={event => setName(event.target.value)}
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}