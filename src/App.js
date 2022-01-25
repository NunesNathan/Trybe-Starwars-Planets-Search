import React, { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [data, setData] = useState({});
  const [inputTextSearch, setInputTextSearch] = useState('');
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const fetcher = async () => {
      setData(await (await fetch(url)).json());
    };
    fetcher();
  }, []);

  const changeFilterName = ({ target: { value } }) => {
    setInputTextSearch(value);
  };

  return (
    <PlanetsContext.Provider
      value={ { data, filterByName: { name: inputTextSearch } } }
    >
      <Input
        id="filterName"
        test="name-filter"
        value={ inputTextSearch }
        type="text"
        changeValue={ changeFilterName }
      />
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
