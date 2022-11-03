import logoMoelasWare from '../logoMoelasWare.png';
import './Req_4_2_2.css';
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
            
            <h6 class = "hh">You have solved all the quizzes in this test</h6>
            
            
        </div>

        <div class="grade">
            <h6>Your final test grade was</h6>
            <h3>TEST #2 grade</h3>
        </div>

        <div class="centro">
            <button href='/Req_4_2_3'>Check the answers</button>
            <button href='/Req_4_1_1'>Back to test selection</button>
        </div>
        
    </div>
  );
}

export default App;