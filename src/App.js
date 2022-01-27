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
  const numericColumnsInitialState = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const [columnOptions, setColumnOptions] = useState(numericColumnsInitialState);
  const [hasDisabled, setHasDisabled] = useState(false);

  const [hasExclude, setHasExclude] = useState(false);

  const [data, setData] = useState();
  const [columnFilters, setColumnFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState({});

  const [inputTextSearch, setInputTextSearch] = useState('');
  const [columnValue, setColumnValue] = useState(columnOptions[0]);
  const [comparisonValue, setComparisonValue] = useState(comparisonOptions[0]);
  const [numericValue, setNumericValue] = useState(0);

  const [sortDirection, setSortDirection] = useState('ASC');
  const [sortColumnValue, setSortColumnValue] = useState(numericColumnsInitialState[0]);

  useEffect(() => {
    const fetcher = async () => {
      setData((await (await fetch(url))
        .json()).results.sort((a, b) => a.name.localeCompare(b.name)));
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
    case 'sort-direction':
      setSortDirection(value);
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
    case 'sort-column':
      setSortColumnValue(value);
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
    if (columnValue) {
      setColumnFilters(columnFilters.concat(filter));
    }
    if (columnOptions.length <= 1) {
      setHasDisabled(true);
    }
    setNumericValue(0);
  };

  const sortTable = () => {
    setSortOrder({
      column: sortColumnValue,
      sort: sortDirection,
    });
    setSortColumnValue(numericColumnsInitialState[0]);
  };

  const removeOptions = () => {
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
  };
  useEffect(removeOptions, [columnFilters]);

  const excludeButton = ({ target }) => {
    const { id } = target.parentNode;
    setColumnOptions(columnOptions.concat(id));
    setColumnFilters(columnFilters.filter((eachFilter) => eachFilter.column !== id));
    setHasDisabled(false);
    setHasExclude(true);
  };

  return (
    <PlanetsContext.Provider
      value={ {
        data,
        filterByName: { name: inputTextSearch },
        filterByNumericValues: columnFilters,
        order: sortOrder,
        control: { hasExclude, setHasExclude },
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
          disabled={ hasDisabled }
          onClick={ setNewColumnFilter }
        />
      </form>
      <form>
        <Select
          test="column-sort"
          options={ numericColumnsInitialState }
          value={ sortColumnValue }
          changeValue={ changeSelectFilter }
          name="sort-column"
        />
        <Input
          id="sort-direction"
          test="column-sort-input-asc"
          value="ASC"
          type="radio"
          changeValue={ changeInputFilter }
        />
        <Input
          id="sort-direction"
          test="column-sort-input-desc"
          value="DESC"
          type="radio"
          changeValue={ changeInputFilter }
        />
        <Button
          text="Organizar"
          test="column-sort-button"
          onClick={ sortTable }
        />
      </form>
      {columnFilters.length > 0
        && columnFilters.map((eachFilter) => (
          <div
            data-testid="filter"
            key={ `filter-list-${eachFilter.column}` }
            id={ eachFilter.column }
          >
            <span>
              {Object.values(eachFilter).join(' ')}
            </span>
            <Button
              text="x"
              onClick={ excludeButton }
            />
          </div>
        ))}
      <Table order={ sortOrder } />
    </PlanetsContext.Provider>
  );
}

export default App;
