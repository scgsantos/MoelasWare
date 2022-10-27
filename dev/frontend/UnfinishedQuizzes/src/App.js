import logo from './images/logo.png';
import "./CSS/index.css";
import './App.css';
import Button from './components/buttons';
import './fonts/Basic-Regular.ttf';


function App() {
  var numberOfunfinishedquizzes = 0;
  var username = "Rodrigo"

  return (
    <div class="App">
      <div class = "topbar">
        <div style={{ flex: 1}}></div>
        <div class = "logo" style={{ flex: 2}}>
          <img src={logo} alt="logo" />
        </div>
        <div class = "username" style={{ flex: 4}}>
          <text style={styles.geral}>Hi, {username}</text>
        </div>
        <div>
          <text style = {styles.middletitle}>LIST OF UNFINISHED QUIZZES</text>
        </div>
      </div>

      <div class = 'columns'>
        <div class = 'middlecolumn'>

            <div style={{flex: 1}}>
              <Button  buttonNumber = {1}/>
              <Button buttonNumber = {2}/>
              <Button buttonNumber = {3}/>
              <Button buttonNumber = {4}/>
              <Button buttonNumber = {5}/>
              <Button buttonNumber = {6}/>
              <Button buttonNumber = {7}/>
              <Button buttonNumber = {8}/>
            </div>


        </div>

        <div class = 'leftcolumn'>

            <div style={{flex: 1}}>
              <Button buttonNumber = {9}/>
              <Button buttonNumber = {10}/>
              <Button buttonNumber = {11}/>
              <Button buttonNumber = {12}/>
              <Button buttonNumber = {13}/>
              <Button buttonNumber = {14}/>
              <Button buttonNumber = {15}/>
              <Button buttonNumber = {16}/>
            </div>


        </div>
        <div class = 'rightcolumn'>

            <div style={{flex: 1}}>
              <Button buttonNumber = {17}/>
              <Button buttonNumber = {18}/>
              <Button buttonNumber = {19}/>
              <Button buttonNumber = {20}/>
              <Button buttonNumber = {21}/>
              <Button buttonNumber = {22}/>
              <Button buttonNumber = {23}/>
              <Button buttonNumber = {24}/>
            </div>
        </div>
      </div>
    </div>
    
  );

}


const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  geral: {
    fontSize: 20,
  },
  botao: {
    fontSize: 15,
  },
  esq: {
    fontSize: 20,
    textAlign: "left"
  },
  middletitle:{
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
  },

};

export default App;
