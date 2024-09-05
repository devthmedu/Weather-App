import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './Previsao.css'; // Adicione a extensão do arquivo CSS

const DIAS_SEMANA = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

const Previsao = ({ data }) => {
  const diaSemanaAtual = new Date().getDay();
  const previsaoSemana = DIAS_SEMANA.slice(diaSemanaAtual).concat(
    DIAS_SEMANA.slice(0, diaSemanaAtual)
  );

  return (
    <Accordion allowZeroExpanded className="previsao-container">
      <label className="titulo">Previsão para os Próximos Dias</label>

      {data.list.splice(0, 7).map((item, idx) => (
        <AccordionItem key={idx}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="item-diario">
                <img
                  src={`icons/${item.weather[0].icon}.png`}
                  alt="ícone do clima"
                  className="icone-pequeno"
                />
                <label className="dia">{previsaoSemana[idx]}</label>
                <label className="descricao">
                  {item.weather[0].description}
                </label>
                <label className="min-max">
                  {Math.round(item.main.temp_min)}℃ / {Math.round(item.main.temp_max)}℃
                </label>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="grade-detalhes-diarios">
              <div className="grade-detalhes-diarios-item">
                <label>Pressão</label>
                <label>{item.main.pressure} hPa</label>
              </div>
              <div className="grade-detalhes-diarios-item">
                <label>Umidade</label>
                <label>{item.main.humidity} %</label>
              </div>
              <div className="grade-detalhes-diarios-item">
                <label>Nuvens</label>
                <label>{item.clouds.all} %</label>
              </div>
              <div className="grade-detalhes-diarios-item">
                <label>Velocidade do Vento</label>
                <label>{item.wind.speed} m/s</label>
              </div>
              <div className="grade-detalhes-diarios-item">
                <label>Nível do Mar</label>
                <label>{item.main.sea_level} m</label>
              </div>
              <div className="grade-detalhes-diarios-item">
                <label>Sensação Térmica</label>
                <label>{item.main.feels_like}℃</label>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Previsao;
