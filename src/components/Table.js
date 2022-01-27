import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import filterHelper from '../helpers/easier';

export default function Table() {
  const { data: { results },
    filterByName: { name },
    filterByNumericValues } = useContext(PlanetsContext);
  const [filteredPlanets, filterPlanets] = useState(results);
  const [filteredPlanetsInitial, filterPlanetsInitial] = useState();

  function changePlanetsWithInput() {
    const filterWithName = (who) => (
      who
        .filter(({ name: planetName }) => planetName
          .toLowerCase().includes(name.toLowerCase())));

    if (results) {
      if (name.length > 0) {
        return filterWithName(filteredPlanets);
      }
      return filterWithName(filteredPlanetsInitial);
    }
  }

  const changePlanetsWithColumnFilter = () => {
    const filterWithNumericsValues = () => filterByNumericValues.map((eachFilter) => (
      filterHelper(eachFilter, filteredPlanets)));

    if (filterByNumericValues.length > 1) {
      const last = -1;
      return filterWithNumericsValues().at(last);
    }
    if (filterByNumericValues.length > 0) {
      return filterWithNumericsValues()[0];
    }
    return results;
  };

  useEffect(() => {
    filterPlanets(results);
    filterPlanetsInitial(results);
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
