const filterHelper = ({ column, comparison, value }, planets) => {
  switch (comparison) {
  case 'menor que':
    return (
      planets.filter((eachPlanet) => Number(eachPlanet[column]) < Number(value)));
  case 'igual a':
    return (
      planets.filter((eachPlanet) => Number(eachPlanet[column]) === Number(value)));
  default:
    return (
      planets.filter((eachPlanet) => Number(eachPlanet[column]) > Number(value)));
  }
};

export default filterHelper;
