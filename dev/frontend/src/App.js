import logo from './images/logo.png';
import { StyleSheet, Text, View } from "react-native";
import './App.css';
import Button from './components/buttons';

function App() {
  var numberOfunfinishedquizzes = 0;

  return (
    <div class="App">
      <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "row"
      }]}>
        <View style={{ flex: 1}}></View>
        <View style={{ flex: 2}}>
          <img src={logo} alt="logo" />
        </View>
        <View style={{ flex: 17}}></View>
        <View style={{ flex: 4}}>
          <Text style={styles.geral}>Hi, username</Text>
        </View>
      </View>
      <View>
          <Text style = {styles.middletitle}>LIST OF UNFINISHED QUIZZES</Text>
      </View>
      <div class = 'columns'>
        <div class = 'middlecolumn'>
          <View style={[styles.container, {
            // Try setting `flexDirection` to `"column"`.
            flexDirection: "column"
          }]}>
            <View style={{flex: 1}}>
              <Button buttonNumber = {1}/>
              <Button buttonNumber = {2}/>
              <Button buttonNumber = {3}/>
              <Button buttonNumber = {4}/>
              <Button buttonNumber = {5}/>
              <Button buttonNumber = {6}/>
              <Button buttonNumber = {7}/>
              <Button buttonNumber = {8}/>
            </View>
            
          </View>
        </div>
      
        <div class = 'leftcolumn'>
          <View style={[styles.container, {
            // Try setting `flexDirection` to `"column"`.
            flexDirection: "column"
          }]}>
            <View style={{flex: 1}}>
              <Button buttonNumber = {9}/>
              <Button buttonNumber = {10}/>
              <Button buttonNumber = {11}/>
              <Button buttonNumber = {12}/>
              <Button buttonNumber = {13}/>
              <Button buttonNumber = {14}/>
              <Button buttonNumber = {15}/>
              <Button buttonNumber = {16}/>
            </View>
            
          </View>
        </div>
        <div class = 'rightcolumn'>
          <View style={[styles.container, {
            // Try setting `flexDirection` to `"column"`.
            flexDirection: "column"
          }]}>
            <View style={{flex: 1}}>
              <Button buttonNumber = {17}/>
              <Button buttonNumber = {18}/>
              <Button buttonNumber = {19}/>
              <Button buttonNumber = {20}/>
              <Button buttonNumber = {21}/>
              <Button buttonNumber = {22}/>
              <Button buttonNumber = {23}/>
              <Button buttonNumber = {24}/>
            </View>
            
          </View>
        </div>
      </div>
    </div>
    
  );

}


const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: "bold"
  },

});

export default App;
