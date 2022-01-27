import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import Select from './components/Select';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  const [columnOptions, setColumnOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const [data, setData] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);

  const [inputTextSearch, setInputTextSearch] = useState('');
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

  useEffect(() => {
    if (columnFilters.length > 0) {
      const newOptions = columnFilters.map(({ column }) => (
        columnOptions.filter((eachOption) => eachOption !== column)
      ));

      /* at function, parecido com o comportamento de posição em listas
      no python https://stackoverflow.com/questions/3216013/get-the-last-item-in-an-array */
      const last = -1;
      setColumnOptions(newOptions.at(last));
      setColumnValue(newOptions.at(last)[0]);
    }
  }, [columnFilters]);

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
          value={ columnValue }
          changeValue={ changeSelectFilter }
          name="column"
        />
        <Select
          test="comparison-filter"
          options={ comparisonOptions }
          value={ comparisonValue }
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
