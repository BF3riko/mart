import React from 'react';

const Rectangle = (props) => {

  const { className } = props;

  return (
    <svg className={className} height="65" viewBox="0 0 234 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M105.704 50.5001L105.255 50.5075L104.962 50.8474L94.86 62.5778L84.7577 50.8474L84.4684 50.5115L84.0251 50.5003L11.7237 48.684C5.7581 48.5342 1 43.655 1 37.6875V10C1 5.02945 5.02944 1 10 1H224C228.971 1 233 5.02944 233 10V37.5856C233 43.5902 228.185 48.4854 222.181 48.5841L105.704 50.5001Z" fill="#FFFF55" stroke="black" strokeWidth="2"/>
    </svg>
  )
}

export default Rectangle;
