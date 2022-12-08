import React from 'react'

function ErrorCompPage(props) {
  return (
    <div>
        <div className="TestSelection-centerTitles">
          <span className='TestSelection-main-title'>SOLVE A TEST</span>
          <span className="TestSelection-sub-title">Something Wrong Happened</span>
        </div>

        <div className="TestSelection-centerLoad TestSelection-just-column">
          <h1>{props.error}</h1>
          <button className='TestSelection-solve-quizbtn mt-2' onClick={() => {
            props.resetError();
          }}>Ok</button>
        </div>
      </div>
  )
}

export default ErrorCompPage