import React from 'react';
import PropType from 'prop-types';

export default function Select({ test, options, value, changeValue, name }) {
  return (
    <select
      name={ name }
      value={ value }
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
  value: PropType.string,
  name: PropType.string.isRequired,
  changeValue: PropType.func.isRequired,
};

Select.defaultProps = {
  value: '',
};
