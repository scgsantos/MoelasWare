import logoMoelasWare from '../logoMoelasWare.png';
import './Req_4_3.css';
import './Estilo.css';

function App() {
  return (
    <div>
        <div class="centrar">
            <img src={logoMoelasWare} alt="logoMoelasWare" />

            <h7>Hi, username</h7>
        </div>
        <div class="center">
            <h3>TEST #1 NAME</h3>
            
            <h4 class = "hh">This test has already been solved</h4>
            
            
        </div>

        <div class="grade">
            <h3>TEST #1 grade</h3>
        </div>

        <div class="centro">
            <button href='/Req_4_2_3'>Check the answers</button>
            <button href='/Req_4_1_1'>Back to test selection</button>
        </div>
        
    </div>
  );
}

export default App;