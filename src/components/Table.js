import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { data: { results }, filterByName: { name } } = useContext(PlanetsContext);
  const [filteredPlanets, filterPlanets] = useState(results);

  useEffect(() => {
    filterPlanets(results);
  }, [results]);

  function changePlanets() {
    if (results) {
      const passOnFilter = () => (results
        .filter(({ name: planetName }) => planetName
          .toLowerCase().includes(name.toLowerCase())));

      filterPlanets(passOnFilter);
    }
  }

  useEffect(() => {
    changePlanets();
  }, [name]);

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
            <tr key={i}>
              {(Object.entries(eachPlanet)).map((eachInfo) => (
                (eachInfo[0] !== 'residents'
                  ? <td key={`${eachInfo[0]}-${i}`}>{eachInfo[1]}</td>
                  : null)
              ))}
            </tr>))}
      </tbody>
    </table>
  );
}
