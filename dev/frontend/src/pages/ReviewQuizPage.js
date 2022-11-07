import './ReviewAQuizPage.css';
import logo from '../logo.svg';

function ReviewQuizPage() {
  const data = [["Quiz #1 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews"],
                ["Quiz #2 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews"],
                ["Quiz #3 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews"],
                ["Quiz #4 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews"],
                ["Quiz #5 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews"],
                ["Quiz #6 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews"],
                ["Quiz #7 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews"],
                ["Quiz #8 Name", "Tag", "Name of creater", "Creation date", "X/3 reviews"]];
    return (
      <div>
        <div className="start">
          <div className="click">
            <img src={logo} alt="Logo Moelas Ware" />
          </div>
          <div className="click">
            <h1>Hi, username</h1>
          </div>
        </div>
        <div className='center'>
          <h2>LIST OF QUIZZES FOR REVIEW</h2>
          <h2>Please click on the quiz that you would like review</h2>
        </div>
        <div className='center_tab'>
            <ul>
              {(() => {
                var d = [];
                for (let i = 0; i < data.length; i++) {
                  if (i === 0 && data.length === 1) {
                    d.push(
                      <tr>
                      <button className='button_uniq'>
                        {data[i][0]}-
                        {data[i][1]}-
                        {data[i][2]}-
                        {data[i][3]}-
                        {data[i][4]}
                      </button>
                    </tr>)
                  } else if (i === 0 && data.length > 0) {
                    d.push(
                      <tr>
                      <button className='button1'>
                      {data[i][0]}-
                      {data[i][1]}-
                      {data[i][2]}-
                      {data[i][3]}-
                      {data[i][4]}
                      </button>
                    </tr>)
                  } else if (i > 0 && i !== data.length-1) {
                    d.push(
                      <tr>
                      <button className='other_buttons'>
                        {data[i][0]}-
                        {data[i][1]}-
                        {data[i][2]}-
                        {data[i][3]}-
                        {data[i][4]}
                      </button>
                    </tr>)
                  } else if (i === data.length-1) {
                    d.push(
                      <tr>
                      <button className='button_end'>
                        {data[i][0]}-
                        {data[i][1]}-
                        {data[i][2]}-
                        {data[i][3]}-
                        {data[i][4]}
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