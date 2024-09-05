import React, { useEffect, useState } from 'react';
import './App.css';
import ClimaAtual from './components/currentWeather/ClimaAtual'; 
import Carregando from './components/loading/Carregando'; 
import Pesquisa from './components/search/Pesquisa'; 
import { CHAVE_API_CLIMA, URL_API_CLIMA } from './api'; // Correção da importação da chave e URL da API
import Previsao from './components/forecast/Previsao'; 
import Cabecalho from './components/header/Cabecalho'; 
import Github from './components/github/Github'; 

function App() {
  const [climaAtual, setClimaAtual] = useState(null);
  const [previsao, setPrevisoes] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
    }, 500);
  }, []);

  const handleOnSearchChange = (dadosPesquisa) => {
    const [lat, lon] = dadosPesquisa.value.split(' ');

    // Fetch para o clima atual
    const fetchClimaAtual = fetch(
      `${URL_API_CLIMA}/weather?lat=${lat}&lon=${lon}&appid=${CHAVE_API_CLIMA}&units=metric`
    );
    // Fetch para a previsão
    const fetchPrevisao = fetch(
      `${URL_API_CLIMA}/forecast?lat=${lat}&lon=${lon}&appid=${CHAVE_API_CLIMA}&units=metric`
    );

    // Utilizando Promise.all para fazer as duas requisições
    Promise.all([fetchClimaAtual, fetchPrevisao])
      .then(async (respostas) => {
        const respostaClima = await respostas[0].json();
        const respostaPrevisao = await respostas[1].json();

        setClimaAtual({ cidade: dadosPesquisa.label, ...respostaClima });
        setPrevisoes({ cidade: dadosPesquisa.label, ...respostaPrevisao });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log('clima', climaAtual);
  console.log('previsao', previsao);

  return (
    <>
      {carregando && <Carregando />}
      <Github />
      <Cabecalho />
      <Pesquisa onSearchChange={handleOnSearchChange} />
      {climaAtual && <ClimaAtual data={climaAtual} />}
      {previsao && <Previsao data={previsao} />}
    </>
  );
}

export default App;
