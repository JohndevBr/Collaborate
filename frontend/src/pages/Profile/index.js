import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import LogoImg from '../../assets/collaborate.png';

export default function Profile(){

  const [employees, setEmployees] = useState([]);
  const companyId = localStorage.getItem('companyId');
  const companyName = localStorage.getItem('companyName');

  const history = useHistory();

  useEffect(() =>{
    api.get('profile', {
      headers: {
        Authorization: companyId,
      }
    }).then(res => {
      setEmployees(res.data);
    })     
  }, [companyId]);

  

  async function handleDeleteEmployer(id){
    try {
      await api.delete(`employees/${id}`, {
        headers: {
          Authorization: companyId,
        }
      });

      setEmployees(employees.filter(incident => incident.id !== id));

    } catch (err) {
      alert('Erro ao deletar o caso, tente novamente');
    }
  }

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero"/>
        <span> Bem vinda, {companyName} </span> 

        <Link className="button" to="/employees/new"> Cadastrar novo funcionário</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>
      <h1>Funcionários Cadastrados</h1>

      <ul>
        {employees.map( employer => (
          <li key={employer.id}>
            <strong> Nome: </strong>
            <p> {employer.name} </p>

            <strong> Sobrenome: </strong>
            <p> {employer.surname} </p>

            <strong> Nascimento: </strong>
            <p> {employer.birthday} </p>

            <strong> Cargo: </strong>
            <p> {employer.occupation} </p>

            <strong> Salário: </strong>
            <p> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(employer.salary)} </p>

            <button onClick= {()=> handleDeleteEmployer(employer.id)} type="button"> 
              <FiTrash2 size={20} color="#a8a8b3"/> 
            </button>
          </li>
        ))}        
      </ul>
    </div>
  );
}

