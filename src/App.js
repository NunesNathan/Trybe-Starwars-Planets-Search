import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import Select from './components/Select';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const columnOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  const [data, setData] = useState({});
  const [inputTextSearch, setInputTextSearch] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);

  const [columnValue, setColumnValue] = useState(columnOptions[0]);
  const [comparisonValue, setComparisonValue] = useState(comparisonOptions[0]);
  const [numericValue, setNumericValue] = useState(0);

  useEffect(() => {
    const fetcher = async () => {
      setData(await (await fetch(url)).json());
    };
    fetcher();
  }, []);

  const changeInputFilter = ({ target: { name, value } }) => {
    switch (name) {
    case 'filterName':
      setInputTextSearch(value);
      break;
    case 'numericValue':
      setNumericValue(value);
      break;
    default:
      break;
    }
  };

  const changeSelectFilter = ({ target: { name, value } }) => {
    switch (name) {
    case 'column':
      setColumnValue(value);
      break;
    case 'comparison':
      setComparisonValue(value);
      break;
    default:
      break;
    }
  };

  const setNewColumnFilter = () => {
    const filter = {
      column: columnValue,
      comparison: comparisonValue,
      value: numericValue,
    };
    setColumnFilters(columnFilters.concat(filter));
  };

  return (
    <PlanetsContext.Provider
      value={ {
        data,
        filterByName: { name: inputTextSearch },
        filterByNumericValues: columnFilters,
      } }
    >
      <Input
        id="filterName"
        test="name-filter"
        value={ inputTextSearch }
        type="text"
        changeValue={ changeInputFilter }
      />
      <form>
        <Select
          test="column-filter"
          options={ columnOptions }
          changeValue={ changeSelectFilter }
          name="column"
        />
        <Select
          test="comparison-filter"
          options={ comparisonOptions }
          changeValue={ changeSelectFilter }
          name="comparison"
        />
        <Input
          id="numericValue"
          test="value-filter"
          value={ numericValue }
          type="number"
          changeValue={ changeInputFilter }
        />
        <Button
          text="Filtrar"
          test="button-filter"
          onClick={ setNewColumnFilter }
        />
      </form>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
