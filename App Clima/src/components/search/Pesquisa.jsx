import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions, GEO_API_URL } from '../../api';
import './Pesquisa.css';

const Pesquisa = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  // Função para carregar opções de cidades
  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const data = await response.json();
      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      console.error(err);
      return { options: [] }; // Retorne um array vazio em caso de erro
    }
  };

  // Função para tratar a mudança de seleção
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  // Estilos personalizados para o componente AsyncPaginate
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '15px',
      fontSize: '20px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)', // Sombra sutil
      backgroundColor: '#1e1e1e', // Cor de fundo escura
      color: '#e0e0e0', // Cor do texto clara
      border: '1px solid #4a90e2', // Borda azul clara
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4a90e2' : '#2d2d2d', // Fundo azul ao focar
      color: state.isFocused ? '#ffffff' : '#e0e0e0', // Cor do texto ao focar
      cursor: 'pointer', // Cursor pointer para itens clicáveis
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9e9e9e', // Cor do placeholder cinza médio
      fontSize: '20px', // Tamanho da fonte consistente com o controle
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e0e0e0', // Cor do texto selecionado
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '15px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', // Sombra mais intensa no menu
      marginTop: '5px', // Espaço entre o controle e o menu
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '0', // Remove o padding padrão
    }),
  };

  return (
    <div className="search-container">
      <AsyncPaginate
        className="search-element"
        placeholder="Buscar Cidade"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        styles={customStyles}
      />
    </div>
  );
};

export default Pesquisa;
