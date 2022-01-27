import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import filterHelper from '../helpers/easier';

export default function Table() {
  const last = -1;

  const { data: results,
    filterByName: { name },
    filterByNumericValues,
    order,
    control: { hasExclude, setHasExclude },
  } = useContext(PlanetsContext);
  const [filteredPlanets, filterPlanets] = useState(results);
  const [filteredPlanetsInitial, filterPlanetsInitial] = useState();
  const [filteredPlanetsByOrder, filterPlanetsByOrder] = useState();
  const [filteredPlanetsByNumericFilters, filterPlanetsByNumericFilters] = useState();

  function changePlanetsWithInput() {
    const filterWithName = (who) => (
      who
        .filter(({ name: planetName }) => planetName
          .toLowerCase().includes(name.toLowerCase())));

    if (filteredPlanetsByNumericFilters) {
      return filterWithName(filteredPlanetsByNumericFilters);
    }
    if (filteredPlanetsByOrder) {
      return filterWithName(filteredPlanetsByOrder);
    }
    if (filteredPlanetsInitial) {
      return filterWithName(filteredPlanetsInitial);
    }
  }

  const changePlanetsWithColumnFilter = () => {
    const filterWithNumericsValues = (who) => filterByNumericValues
      .map((eachFilter) => filterHelper(eachFilter, who));

    if (filterByNumericValues.length > 1) {
      if (hasExclude) {
        setHasExclude(false);
        return filterWithNumericsValues(filteredPlanetsInitial)[0];
      }
      return filterWithNumericsValues(filteredPlanetsByNumericFilters).at(last);
    }
    if (filterByNumericValues.length === 1) {
      return filterWithNumericsValues(filteredPlanetsInitial)[0];
    }
    return filteredPlanetsInitial;
  };

  const sortPlanets = () => {
    if (order.sort) {
      return filteredPlanets.sort((planetToSort, scndPlanet) => {
        if (order.sort === 'ASC') {
          if (planetToSort[order.column] === 'unknown') {
            return last;
          }
          return Number(planetToSort[order.column]) - Number(scndPlanet[order.column]);
        }
        if (scndPlanet[order.column] === 'unknown') {
          return last;
        }
        return Number(scndPlanet[order.column]) - Number(planetToSort[order.column]);
      });
    }
  };

  const startInicialSetup = () => {
    filterPlanets(results);
    filterPlanetsInitial(results);
  };
  useEffect(startInicialSetup, [results]);

  const filteredByName = () => {
    filterPlanets(changePlanetsWithInput());
  };
  useEffect(filteredByName, [name]);

  const getNumericFilters = () => {
    const result = changePlanetsWithColumnFilter();
    filterPlanets(result);
    filterPlanetsByNumericFilters(result);
  };
  useEffect(getNumericFilters, [filterByNumericValues, hasExclude]);

  const getOrder = () => {
    const result = sortPlanets();
    filterPlanets(result);
    filterPlanetsByOrder(result);
  };
  useEffect(getOrder, [order]);

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
              {
                (Object.entries(eachPlanet)).map((eachInfo) => {
                  if (eachInfo[0] !== 'residents') {
                    if (eachInfo[0] === 'name') {
                      return (
                        <td
                          data-testid="planet-name"
                          key={ `${eachInfo[0]}-${i}` }
                        >
                          {eachInfo[1]}
                        </td>);
                    }
                    return <td key={ `${eachInfo[0]}-${i}` }>{eachInfo[1]}</td>;
                  }
                  return null;
                })
              }
            </tr>))
        }
      </tbody>
    </table>
  );
}
