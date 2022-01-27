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
  test: PropType.string,
  disabled: PropType.bool,
  onClick: PropType.func.isRequired,
};

Button.defaultProps = {
  test: '',
  disabled: false,
};
