import React from 'react'

function Button(props) {
  return (
    <button className='box-button' onClick={props.onClick}>{props.name}</button>
  )
}

export default Button