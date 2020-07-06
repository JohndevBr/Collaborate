import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';


export default function NewIncident(){

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthday, setbirthday] = useState('');
  const [occupation, setOccupation] = useState('');
  const [salary, setSalary] = useState('');

  const companyId = localStorage.getItem('companyId');

  const history = useHistory();

  async function handleNewIncident(event){
    event.preventDefault();

    const data = {
      name, 
      surname,
      birthday,
      occupation,
      salary,
    };
    try {
      await api.post('/employees', data, {
        headers: {
          Authorization:  companyId,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert ('Erro ao cadastrar caso, tente novamente.')
    }
  }


  return (
    <div className="new-incident-container">
      <div className="content">
        
        <section>
          <h1>Cadastrar novo Funcionário</h1>
          <p>Prencha todas as informações do novo funcionário</p>
          <Link className="back-link" to="/profile"> 
              <FiArrowLeft size={16} color="#E02041" />
               Voltar para Home </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            value={name}
            onChange = {event => setName(event.target.value)}
            placeholder="Nome do funcionário"
          />
          <input 
            value={surname}
            onChange = {event => setSurname(event.target.value)}
            placeholder="Sobrenome do funcionário"
          />
          <input 
            value={birthday}
            onChange = {event => setbirthday(event.target.value)}
            type="date"
            placeholder="Data de Nascimento "
          />

          <textarea  
            value={occupation}
            onChange = {event => setOccupation(event.target.value)}
            placeholder="Descrição"
          />
          <input 
            value={salary}
            onChange = {event => setSalary(event.target.value)}
            placeholder="Salário em reais"
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}