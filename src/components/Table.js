import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import filterHelper from '../helpers/easier';

export default function Table() {
  const { data: { results },
    filterByName: { name },
    filterByNumericValues,
    order,
  } = useContext(PlanetsContext);
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

  const sortPlanets = () => {
    if (order.sort) {
      return filteredPlanets.sort((planetToSort, scndPlanet) => {
        if (order.sort === 'ASC') {
          return Number(planetToSort[order.column]) - Number(scndPlanet[order.column]);
        }
        return Number(scndPlanet[order.column]) - Number(planetToSort[order.column]);
      }).filter((eachSortedPlanet) => {
        if (order.column === 'population') {
          return eachSortedPlanet[order.column] !== 'unknown';
        }
        return eachSortedPlanet;
      });
    }
  };

  const verifyStart = () => {
    if (results) {
      /* sobre o uso de localeCompare para comparar as strings retornando um valor,
      tal como o sort espera */
      return results.sort((a, b) => a.name.localeCompare(b.name));
    }
    return results;
  };

  useEffect(() => {
    filterPlanets(verifyStart());
    filterPlanetsInitial(verifyStart());
  }, [results]);

  useEffect(() => {
    filterPlanets(changePlanetsWithInput());
  }, [name]);

  useEffect(() => {
    filterPlanets(changePlanetsWithColumnFilter());
    filterPlanetsInitial(changePlanetsWithColumnFilter());
  }, [filterByNumericValues]);

  useEffect(() => {
    filterPlanets(sortPlanets());
  }, [order]);

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
