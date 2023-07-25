import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import  Home  from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route exact path="/" element={< SignIn/>}/>
      <Route exact path="/signup" element={< SignUp/>}/> 
      <Route exact path="/home" element={< Home/>}/> 
       </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
