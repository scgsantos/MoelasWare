import React from 'react'

function Button(props) {
  return (
    <button className={`box-button ${props.disabled === true ? 'disabled' : ''}`} onClick={props.onClick}>{props.name}</button>
  )
}

export default Button