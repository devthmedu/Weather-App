import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions, GEO_API_URL } from '../../api';
import './Pesquisa.css';

const Pesquisa = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const response_1 = await response.json();
      return {
        options: response_1.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      console.error(err);
      return { options: [] }; // Retorne um array vazio em caso de erro
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '15px',
      fontSize: '20px',
      boxShadow: 'none',
      backgroundColor: '#2f2f2fdb', // Cor de fundo escura
      color: '#f5f5f5', // Cor do texto
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#fea528' : '#2f2f2fdb', // Fundo laranja ao focar
      color: state.isFocused ? 'black' : '#f5f5f5', // Cor do texto
      

    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#f5f5f5', // Cor do placeholder
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
