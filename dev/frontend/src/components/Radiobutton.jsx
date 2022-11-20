import React from 'react'

function Radiobutton(props) {
    return (
        <div className='radio-input-text' onClick={props.onClick}>
            <label className="radio-button">
                <input type="radio" name="radio" readOnly={true} checked={props.selected} />
            </label>
            <div className="label-visible">
                {props.text}
            </div>
        </div>
    )
}

export default Radiobutton