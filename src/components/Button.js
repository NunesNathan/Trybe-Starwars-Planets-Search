import React from 'react';
import PropType from 'prop-types';

export default function Button({ text, test, disabled, onClick }) {
  return (
    <button
      data-testid={ `${test}` }
      type="button"
      disabled={ disabled }
      onClick={ onClick }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropType.string.isRequired,
  test: PropType.string.isRequired,
  disabled: PropType.bool.isRequired,
  onClick: PropType.func.isRequired,
};
