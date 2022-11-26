import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';

export const PopupInside = (props) => {
    return (
        <div className='TestSelection-popupInside'>
            <span className="TestSelection-header">{props.title}</span>
            <span className="TestSelection-content">{props.subtitle}</span>
            <div className="TestSelection-actions">
                {props.singleButton ? <button className="TestSelection-button" onClick={props.onClick}>Try Again</button> :
                    <>
                        <button onClick={props.onClick} className="TestSelection-buttonpop">Yes</button>
                        <button onClick={props.close} className="TestSelection-buttonpop">No</button>
                    </>
                }
            </div>
        </div>
    )
}