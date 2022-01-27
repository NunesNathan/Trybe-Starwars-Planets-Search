import React from 'react';
import PropType from 'prop-types';

export default function Input(props) {
  const { id, test, value, type, changeValue } = props;
  return (
    <label htmlFor={ id }>
      <input
        type={ type }
        name={ id }
        id={ id }
        data-testid={ `${test}` }
        value={ value }
        onChange={ changeValue }
      />
    </label>
  );
}

Input.propTypes = {
  id: PropType.string.isRequired,
  test: PropType.string.isRequired,
  value: PropType.oneOfType([
    PropType.string,
    PropType.number,
  ]).isRequired,
  type: PropType.string.isRequired,
  changeValue: PropType.func.isRequired,
};
