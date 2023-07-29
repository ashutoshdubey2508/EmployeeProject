import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import  Home  from './components/Home';
import TokenLocalStorage from './services/token_localstorage';
import { QueryClient, QueryClientProvider } from 'react-query';
import Admin from './components/Admin';
import TeamCard from './components/Teamcard';
import UserProfile from './components/userprofile';
import { AppContextProvider } from './contexts/Appcontext';


const queryClient = new QueryClient();

function App() {
  return (
    // <QueryClientProvider client={queryClient}>
   
    <BrowserRouter>  
     <AppContextProvider>  
      {/* <TokenLocalStorage /> */}
    <div className="App">
      <Routes>
      <Route exact path="/" element={< SignIn/>}/>
      <Route exact path="/home" element={< Home/>}/> 
      <Route exact path='/admin' element={<Admin/>}/>
      <Route exact path="/team/:id" element={<TeamCard/>} />
      <Route exact path="/user_profile/:id" element={<UserProfile/>} />
      
       </Routes>
    </div>  
    </AppContextProvider>
    </BrowserRouter>
   
    // </QueryClientProvider>
  );
}

export default App;
