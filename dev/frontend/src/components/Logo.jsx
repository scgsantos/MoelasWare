import React from 'react';
import logo from 'assets/SVG/LOGO.svg';

function Logo() {
  return (
    <img src={logo} alt="logo" style={{
      alignSelf: 'top-left',
      width: '176px',
      height: '55px',
      marginTop: '52px',
      marginLeft: '64px',

    }} />
  );
}

export default Logo;
