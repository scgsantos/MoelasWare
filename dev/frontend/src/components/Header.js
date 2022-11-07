import React from 'react'
import logoMoelasWare from '../logoMoelasWare.png';

function HeaderComp() {
  return (
    <div className="centraHeader">
        <img src={logoMoelasWare} alt="logoMoelasWare" />
        <span>Hi, username</span>
    </div>
  )
}

export default HeaderComp