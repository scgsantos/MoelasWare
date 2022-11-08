import React from 'react'

function Button(props) {
  return (
    <button className='box-button' onClick={props.onClick}>{props.name.length > 18 ? props.name.substring(0, 15) + "..." : props.name}</button>
  )
}

export default Button