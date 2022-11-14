import './ReviewQuizPage.css';
import logo from '../logo.svg';
import { useNavigate } from "react-router-dom";
import React from 'react';

function ReviewQuizPage() {
  let navigate = useNavigate();
  const data = [["Quiz #1 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews", 1],
                ["Quiz #2 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews", 2],
                ["Quiz #3 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews", 3],
                ["Quiz #4 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews", 4],
                ["Quiz #5 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews", 5],
                ["Quiz #6 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews", 6],
                ["Quiz #7 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews", 7],
                ["Quiz #8 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews", 8]];
    return (
      <div>
        <div className="start">
          <div className="click">
            <img src={logo} alt="Logo Moelas Ware" />
          </div>
          <div className="click">
            <text>Hi, username</text>
          </div>
        </div>
        <div className='center'>
          <h2>LIST OF QUIZZES FOR REVIEW</h2>
          <p>Please click on the quiz that you would like review</p>
        </div>
        <div className='center_tab'>
            <ul>
              {(() => {
                var d = [];
                for (let i = 0; i < data.length; i++) {
                  if (i === 0 && data.length === 1) {
                    d.push(
                      <tr className='select'>
                      <button className='button_tab button_uniq button_tab_hover' onClick={()=>{navigate("/review/" + data[i][5])}}>
                        <td width={200}>{data[i][0]}</td>
                        <td width={200}>{data[i][1]}</td>
                        <td width={200}>{data[i][2]}</td>
                        <td width={200}>{data[i][3]}</td>
                        <td width={200}>{data[i][4]}</td>
                      </button>
                    </tr>)
                  } else if (i === 0 && data.length > 0) {
                    d.push(
                      <tr className='select'>
                      <button className='button_tab button1 button_tab_hover' onClick={()=>{navigate("/review/" + data[i][5])}}>
                        <td width={200}>{data[i][0]}</td>
                        <td width={200}>{data[i][1]}</td>
                        <td width={200}>{data[i][2]}</td>
                        <td width={200}>{data[i][3]}</td>
                        <td width={200}>{data[i][4]}</td>
                      </button>
                    </tr>)
                  } else if (i > 0 && i !== data.length-1) {
                    d.push(
                      <tr className='select'>
                      <button className='button_tab other_buttons button_tab_hover' onClick={()=>{navigate("/review/" + data[i][5])}}>
                      <td width={200}>{data[i][0]}</td>
                        <td width={200}>{data[i][1]}</td>
                        <td width={200}>{data[i][2]}</td>
                        <td width={200}>{data[i][3]}</td>
                        <td width={200}>{data[i][4]}</td>
                      </button>
                    </tr>)
                  } else if (i === data.length-1) {
                    d.push(
                      <tr className='select'>
                      <button className='button_tab button_end button_tab_hover' onClick={ ()=>{navigate("/review/" + data[i][5])}}>
                      <td width={200}>{data[i][0]}</td>
                        <td width={200}>{data[i][1]}</td>
                        <td width={200}>{data[i][2]}</td>
                        <td width={200}>{data[i][3]}</td>
                        <td width={200}>{data[i][4]}</td>
                      </button>
                    </tr>)
                  }
                }
              return d;
              })()}
            </ul>
        </div>
      </div>
    )
  };

export default ReviewQuizPage;