import React from 'react';

export default ({input, label}) => {
  return(
    <div>
      <input id={label} className="with-gap" type="radio" {...input}/>
      <label htmlFor={label}>{label}</label>
    </div>  
  );
};