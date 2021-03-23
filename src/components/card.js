import React from 'react';

const Card = ({ customStyle = {}, children }) => {

  let defaultStyles = {
      borderColor: `#edf2f7`,
      borderRadius: `0.5rem`,
      borderStyle: `solid`,
      borderWidth: `1px`,
      boxShadow: '0 10px 28px rgba(0,0,0,.08)',
      padding: `1.5rem`,
  };

  Object.keys(customStyle).forEach((key, i) => {
    defaultStyles[key] = customStyle[key];
  });

  return (
    <div
      style={defaultStyles}
    >
      {children}
    </div>
  );
}


export default Card;
