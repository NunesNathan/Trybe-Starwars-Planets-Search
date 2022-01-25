import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [data, setData] = useState({});
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const fetcher = async () => {
      setData(await (await fetch(url)).json());
    };
    fetcher();
  }, []);

  return (
    <PlanetsContext.Provider
      value={ { data } }
    >
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
