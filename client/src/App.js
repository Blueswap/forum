import React, { useEffect, useState } from 'react';
import axios from "axios";
import AppContext from './contexts/Appcontext';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home'

function App() {
  useEffect(() =>{
    init();
  }, []);

const [isInitiated, setIsInitiated] = useState(false)
  const [user, setUser]= useState(null);


  const init = async () => {
    const token =  localStorage.getItem("token")
    const {data} = await axios.get('/api/user/init?token='+token);
    setUser(data.user);
  };
  return(
    <div>
      {isInitiated && (
        <AppContext.Provider value = {{user, setUser}}>
          <Router>
            <Routes>
              <Route path ="/">
                <Home/>
              </Route>
            </Routes>
          </Router>
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
