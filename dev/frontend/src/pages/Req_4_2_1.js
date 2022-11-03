import logoMoelasWare from '../logoMoelasWare.png';
import './Req_4_2_1.css';
import './Estilo.css';


function App() {
  return (
    <div>
        <div class="centrar">
            <img src={logoMoelasWare} alt="logoMoelasWare" />

            <h7>Hi, username</h7>
        </div>

        <div class="center">
            <h3>QUIZ #1 NAME</h3>
            <h7>Select the correct answer to each question</h7>
        </div>

        <div class="question">
            <h3>Question #1</h3>
            <h6>Pergunta: qual é o teu nome?</h6>
        </div>

       
        <div class="column">
            <button>Answer #1</button>
            <button>Answer #2</button>
            <button>Answer #3</button>
            <button>Answer #4</button>
            <button>Answer #5</button>
            <button>Answer #6</button>
        </div>  

        <div class="question">
            <h3>Question #2</h3>
            <h6>Pergunta: qual é o teu nome?</h6>
        </div>

       
        <div class="column">
            <button>Answer #1</button>
            <button>Answer #2</button>
            <button>Answer #3</button>
            <button>Answer #4</button>
            <button>Answer #5</button>
            <button>Answer #6</button>
        </div>

        <div class="question">
            <h3>Question #3</h3>
            <h6>Pergunta: qual é o teu nome?</h6>
        </div>

       
        <div class="column">
            <button>Answer #1</button>
            <button>Answer #2</button>
            <button>Answer #3</button>
            <button>Answer #4</button>
            <button>Answer #5</button>
            <button>Answer #6</button>
        </div>    

        <div class="centro">
            <button href='/Req_4__2_3'>Submit answers</button> 
            <button href='/Req_4_1_1'>Back to test selection</button>
        </div>

        
    </div>
    

  );
}

export default App;
