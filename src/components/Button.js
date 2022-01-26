import React from 'react';
import PropType from 'prop-types';

export default function Button({ text, test, onClick }) {
  return (
    <button
      data-testid={ `${test}` }
      type="button"
      onClick={ onClick }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropType.string.isRequired,
  test: PropType.string.isRequired,
  onClick: PropType.func.isRequired,
};
