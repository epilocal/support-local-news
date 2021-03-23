import React from 'react';

import "./styles/button.css";

const sizes = {
  default: `buttonDefault`,
  lg: `buttonLg`,
  xl: `buttonXl`
};

const fontSizes = {
  default: `0.875rem`,
  sm: `0.875rem`,
  md: `0.950rem`,
  lg: `1.025rem`
};




const Button = ({ children, textSize = '', size, onClick, opposite, outline, customMargin }) => {
  return (
    <button
      style={{
            fontSize: `${fontSizes[textSize] || fontSizes.default}`,
            fontFamily: 'Nunito',
            margin: customMargin,
            width: '200px'
          }}
      type="button"
      onClick={onClick}
      className={`
        ${sizes[size] || sizes.default}
        ${opposite ? `buttonOpposite` : `button`}
        ${outline ? `buttonOutline` : `button`}
    `}
    >
      {children}
    </button>
  );
};

export default Button;
