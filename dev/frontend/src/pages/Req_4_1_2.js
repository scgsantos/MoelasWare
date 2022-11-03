import logoMoelasWare from '../logoMoelasWare.png';
import './Req_4_1_2.css';
import './Estilo.css';


function App() {
  return (
    <div>
        <div class="centrar">
            <img src={logoMoelasWare} alt="logoMoelasWare" />

            <h7>Hi, username</h7>
        </div>

        <div class="center">
            <h3>TEST #2 NAME</h3>
            <h7>Solve the quiz bellow to finish the test</h7>
        </div>

        <div class="quiz">
            <h3>Quiz #1 Name</h3>
            <h6>Quiz #1 tag</h6>
        </div>

        <div class="quiz">
            <button>Solve quiz</button>
        </div>

        <div class="quiz2">
            <button>Back to test selection</button>
        </div>
        
    </div>
    
  );
}

export default App;