import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';

export const PopupInside = (props) => {
    return (
        <div className='popupInside'>
            <span className="header">{props.title}</span>
            <span className="content">{props.subtitle}</span>
            <div className="actions">
                {props.singleButton ? <button className="button" onClick={props.onClick}>Try Again</button> :
                    <>
                        <button onClick={props.onClick} className="buttonpop">Yes</button>
                        <button onClick={props.close} className="buttonpop">No</button>
                    </>
                }
            </div>
        </div>
    )
}