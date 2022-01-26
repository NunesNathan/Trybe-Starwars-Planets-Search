import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import filterHelper from '../helpers/easier';

export default function Table() {
  const { data: { results },
    filterByName: { name },
    filterByNumericValues } = useContext(PlanetsContext);
  const [oldName, setOldName] = useState('');
  const [filteredPlanets, filterPlanets] = useState(results);
  const [filteredPlanetsInitial, filterPlanetsInitial] = useState();

  function changePlanetsWithInput() {
    const filterWithName = (whoToFilter) => (whoToFilter
      .filter(({ name: planetName }) => planetName
        .toLowerCase().includes(name.toLowerCase())));

    if (results) {
      if (name.length < oldName.length) {
        setOldName(name);
        return filterWithName(filteredPlanetsInitial);
      }
      setOldName(name);
      return filterWithName(filteredPlanets);
    }
  }

  const changePlanetsWithColumnFilter = () => {
    const filterWithNumericsValues = () => filterByNumericValues.map((eachFilter) => (
      filterHelper(eachFilter, filteredPlanets)));

    if (filterByNumericValues.length > 0) {
      return filterWithNumericsValues()[filterWithNumericsValues().length - 1];
    }
    return filteredPlanets;
  };

  useEffect(() => {
    filterPlanets(results);
    filterPlanetsInitial(changePlanetsWithColumnFilter());
  }, [results]);

  useEffect(() => {
    filterPlanets(changePlanetsWithInput());
  }, [name]);

  useEffect(() => {
    filterPlanets(changePlanetsWithColumnFilter());
    filterPlanetsInitial(changePlanetsWithColumnFilter());
  }, [filterByNumericValues]);

  return (
    <table>
      <thead>
        <tr>
          {results && (Object.keys(results[0])).map((key) => (key !== 'residents'
            ? <th key={ key }>{key}</th>
            : null))}
        </tr>
      </thead>
      <tbody>
        {
          filteredPlanets && filteredPlanets.map((eachPlanet, i) => (
            <tr key={ i }>
              {(Object.entries(eachPlanet)).map((eachInfo) => (
                (eachInfo[0] !== 'residents'
                  ? <td key={ `${eachInfo[0]}-${i}` }>{eachInfo[1]}</td>
                  : null)
              ))}
            </tr>))
        }
      </tbody>
    </table>
  );
}
