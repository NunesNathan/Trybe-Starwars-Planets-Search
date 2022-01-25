import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { data: { results } } = useContext(PlanetsContext);
  return (
    <table>
      <thead>
        <tr>
          {results && (Object.keys(results[0])).map((key) => (key !== 'residents'
            ? <th key={ key }>{ key }</th>
            : null))}
        </tr>
      </thead>
      <tbody>
        {results && results.map((eachPlanet, i) => (
          <tr key={ i }>
            {(Object.entries(eachPlanet)).map((eachInfo) => (
              (eachInfo[0] !== 'residents'
                ? <td key={ `${eachInfo[0]}-${i}` }>{eachInfo[1]}</td>
                : null)
            ))}
          </tr>))}
      </tbody>
    </table>
  );
}
