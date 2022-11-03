import logoMoelasWare from '../logoMoelasWare.png';
import './Req_4_1_1.css';
import './Estilo.css';


function App() {
  return (
    <div> 
        <div class="centrar">
            <img src={logoMoelasWare} alt="logoMoelasWare" />
            <h7>Hi, username</h7>
        </div>    

        <div class="center">
            <h3>SOLVE A TEST</h3>
            <h4 class = "">Please choose the test you would like to take</h4>
        </div>

        <div class="line1">
            <h4>Test #1 - tag </h4>
            
            <h4>Test #4 Name</h4>
            
            <h4>Test #7 Name</h4>
            
        </div>
        
        <div class="line11">
            <button>Test #1 Name</button>
            <button>Test #4 Name</button>
            <button>Test #7 Name</button>
        </div>

        <div class="line2">
            <h4>Test #2 Name</h4>
            <h4>Test #5 Name</h4>
            <h4>Test #8 Name</h4>
        </div>

        <div class="line22">
            <button>Test #2 Name</button>
            <button>Test #5 Name</button>
            <button>Test #8 Name</button>
        </div>

        <div class="line3">
            <h4>Test #3 Name</h4>
            <h4>Test #6 Name</h4>
            <h4>Test #9 Name</h4>
        </div>

        <div class="line33">
            <button>Test #3 Name</button>
            <button>Test #6 Name</button>
            <button>Test #9 Name</button>
        </div>
        
    </div>
    

  );
}

export default App;
