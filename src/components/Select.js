import React from 'react';
import PropType from 'prop-types';

export default function Select({ test, options, changeValue, name }) {
  return (
    <select
      name={ name }
      onChange={ changeValue }
      data-testid={ test }
    >
      {options.map((eachOption) => (
        <option key={ eachOption }>{eachOption}</option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropType.arrayOf(PropType.string).isRequired,
  test: PropType.string.isRequired,
  name: PropType.string.isRequired,
  changeValue: PropType.func.isRequired,
};
